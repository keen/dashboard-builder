import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  dragStartHandler,
  showToolbar,
  closeToolbar,
  dropHandler
} from '../../actions/rootActions';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import ReactTooltip from 'react-tooltip';

class EditorToolbar extends Component {
  constructor(props) {
    super(props);
  }

  dragStartHandler = e => {
    // this is a hack for firefox
    // Firefox requires some kind of initialization
    // which we can do by adding this attribute
    // @see https://bugzilla.mozilla.org/show_bug.cgi?id=568313
    e.dataTransfer.setData("text/plain", "");
    this.props.dragStartHandler(e.target.getAttribute('name'));
  };

  addElementOnClick = (e, name) => {
    const { id:dashboardId, counter = 0, dropHandler } = this.props;
    const id = `chart-${dashboardId}-n${counter}`;
    const newElement = {
      i: id,
      x: 0,
      y: Infinity,
      w: 2,
      h: 2,
      type: name,
      savedQuery: [],
      src: '',
      text: '',
      error: false
    };
    dropHandler(newElement, id);
  };

  render() {
    return (
      <div className="toolbar" onMouseLeave={this.props.toolbarVisible ? this.props.closeToolbar : undefined}>
        <div
          className={`toolbar-container ${this.props.toolbarVisible &&
            'toolbar-visible'}`}
        >
          <div className="toolbar-hidden">
            <h4>Charts</h4>
            <p
              data-tip="Metric chart"
              data-for="enrich"
              draggable={true}
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
              draggable={true}
              onDragStart={e => this.dragStartHandler(e)}
              name="bar"
              onClick={e => this.addElementOnClick(e, 'bar')}
            >
              <FontAwesomeIcon icon="chart-bar" size="2x" />
            </p>
            <p
              data-tip="Line chart"
              data-for="enrich"
              draggable={true}
              onDragStart={e => this.dragStartHandler(e)}
              name="line"
              onClick={e => this.addElementOnClick(e, 'line')}
            >
              <FontAwesomeIcon icon="chart-line" size="2x" />
            </p>
            <p
              data-tip="Area chart"
              data-for="enrich"
              draggable={true}
              onDragStart={e => this.dragStartHandler(e)}
              name="area"
              onClick={e => this.addElementOnClick(e, 'area')}
            >
              <FontAwesomeIcon icon="chart-area" size="2x" />
            </p>
            <p
              data-tip="Pie chart"
              data-for="enrich"
              draggable={true}
              onDragStart={e => this.dragStartHandler(e)}
              name="pie"
              onClick={e => this.addElementOnClick(e, 'pie')}
            >
              <FontAwesomeIcon icon="chart-pie" size="2x" />
            </p>
            <p
              data-tip="Table chart"
              data-for="enrich"
              draggable={true}
              onDragStart={e => this.dragStartHandler(e)}
              name="table"
              onClick={e => this.addElementOnClick(e, 'table')}
            >
              <FontAwesomeIcon icon="table" size="2x" />
            </p>
            <p
              data-tip="Funnel chart"
              data-for="enrich"
              draggable={true}
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
              draggable={true}
              onDragStart={e => this.dragStartHandler(e)}
              name="paragraph"
              onClick={e => this.addElementOnClick(e, 'paragraph')}
            >
              <FontAwesomeIcon icon="paragraph" size="2x" />
            </p>
            <p
              data-tip="Image"
              data-for="enrich"
              draggable={true}
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
      settings: { counter, layout }
    },
    isMoving,
    isResizing,
    settingsVisible,
    toolbarVisible
  } = state;
  return {
    id,
    counter,
    layout,
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
