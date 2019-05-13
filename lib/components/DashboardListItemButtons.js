import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const DashboardItemButtons = ({
  deleteDashboardItem,
  index,
}) => {
  return (
    <div className="dashboard-list-item-buttons">
      <div onClick={e => deleteDashboardItem(e, index)}>
        <FontAwesomeIcon icon="trash-alt" />
      </div>
    </div>
  );
};
export default DashboardItemButtons;
