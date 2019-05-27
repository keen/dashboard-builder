import React from "react";

const TopDashboardEditorToolbar = ({
  dashboardTitle,
}) => {
  return (
    <div className="dashboard-title">
      <input
        type="text"
        defaultValue={dashboardTitle}
        placeholder="Enter your dashboard title..."
        disabled
      />
    </div>
  );
};

export default TopDashboardEditorToolbar;
