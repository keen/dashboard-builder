import React from "react";
import { Link } from "react-router-dom";
import MainListItemButtons from "./MainListItemButtons";

const MainListItem = ({ deleteDashboardItem, index, dashboardTitle }) => {
  return (
    <div className="dashboard-list-item">
      <Link to={`/editor/${index}`}>
        <div className="dashboard-list-item-box">{dashboardTitle}</div>
      </Link>
      <MainListItemButtons
        index={index}
        deleteDashboardItem={deleteDashboardItem}
      />
    </div>
  );
};
export default MainListItem;
