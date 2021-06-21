import React from 'react';
import EditorTopToolbarTitle from './EditorTopToolbarTitle';

const EditorTopToolbar = props => {
  const { version, isDashboardPublic, transitionMode } = props;
  return (
    <div className="dashboard-title">
      <EditorTopToolbarTitle
        version={version}
        switcherEnabled={!isDashboardPublic}
        editable={!isDashboardPublic}
        transitionMode={transitionMode}
      />
    </div>
  );
};
export default EditorTopToolbar;
