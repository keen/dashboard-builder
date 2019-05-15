import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const ChartButtons = ({ deleteChart, index, isMoving, isResizing }) => {
  let buttonsVisibility = "";
  if (isMoving === index) {
    buttonsVisibility = "visible";
  }
  if (isResizing !== false) {
    buttonsVisibility = "hidden";
  }
  return (
    <div className="config-buttons" style={{ visibility: buttonsVisibility }}>
      <div onClick={e => deleteChart(e, index)}>
        <FontAwesomeIcon icon="trash-alt" />
      </div>
    </div>
  );
};
export default ChartButtons;
