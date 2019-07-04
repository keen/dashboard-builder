import React from "react";
import { connect } from "react-redux";
import {
  changeDashboardTitle,
  toogleDashboardsMenu
} from "../../actions/rootActions";
import SwitchDashboard from "./SwitchDashboard";
import EditorDashboardsSwitch from "../../builder/components/EditorDashboardsSwitch";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const EditorTopToolbarTitle = props => {
  const { version, dashboardTitle, dashboardsMenu } = props;
  return (
    <React.Fragment>
      {version === "editor" ? (
        <React.Fragment>
          <div className="burger-icon">
            <FontAwesomeIcon icon="bars" onClick={props.toogleDashboardsMenu} />
            {dashboardsMenu && <EditorDashboardsSwitch />}
          </div>
          <input
            type="text"
            value={dashboardTitle}
            onChange={e => props.changeDashboardTitle(e.target.value)}
            placeholder="Enter your dashboard title..."
          />
        </React.Fragment>
      ) : (
        <SwitchDashboard />
      )}
    </React.Fragment>
  );
};

const mapStateToProps = state => {
  const {
    dashboardInfo: { dashboardTitle },
    dashboardsMenu
  } = state;
  return {
    dashboardTitle,
    dashboardsMenu
  };
};

const mapDispatchToProps = dispatch => ({
  changeDashboardTitle: title => dispatch(changeDashboardTitle(title)),
  toogleDashboardsMenu: () => dispatch(toogleDashboardsMenu())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EditorTopToolbarTitle);
