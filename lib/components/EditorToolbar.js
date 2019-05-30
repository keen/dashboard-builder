import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const EditorToolbar = ({
  dragStartHandler,
  toolbarVisible,
  toolbarVisibleShow,
  toolbarVisibleHide
}) => {
  return (
    <div className="toolbar" onMouseLeave={toolbarVisibleHide}>
      <div
        className={`toolbar-container ${toolbarVisible && "toolbar-visible"}`}
      >
        <div className="toolbar-hidden">
          <h4>Bar charts</h4>
          <p draggable="true" onDragStart={dragStartHandler} name="bar">
            <FontAwesomeIcon icon="chart-bar" />
          </p>
          <p
            draggable="true"
            onDragStart={dragStartHandler}
            name="horizontal-bar"
          >
            <FontAwesomeIcon icon="chart-bar" transform={{ rotate: 90 }} />
          </p>
          <h4>Line charts</h4>
          <p draggable="true" onDragStart={dragStartHandler} name="line">
            <FontAwesomeIcon icon="chart-line" />
          </p>
          <h4>Area charts</h4>
          <p draggable="true" onDragStart={dragStartHandler} name="area">
            <FontAwesomeIcon icon="chart-area" />
          </p>
          <h4>Pie charts</h4>
          <p draggable="true" onDragStart={dragStartHandler} name="pie">
            <FontAwesomeIcon icon="chart-pie" />
          </p>
          <h4>Table charts</h4>
          <p draggable="true" onDragStart={dragStartHandler} name="table">
            <FontAwesomeIcon icon="table" />
          </p>
          <h4>Custom</h4>
          <p draggable="true" onDragStart={dragStartHandler} name="paragraph">
            <FontAwesomeIcon icon="paragraph" />
          </p>
          <p draggable="true" onDragStart={dragStartHandler} name="image">
            <FontAwesomeIcon icon="image" />
          </p>
        </div>
      </div>
      <div className="toolbar-bar" onMouseOver={toolbarVisibleShow}>
        <FontAwesomeIcon className="plus-icon" icon="plus-circle" />
        <h3>Add item</h3>
      </div>
    </div>
  );
};

export default EditorToolbar;
