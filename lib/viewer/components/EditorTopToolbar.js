import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const EditorTopToolbar = ({
  dashboardTitle,
  changeDashboardTitle,
  saveDashboard
}) => {
  return (
    <div className="dashboard-title">
      <input
        type="text"
        value={dashboardTitle}
        onChange={changeDashboardTitle}
        placeholder="Enter your dashboard title..."
      />
      {saveDashboard && (
        <div className="save-dashboard-button" onClick={saveDashboard}>
          <FontAwesomeIcon icon="save" /> Save
        </div>
      )}
    </div>
  );
};

export default EditorTopToolbar;
