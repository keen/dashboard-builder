import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  dragStartHandler,
  showToolbar,
  closeToolbar,
  dropHandler
} from '../../actions/rootActions';
import { generateUniqueId } from '../../utils/generateUniqueId';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import ReactTooltip from 'react-tooltip';

class EditorToolbar extends Component {
  constructor(props) {
    super(props);
  }

  dragStartHandler = e => {
    e.dataTransfer.setData('text', '');
    this.props.dragStartHandler(e.target.getAttribute('name'));
  };

  addElementOnClick = (e, name) => {
    const { palette, colors } = this.props;
    const top = 20;
    const left = 350;
    const width = 500;
    const height = 300;
    const newElement = {
      id: generateUniqueId(),
      type: name,
      top,
      left,
      width,
      height,
      palette: palette ? palette.value : '',
      colors: colors || [],
      // legend: { value: 'right', label: 'Right' },
      sparkline: true,
      // stacking: { value: '', label: 'None' },
      savedQuery: []
    };
    e.preventDefault();
    this.props.dropHandler(newElement);
  };

  render() {
    return (
      <div className="toolbar" onMouseLeave={this.props.closeToolbar}>
        <div
          className={`toolbar-container ${this.props.toolbarVisible &&
            'toolbar-visible'}`}
        >
          <div className="toolbar-hidden">
            <h4>Charts</h4>
            <p
              data-tip="Metric chart"
              data-for="enrich"
              draggable="true"
              onDragStart={e => this.dragStartHandler(e)}
              name="metric"
              onClick={e => this.addElementOnClick(e, 'metric')}
              className="metric-chart-icon"
            >
              123
            </p>
            <p
              data-tip="Bar chart"
              data-for="enrich"
              draggable="true"
              onDragStart={e => this.dragStartHandler(e)}
              name="bar"
              onClick={e => this.addElementOnClick(e, 'bar')}
            >
              <FontAwesomeIcon icon="chart-bar" size="2x" />
            </p>
            <p
              data-tip="Line chart"
              data-for="enrich"
              draggable="true"
              onDragStart={e => this.dragStartHandler(e)}
              name="line"
              onClick={e => this.addElementOnClick(e, 'line')}
            >
              <FontAwesomeIcon icon="chart-line" size="2x" />
            </p>
            <p
              data-tip="Area chart"
              data-for="enrich"
              draggable="true"
              onDragStart={e => this.dragStartHandler(e)}
              name="area"
              onClick={e => this.addElementOnClick(e, 'area')}
            >
              <FontAwesomeIcon icon="chart-area" size="2x" />
            </p>
            <p
              data-tip="Pie chart"
              data-for="enrich"
              draggable="true"
              onDragStart={e => this.dragStartHandler(e)}
              name="pie"
              onClick={e => this.addElementOnClick(e, 'pie')}
            >
              <FontAwesomeIcon icon="chart-pie" size="2x" />
            </p>
            <p
              data-tip="Table chart"
              data-for="enrich"
              draggable="true"
              onDragStart={e => this.dragStartHandler(e)}
              name="table"
              onClick={e => this.addElementOnClick(e, 'table')}
            >
              <FontAwesomeIcon icon="table" size="2x" />
            </p>
            <p
              data-tip="Funnel chart"
              data-for="enrich"
              draggable="true"
              onDragStart={e => this.dragStartHandler(e)}
              name="funnel"
              onClick={e => this.addElementOnClick(e, 'funnel')}
            >
              <FontAwesomeIcon icon="filter" size="2x" />
            </p>
            <h4>Elements</h4>
            <p
              data-tip="Text"
              data-for="enrich"
              draggable="true"
              onDragStart={e => this.dragStartHandler(e)}
              name="paragraph"
              onClick={e => this.addElementOnClick(e, 'paragraph')}
            >
              <FontAwesomeIcon icon="paragraph" size="2x" />
            </p>
            <p
              data-tip="Image"
              data-for="enrich"
              draggable="true"
              onDragStart={e => this.dragStartHandler(e)}
              name="image"
              onClick={e => this.addElementOnClick(e, 'image')}
            >
              <FontAwesomeIcon icon="image" size="2x" />
            </p>
            <ReactTooltip
              id="enrich"
              place="top"
              type="dark"
              effect="solid"
              getContent={dataTip => dataTip}
            />
          </div>
        </div>
        <div className="toolbar-bar" onMouseOver={this.props.showToolbar}>
          <FontAwesomeIcon className="plus-icon" icon="plus-circle" size="lg" />
          <h3>Add item</h3>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  const {
    dashboardInfo: {
      id,
      settings: { palette, colors, picker }
    },
    isMoving,
    isResizing,
    settingsVisible,
    toolbarVisible
  } = state.app;
  return {
    id,
    palette,
    colors,
    picker,
    isMoving,
    isResizing,
    settingsVisible,
    toolbarVisible
  };
};

const mapDispatchToProps = {
  dragStartHandler,
  showToolbar,
  closeToolbar,
  dropHandler
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EditorToolbar);
