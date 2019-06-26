import React from "react";
import { connect } from "react-redux";
import { changeDashboardTitle } from "../../actions/rootActions";
import SwitchDashboard from "./SwitchDashboard";

const EditorTopToolbarTitle = props => {
  const { version, dashboardTitle } = props;
  return (
    <React.Fragment>
      {version === "editor" ? (
        <input
          type="text"
          value={dashboardTitle}
          onChange={e => props.changeDashboardTitle(e.target.value)}
          placeholder="Enter your dashboard title..."
        />
      ) : (
        <SwitchDashboard />
      )}
    </React.Fragment>
  );
};

const mapStateToProps = state => ({
  dashboardTitle: state.editorReducer.dashboardInfo.dashboardTitle
});

const mapDispatchToProps = dispatch => ({
  changeDashboardTitle: title => dispatch(changeDashboardTitle(title))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EditorTopToolbarTitle);
