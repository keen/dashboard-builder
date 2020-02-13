/* eslint-disable */
import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { WidthProvider, Responsive } from 'react-grid-layout';
import {
  dropHandler,
  showSettings,
  mapOldItems,
  setLayout,
  loadSavedQuery,
  savedQueryError,
  setLoading,
  clearDashboardInfo
} from '../../actions/rootActions';
import { generateUniqueId } from '../../utils/generateUniqueId';
import Paragraph from '../../builder/components/Paragraph';
import Image from '../../builder/components/Image';
import ChartContainer from '../../builder/components/ChartContainer';
import Buttons from '../../builder/components/Buttons';
import WebFont from 'webfontloader';
import ExplorerButton from './ExplorerButton';
import KeenAnalysisContext from '../../contexts/keenAnalysis';
import { getStyles } from 'keen-theme-builder';
import css from 'styled-jsx/css';

import '../../../node_modules/react-grid-layout/css/styles.css';
import '../../../node_modules/react-resizable/css/styles.css';

const ResponsiveReactGridLayout = WidthProvider(Responsive);

class EditorDashboard extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      editedWidget: false,
      loading: false,
      results: undefined
    };
  }

  componentDidUpdate(prevProps) {
    const { fonts: families } = this.props;
    if (families && families.length) {
      WebFont.load({
        google: {
          families
        }
      });
    }
  }

  componentWillUnmount() {
    this.props.clearDashboardInfo();
  }

  onElementClick = (e, i) => {
    const { version, settingsVisible, showSettings } = this.props;
    if (version === 'viewer') return;
    if (settingsVisible !== i) {
      showSettings(i);
    }
  };

  createElement = el => {
    const { i, w, h, type, savedQuery, src, text } = el;
    if (i === undefined || i === null) return;
    const {
      id,
      theme,
      charts_theme,
      version,
      layout,
      error,
      dryRun,
      settingsVisible,
      keenAnalysis
    } = this.props;
    const options =
      (charts_theme && charts_theme[i] && charts_theme[i].options) ||
      (theme && theme.options) ||
      {};
    const layoutEl = layout.find(item => item.i === el.i) || {};
    const dataGrid = { ...el, ...layoutEl };
    let opacity = 1;
    if (settingsVisible && settingsVisible !== i) {
      opacity = 0.3;
    }
    return (
      <div
        key={i}
        data-grid={dataGrid}
        id={i}
        style={{ opacity }}
        onDoubleClick={e => this.onElementClick(e, i)}
        onMouseDown={this.onMouseDown}
      >
        {type === 'image' ? (
          <Image src={src} />
        ) : type === 'paragraph' ? (
          <Paragraph text={text} />
        ) : (
          <ChartContainer
            type={type}
            index={i}
            w={layoutEl.w}
            h={layoutEl.h}
            savedQuery={savedQuery}
            keenAnalysis={keenAnalysis}
            containerId={i}
            {...options}
          />
        )}
        {version === 'editor' && (
          <Buttons
            key={i}
            index={i}
            savedQuery={savedQuery}
            editedWidget={this.state.editedWidget}
          />
        )}
      </div>
    );
  };

  onBreakpointChange = (breakpoint, cols) => {
    this.setState({
      breakpoint: breakpoint,
      cols: cols
    });
  };

  onLayoutChange = (layout, breakpoints) => {
    const { version, setLayout } = this.props;
    if (version === 'editor') {
      setLayout(layout);
    }
  };

  onDrop = elemParams => {
    const { x, y, w, h } = elemParams;
    const { draggedType, dropHandler } = this.props;
    const id = `chart-${generateUniqueId()}`;
    const newElement = {
      i: id,
      x,
      y,
      w,
      h,
      type: draggedType,
      savedQuery: [],
      options: {},
      src: '',
      text: '',
      error: false
    };
    dropHandler(newElement, id);
  };

  onDragStart = (layout, oldItem, newItem, placeholder, event, element) => {
    this.setState({ editedWidget: oldItem.i });
  };

  onDragStop = () => {
    this.setState({ editedWidget: false });
  };

  onResizeStart = (layout, oldItem, newItem, placeholder, event, element) => {
    this.setState({ editedWidget: oldItem.i });
  };

  onResizeStop = () => {
    this.setState({ editedWidget: false });
  };

  render() {
    const {
      version,
      screenSize,
      id,
      items,
      layout,
      layouts,
      theme,
      ...options
    } = this.props;
    const dashboardId = `dashboard-${id}`;
    return (
      <div id={dashboardId}>
        {theme && theme.theme && (
          <style
            dangerouslySetInnerHTML={{
              __html: getStyles(theme.theme, dashboardId)
            }}
          ></style>
        )}
        <ResponsiveReactGridLayout
          key={`dashboard-${id}`}
          {...options}
          measureBeforeMount
          breakpoints={{ lg: 1200, md: 800, sm: 420, xs: 0 }}
          className={version === 'editor' ? 'layout editor' : 'layout'}
          onLayoutChange={this.onLayoutChange}
          onBreakpointChange={this.onBreakpointChange}
          onDrop={this.onDrop}
          onDragStart={this.onDragStart}
          onDragStop={this.onDragStop}
          onResizeStart={this.onResizeStart}
          onResizeStop={this.onResizeStop}
          isDraggable={version === 'editor'}
          isResizable={version === 'editor'}
          isDroppable={version === 'editor'}
          droppingItem={{ i: 'shadow', w: 2, h: 4 }}
          rowHeight={30}
        >
          {items && items.map(item => this.createElement(item))}
        </ResponsiveReactGridLayout>
      </div>
    );
  }
}

const mapStateToProps = state => {
  const {
    dashboardInfo: {
      id,
      settings: {
        theme,
        charts_theme,
        layout,
        layouts,
        items,
        savedQuery,
        fonts
      }
    },
    dashboardInfo,
    draggedType,
    settingsVisible,
    screenSize
  } = state.app;
  return {
    id,
    dashboardInfo,
    draggedType,
    theme,
    charts_theme,
    layout,
    layouts,
    items,
    savedQuery,
    fonts,
    settingsVisible,
    screenSize
  };
};

const mapDispatchToProps = {
  dropHandler,
  showSettings,
  mapOldItems,
  setLayout,
  loadSavedQuery,
  savedQueryError,
  setLoading,
  clearDashboardInfo
};

export default connect(mapStateToProps, mapDispatchToProps)(EditorDashboard);

EditorDashboard.defaultProps = {
  cols: { lg: 12, md: 10, sm: 6, xs: 4, xxs: 2 },
  rowHeight: 100
};
