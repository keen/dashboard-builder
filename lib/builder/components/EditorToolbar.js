import React, { Component } from "react";
import { connect } from "react-redux";
import {
  dragStartHandler,
  showToolbar,
  closeToolbar,
  dropHandler
} from "../../actions/rootActions";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ReactTooltip from "react-tooltip";

class EditorToolbar extends Component {
  constructor(props) {
    super(props);
  }

  dragStartHandler = e => {
    e.dataTransfer.setData("text", "");
    this.props.dragStartHandler(e.target.getAttribute("name"));
  };

  addElementOnClick = (e, name) => {
    const { palette, colors } = this.props;
    const top = 20;
    const left = 350;
    const width = 500;
    const height = 300;
    const chartTitle = "";
    const newElement = {
      type: name,
      chartTitle,
      top,
      left,
      width,
      height,
      palette: palette ? palette.value : "",
      colors: colors || [],
      legend: { value: "right", label: "Right" },
      sparkline: { value: true, label: "Yes" },
      stacking: { value: "", label: "None" },
      savedQuery: []
    };
    e.preventDefault();
    this.props.dropHandler(newElement);
  }

  render() {
    return (
      <div className="toolbar" onMouseLeave={this.props.closeToolbar}>
        <div
          className={`toolbar-container ${this.props.toolbarVisible &&
            "toolbar-visible"}`}
        >
          <div className="toolbar-hidden">
            <h4>Bar charts</h4>
            <p
              data-tip="Bar chart"
              data-for="enrich"
              draggable="true"
              onDragStart={e => this.dragStartHandler(e)}
              name="bar"
              onClick={(e) => this.addElementOnClick(e, 'bar')}
            >
              <FontAwesomeIcon icon="chart-bar" />
            </p>
            <h4>Line charts</h4>
            <p
              data-tip="Line chart"
              data-for="enrich"
              draggable="true"
              onDragStart={e => this.dragStartHandler(e)}
              name="line"
              onClick={(e) => this.addElementOnClick(e, 'line')}
            >
              <FontAwesomeIcon icon="chart-line" />
            </p>
            <h4>Area charts</h4>
            <p
              data-tip="Area chart"
              data-for="enrich"
              draggable="true"
              onDragStart={e => this.dragStartHandler(e)}
              name="area"
              onClick={(e) => this.addElementOnClick(e, 'area')}
            >
              <FontAwesomeIcon icon="chart-area" />
            </p>
            <h4>Pie charts</h4>
            <p
              data-tip="Pie chart"
              data-for="enrich"
              draggable="true"
              onDragStart={e => this.dragStartHandler(e)}
              name="pie"
              onClick={(e) => this.addElementOnClick(e, 'pie')}
            >
              <FontAwesomeIcon icon="chart-pie" />
            </p>
            <h4>Table charts</h4>
            <p
              data-tip="Table chart"
              data-for="enrich"
              draggable="true"
              onDragStart={e => this.dragStartHandler(e)}
              name="table"
              onClick={(e) => this.addElementOnClick(e, 'table')}
            >
              <FontAwesomeIcon icon="table" />
            </p>
            <h4>Custom</h4>
            <p
              data-tip="Text"
              data-for="enrich"
              draggable="true"
              onDragStart={e => this.dragStartHandler(e)}
              name="paragraph"
              onClick={(e) => this.addElementOnClick(e, 'paragraph')}
            >
              <FontAwesomeIcon icon="paragraph" />
            </p>
            <p
              data-tip="Image"
              data-for="enrich"
              draggable="true"
              onDragStart={e => this.dragStartHandler(e)}
              name="image"
              onClick={(e) => this.addElementOnClick(e, 'image')}
            >
              <FontAwesomeIcon icon="image" />
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
          <FontAwesomeIcon className="plus-icon" icon="plus-circle" />
          <h3>Add item</h3>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  const {
    dashboardInfo: { id, dashboardData, palette, colors, picker },
    isMoving,
    isResizing,
    settingsVisible,
    toolbarVisible
  } = state;
  return {
    id,
    dashboardData,
    palette,
    colors,
    picker,
    isMoving,
    isResizing,
    settingsVisible,
    toolbarVisible
  };
};

const mapDispatchToProps = dispatch => ({
  dragStartHandler: draggedType => dispatch(dragStartHandler(draggedType)),
  showToolbar: () => dispatch(showToolbar()),
  closeToolbar: () => dispatch(closeToolbar()),
  dropHandler: newElement => dispatch(dropHandler(newElement)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EditorToolbar);
