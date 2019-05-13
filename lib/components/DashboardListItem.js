import React from "react";
import { Link } from "react-router-dom";
import DashboardItemButtons from "./DashboardListItemButtons";

const DashboardItem = ({ deleteDashboardItem, index, title }) => {
  return (
    <div className="dashboard-list-item">
      <Link to={`/editor/${index}`}>
        <div className="dashboard-list-item-box">{title}</div>
      </Link>
      <DashboardItemButtons
        index={index}
        deleteDashboardItem={deleteDashboardItem}
      />
    </div>
  );
};
export default DashboardItem;
