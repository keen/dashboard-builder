import React from "react";
import { connect } from "react-redux";
import { closeSettings } from "../../actions/rootActions";
import EditorDashboardTopBar from "../../builder/components/EditorDashboardTopBar";
import EditorTopToolbar from "./EditorTopToolbar";
import EditorDashboard from "./EditorDashboard";
import ShareDashboard from "../../builder/components/ShareDashboard";

const EditorContainer = props => {
  const { version, screenSize, editable, dashboardsMenu, isDashboardPublic } = props;
  return (
    <div
      className={
        version === "editor"
          ? "dashboard-container"
          : "dashboard-container-viewer"
      }
      onMouseDown={props.closeSettings}
    >
      {dashboardsMenu === "share" && <ShareDashboard />}
      <EditorDashboardTopBar version={version} editable={isDashboardPublic ? false : editable} />
      <div
        className="dashboard-inner-container"
        style={{
          width:
            screenSize === "desktop" || version === "editor"
              ? "1200px"
              : screenSize === "tablet"
              ? "800px"
              : "420px"
        }}
      >
        <EditorTopToolbar version={version} switcherEnabled={!isDashboardPublic} />
        <EditorDashboard version={version} isDashboardPublic={isDashboardPublic} />
      </div>
    </div>
  );
};

const mapStateTopProps = state => {
  const { screenSize, dashboardsMenu } = state;
  return {
    screenSize,
    dashboardsMenu,
  };
};

const mapDispatchToProps = dispatch => ({
  closeSettings: () => dispatch(closeSettings())
});

export default connect(
  mapStateTopProps,
  mapDispatchToProps
)(EditorContainer);
