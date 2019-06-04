import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const ChartButtons = ({
  deleteChart,
  index,
  isMoving,
  isResizing,
  settingsShow,
  cloneChart
}) => {
  let buttonsVisibility = "";
  if (isMoving === index) {
    buttonsVisibility = "visible";
  }
  if (isResizing !== false) {
    buttonsVisibility = "hidden";
  }
  return (
    <div className="config-buttons" style={{ visibility: buttonsVisibility }}>
      <div onClick={(e) => settingsShow(e, index)}>
        <FontAwesomeIcon icon="cog" />
      </div>
      <div onClick={() => cloneChart(index)}>
        <FontAwesomeIcon icon="clone" />
      </div>
      <div onClick={() => deleteChart(index)}>
        <FontAwesomeIcon icon="trash-alt" />
      </div>
    </div>
  );
};
export default ChartButtons;
