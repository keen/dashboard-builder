import React from "react";
import EditorTopToolbarTitle from "./EditorTopToolbarTitle";

const EditorTopToolbar = props => {
  const { version, switcherEnabled } = props;
  return (
    <div className="dashboard-title">
      <EditorTopToolbarTitle version={version} switcherEnabled={switcherEnabled} />
    </div>
  );
};
export default EditorTopToolbar;
