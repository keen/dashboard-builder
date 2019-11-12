import React, { PureComponent } from "react";
import { WidthProvider, Responsive } from "react-grid-layout";
import { connect } from 'react-redux';
// import _ from "lodash";
import isEqual from 'lodash/isEqual';
import { client } from 'Client/index';
import {
  dropHandler,
  // moveChart,
  // stopMoveChart,
  showSettings,
  mapOldItems,
  // colMoveChart,
  setLayout,
} from '../../actions/rootActions';
import Paragraph from '../../builder/components/Paragraph';
import Image from '../../builder/components/Image';
import ChartContainer from '../../builder/components/ChartContainer';
import Buttons from '../../builder/components/Buttons';
import ExplorerButton from './ExplorerButton';
import Chart from '../../builder/components/Chart';

import '../../../node_modules/react-grid-layout/css/styles.css';
import '../../../node_modules/react-resizable/css/styles.css';

const ResponsiveReactGridLayout = WidthProvider(Responsive);

class NewEditorDashboard extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      items: [],
      newCounter: 0,
      layout: [],
      // type: ''
    };
  }

  componentDidUpdate(prevProps) {
    const { layout, items } = this.props;
    if (!isEqual(this.props.layout, prevProps.layout) && layout && items) {
      this.setState({
        layout,
        items,
        newCounter: items.length,
      });
    }
  }

  createElement = (el) => {
    const { i, type } = el;
    const { id, theme } = this.props;
    const options = (theme && theme.options) || {};
    const removeStyle = {
      position: "absolute",
      right: "2px",
      top: 0,
      cursor: "pointer"
    };

    return (
      <div key={i} data-grid={el} id={`${id}-${i}`}>
        {type === 'image' ? (
          <Image src={src} index={index} />
        ) : type === 'paragraph' ? (
          <Paragraph text={text} index={index} />
        ) : (
          <Chart type={type} {...options} />
        )}
        <span
          className="remove"
          style={removeStyle}
          onClick={() => this.onRemoveItem(i)}
        >
          &times;
        </span>
      </div>
    )
  }

  onAddItem = () => {
    this.setState(state => {
      return {
        ...state,
        items: [
          ...state.items,
          {
            i: "n" + state.newCounter,
            x: (state.items.length * 2) % (state.cols || 12),
            y: Infinity,
            w: 2,
            h: 2
          }
        ],
        newCounter: state.newCounter + 1
      }
    });
  }

  onBreakpointChange = (breakpoint, cols) => {
    this.setState({
      breakpoint: breakpoint,
      cols: cols
    });
  }

  onLayoutChange = (layout) => {
    const items = [this.state.items, layout].reduce((a, b) => a.map((c, i) => ({
      ...c,
      x: b[i].x,
      y: b[i].y,
      w: b[i].w,
      h: b[i].h
    })));
    this.props.setLayout(layout, items);
    this.setState({ layout, items });
  }

  onRemoveItem = (i) => {
    this.setState(state => {
      return {
        ...state,
        items: state.items.filter(item => item.i !== i)
      }
    })
  }

  onDrop = elemParams => {
    const { x, y, w, h } = elemParams;
    this.setState(state => {
      return {
        ...state,
        items: [
          ...state.items,
          {
            i: "n" + state.newCounter,
            x,
            y,
            w,
            h,
            type: this.props.draggedType,
          }
        ],
        newCounter: state.newCounter + 1,
      }
    })
  };

  render() {
    return (
      <div id={`dashboard-${this.props.id}`}>
        <ResponsiveReactGridLayout
          onLayoutChange={this.onLayoutChange}
          onBreakpointChange={this.onBreakpointChange}
          onDrop={this.onDrop}
          isDroppable
          droppingItem= {{ i: 'shadow', w: 2, h: 2 }}
          layout={this.state.layout}
          {...this.props}
        >
          {this.state.items.map(item => this.createElement(item))}
        </ResponsiveReactGridLayout>
        {this.props.theme && this.props.theme.style &&
          <style dangerouslySetInnerHTML={{__html: `${this.props.theme.style}`}}></style>
        }
      </div>
    );
  }
}

// export default NewEditorDashboard;

const mapStateToProps = state => {
  const {
    dashboardInfo: {
      id,
      data,
      rows,
      settings: { palette, colors, picker, theme, layout, items },
      // theme,
    },
    dashboardInfo,
    // grid,
    draggedType,
    // isMoving,
    // isResizing,
    settingsVisible,
    screenSize,
    // isCollision
  } = state;
  return {
    id,
    data,
    rows,
    dashboardInfo,
    // grid,
    draggedType,
    palette,
    colors,
    picker,
    theme,
    layout,
    items,
    // isMoving,
    // isResizing,
    settingsVisible,
    screenSize,
    // isCollision
  };
};

const mapDispatchToProps = {
  // moveChart,
  // colMoveChart,
  dropHandler,
  // stopMoveChart,
  showSettings,
  mapOldItems,
  setLayout,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(NewEditorDashboard);

NewEditorDashboard.defaultProps = {
  className: "layout",
  cols: { lg: 12, md: 10, sm: 6, xs: 4, xxs: 2 },
  rowHeight: 100
}