import React from "react";
import { Link } from "react-router-dom";
import DashboardItemButtons from "./DashboardListItemButtons";

const DashboardItem = ({ deleteDashboardItem, index, title }) => {
  return (
    <div className="dashboard-list-item">
      <div className="dashboard-list-item-box">
        <Link to={`/editor/${index}`}>{title}</Link>
        <DashboardItemButtons
          index={index}
          deleteDashboardItem={deleteDashboardItem}
        />
      </div>
    </div>
  );
};
export default DashboardItem;
