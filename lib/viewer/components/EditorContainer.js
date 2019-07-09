import React from "react";
import { connect } from "react-redux";
import { closeSettings } from "../../actions/rootActions";
import EditorDashboardTopBar from "../../builder/components/EditorDashboardTopBar";
import EditorTopToolbar from "./EditorTopToolbar";
import EditorDashboard from "./EditorDashboard";

const EditorContainer = props => {
  const { version } = props;
  return (
    <div
      className={
        version === "editor"
          ? "dashboard-container"
          : "dashboard-container-viewer"
      }
      onClick={props.closeSettings}
    >
      {version === "editor" && <EditorDashboardTopBar />}
      <div className="dashboard-inner-container">
        <EditorTopToolbar version={version} />
        <EditorDashboard version={version} />
      </div>
    </div>
  );
};

const mapDispatchToProps = dispatch => ({
  closeSettings: () => dispatch(closeSettings())
});

export default connect(
  null,
  mapDispatchToProps
)(EditorContainer);
