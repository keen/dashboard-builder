import React from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import {
  toogleDashboardsMenu,
  loadDashboardInfo
} from "../../actions/rootActions";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import NewDashboardButton from "./NewDashboardButton";

const EditorDashboardsSwitch = props => {
  const changeDashboard = id => {
    props.history.push(id);
    props.loadDashboardInfo(id);
    props.toogleDashboardsMenu();
  };

  const { dashboardList, active } = props;
  return (
    <React.Fragment>
      <div className="editor-dashboard-switch">
        <div className="header">
          Dashboards
          <FontAwesomeIcon icon="times" onClick={props.toogleDashboardsMenu} />
        </div>
        <div className="body">
          {dashboardList.map(el => (
            <div
              key={el.id}
              onClick={() => changeDashboard(el.id)}
              className={active === el.id ? "active" : ""}
            >
              {active === el.id && (
                <FontAwesomeIcon icon="angle-double-right" />
              )}
              {el.dashboardTitle}
            </div>
          ))}
        </div>
        <div className="footer">
          <NewDashboardButton />
        </div>
      </div>
    </React.Fragment>
  );
};

const mapStateToProps = state => {
  const {
    dashboardList,
    dashboardInfo: { id: active }
  } = state;
  return {
    dashboardList,
    active
  };
};

const mapDispatchToProps = dispatch => ({
  toogleDashboardsMenu: () => dispatch(toogleDashboardsMenu()),
  loadDashboardInfo: id => dispatch(loadDashboardInfo(id))
});

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(EditorDashboardsSwitch)
);
