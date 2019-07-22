import React from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import {
  toogleDashboardsMenu,
  loadDashboardInfo,
  clearAccessKey,
  setNewDashboardForFocus
} from "../../actions/rootActions";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import NewDashboardButton from "./NewDashboardButton";

const EditorDashboardsSwitch = props => {
  const changeDashboard = id => {
    props.setNewDashboardForFocus(false);
    props.history.push(id);
    props.loadDashboardInfo(id);
    props.toogleDashboardsMenu();
    props.clearAccessKey();
  };

  const { dashboardList, active } = props;
  return (
    <React.Fragment>
      <div className="editor-dashboard-switch modal">
        <div className="modal-header">
          Dashboards
          <FontAwesomeIcon icon="times" onClick={props.toogleDashboardsMenu} />
        </div>
        <div className="modal-body">
          {dashboardList.map(el => (
            <div
              key={el.id}
              onClick={() => changeDashboard(el.id)}
              className={active === el.id ? "active" : ""}
            >
              {active === el.id && (
                <FontAwesomeIcon icon="angle-double-right" />
              )}
              {el.title}
            </div>
          ))}
        </div>
        <div className="modal-footer">
        <div className="new-dashboard-button new-dashboard-button-fake" onClick={
          () => {
            props.history.push(`/`);
          }
        }>
          <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="plus-circle"
            className="svg-inline--fa fa-plus-circle fa-w-16 " role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="currentColor" d="M256 8C119 8 8 119 8 256s111 248 248 248 248-111 248-248S393 8 256 8zm144 276c0 6.6-5.4 12-12 12h-92v92c0 6.6-5.4 12-12 12h-56c-6.6 0-12-5.4-12-12v-92h-92c-6.6 0-12-5.4-12-12v-56c0-6.6 5.4-12 12-12h92v-92c0-6.6 5.4-12 12-12h56c6.6 0 12 5.4 12 12v92h92c6.6 0 12 5.4 12 12v56z"></path></svg>
          New dashboard
        </div>
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
  loadDashboardInfo: id => dispatch(loadDashboardInfo(id)),
  clearAccessKey: () => dispatch(clearAccessKey()),
  setNewDashboardForFocus: value => dispatch(setNewDashboardForFocus(value))
});

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(EditorDashboardsSwitch)
);
