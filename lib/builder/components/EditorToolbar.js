import React, { Component } from "react";
import { connect } from "react-redux";
import {
  dragStartHandler,
  showToolbar,
  closeToolbar
} from "../../actions/rootActions";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

class EditorToolbar extends Component {
  constructor(props) {
    super(props);
  }

  dragStartHandler = e => {
    e.dataTransfer.setData("text", "");
    this.props.dragStartHandler(e.target.getAttribute("name"));
  };

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
              draggable="true"
              onDragStart={e => this.dragStartHandler(e)}
              name="bar"
            >
              <FontAwesomeIcon icon="chart-bar" />
            </p>
            <p
              draggable="true"
              onDragStart={e => this.dragStartHandler(e)}
              name="horizontal-bar"
            >
              <FontAwesomeIcon icon="chart-bar" transform={{ rotate: 90 }} />
            </p>
            <h4>Line charts</h4>
            <p
              draggable="true"
              onDragStart={e => this.dragStartHandler(e)}
              name="line"
            >
              <FontAwesomeIcon icon="chart-line" />
            </p>
            <h4>Area charts</h4>
            <p
              draggable="true"
              onDragStart={e => this.dragStartHandler(e)}
              name="area"
            >
              <FontAwesomeIcon icon="chart-area" />
            </p>
            <h4>Pie charts</h4>
            <p
              draggable="true"
              onDragStart={e => this.dragStartHandler(e)}
              name="pie"
            >
              <FontAwesomeIcon icon="chart-pie" />
            </p>
            <h4>Table charts</h4>
            <p
              draggable="true"
              onDragStart={e => this.dragStartHandler(e)}
              name="table"
            >
              <FontAwesomeIcon icon="table" />
            </p>
            <h4>Custom</h4>
            <p
              draggable="true"
              onDragStart={e => this.dragStartHandler(e)}
              name="paragraph"
            >
              <FontAwesomeIcon icon="paragraph" />
            </p>
            <p
              draggable="true"
              onDragStart={e => this.dragStartHandler(e)}
              name="image"
            >
              <FontAwesomeIcon icon="image" />
            </p>
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
  const { toolbarVisible } = state;
  return {
    toolbarVisible
  };
};

const mapDispatchToProps = dispatch => ({
  dragStartHandler: draggedType => dispatch(dragStartHandler(draggedType)),
  showToolbar: () => dispatch(showToolbar()),
  closeToolbar: () => dispatch(closeToolbar())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EditorToolbar);
