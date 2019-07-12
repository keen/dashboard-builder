import React from "react";
import EditorTopToolbarTitle from "./EditorTopToolbarTitle";

const EditorTopToolbar = props => {
  const { version } = props;
  return (
    <div className="dashboard-title">
      <EditorTopToolbarTitle version={version} />
    </div>
  );
};
export default EditorTopToolbar;
