import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const TopToolbar = ({ addDashboardItem, handleSearch }) => {
  return (
    <div className="top-toolbar">
      <div className="new-dashboard-button" onClick={addDashboardItem}>
        <FontAwesomeIcon icon="plus-circle" /> New dashboard
      </div>
      <div className="search">
        <FontAwesomeIcon icon="search" />
        <input type="text" placeholder="Search" onChange={handleSearch} />
      </div>
    </div>
  );
};

export default TopToolbar;
