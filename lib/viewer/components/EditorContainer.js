import React from "react";
import EditorTopToolbar from "./EditorTopToolbar";
import EditorDashboard from "./EditorDashboard";

const EditorContainer = React.forwardRef(
  (
    {
      closeSettings,
      dashboardTitle,
      changeDashboardTitle,
      saveDashboard,
      dragOverHandler,
      dropHandler,
      dashboardData,
      changeTitle,
      selectSavedQuery,
      resize,
      isResizing,
      moveChart,
      isMoving,
      deleteChart,
      settingsShow,
      settingsVisible,
      cloneChart
    },
    ref
  ) => {
    return (
      <div className="dashboard-container" onClick={closeSettings}>
        <div className="dashboard-inner-container">
          <EditorTopToolbar
            dashboardTitle={dashboardTitle}
            changeDashboardTitle={changeDashboardTitle}
            saveDashboard={saveDashboard}
          />
          <EditorDashboard
            ref={ref}
            dragOverHandler={dragOverHandler}
            dropHandler={dropHandler}
            dashboardData={dashboardData}
            changeTitle={changeTitle}
            selectSavedQuery={selectSavedQuery}
            resize={resize}
            isResizing={isResizing}
            moveChart={moveChart}
            isMoving={isMoving}
            deleteChart={deleteChart}
            settingsShow={settingsShow}
            settingsVisible={settingsVisible}
            cloneChart={cloneChart}
          />
        </div>
      </div>
    );
  }
);

export default EditorContainer;
