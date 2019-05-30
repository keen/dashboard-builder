import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const MainListItemButtons = ({ deleteDashboardItem, index }) => {
  return (
    <div className="dashboard-list-item-buttons">
      <div onClick={() => deleteDashboardItem(index)}>
        <FontAwesomeIcon icon="trash-alt" />
      </div>
    </div>
  );
};
export default MainListItemButtons;
