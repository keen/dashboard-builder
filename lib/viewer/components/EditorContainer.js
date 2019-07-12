import React from "react";
import { connect } from "react-redux";
import { closeSettings } from "../../actions/rootActions";
import EditorDashboardTopBar from "../../builder/components/EditorDashboardTopBar";
import EditorTopToolbar from "./EditorTopToolbar";
import EditorDashboard from "./EditorDashboard";

const EditorContainer = props => {
  const { version, screenSize } = props;
  return (
    <div
      className={
        version === "editor"
          ? "dashboard-container"
          : "dashboard-container-viewer"
      }
      onMouseDown={props.closeSettings}
    >
      <EditorDashboardTopBar version={version} />
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
        <EditorTopToolbar version={version} />
        <EditorDashboard version={version} />
      </div>
    </div>
  );
};

const mapStateTopProps = state => {
  const { screenSize } = state;
  return {
    screenSize
  };
};

const mapDispatchToProps = dispatch => ({
  closeSettings: () => dispatch(closeSettings())
});

export default connect(
  mapStateTopProps,
  mapDispatchToProps
)(EditorContainer);
