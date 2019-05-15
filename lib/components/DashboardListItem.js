import React from "react";
import { Link } from "react-router-dom";
import DashboardItemButtons from "./DashboardListItemButtons";

const DashboardItem = ({ deleteDashboardItem, index, dashboardTitle }) => {
  return (
    <div className="dashboard-list-item">
      <Link to={`/editor/${index}`}>
        <div className="dashboard-list-item-box">{dashboardTitle}</div>
      </Link>
      <DashboardItemButtons
        index={index}
        deleteDashboardItem={deleteDashboardItem}
      />
    </div>
  );
};
export default DashboardItem;
