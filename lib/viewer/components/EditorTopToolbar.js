import React from "react";
import EditorTopToolbarTitle from "./EditorTopToolbarTitle";

const EditorTopToolbar = props => {
  const { version, isDashboardPublic } = props;
  return (
    <div className="dashboard-title">
      <EditorTopToolbarTitle version={version} switcherEnabled={!isDashboardPublic} editable={!isDashboardPublic} />
    </div>
  );
};
export default EditorTopToolbar;
