import React from "react";

const EditorTopToolbar = ({
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

export default EditorTopToolbar;
