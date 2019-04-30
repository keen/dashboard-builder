import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Toolbar = ({
  dragStartHandler,
  toolbarVisible,
  toolbarVisibleShow,
  toolbarVisibleHide
}) => {
  return (
    <div className="toolbar" onMouseLeave={toolbarVisibleHide}>
      <div
        className={`toolbar-hidden ${toolbarVisible ? "toolbar-visible" : ""}`}
      >
        <h4>Bar charts</h4>
        <p draggable onDragStart={dragStartHandler} name="bar">
          <FontAwesomeIcon icon="chart-bar" />
        </p>
        <p draggable onDragStart={dragStartHandler} name="horizontal-bar">
          <FontAwesomeIcon icon="chart-bar" />
        </p>
        <h4>Line charts</h4>
        <p draggable onDragStart={dragStartHandler} name="line">
          <FontAwesomeIcon icon="chart-line" />
        </p>
        <h4>Area charts</h4>
        <p draggable onDragStart={dragStartHandler} name="area">
          <FontAwesomeIcon icon="chart-area" />
        </p>
        <h4>Pie charts</h4>
        <p draggable onDragStart={dragStartHandler} name="pie">
          <FontAwesomeIcon icon="chart-pie" />
        </p>
      </div>
      <div className="toolbar-bar" onMouseOver={toolbarVisibleShow}>
        <FontAwesomeIcon className="plus-icon" icon="plus-circle" />
        <h3>Add chart</h3>
      </div>
    </div>
  );
};

export default Toolbar;
