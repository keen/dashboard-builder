import React from "react";
import { Link } from "react-router-dom";
import DashboardItemButtons from "./DashboardItemButtons";

const DashboardItem = ({ deleteDashboardItem, index, title }) => {
  return (
    <div className="dashboard-item">
      <Link to={`/editor/${index}`}>{title}</Link>
      <DashboardItemButtons
        index={index}
        deleteDashboardItem={deleteDashboardItem}
      />
    </div>
  );
};
export default DashboardItem;
