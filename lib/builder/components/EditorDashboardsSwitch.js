import React from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import {
  toogleDashboardsMenu,
  loadDashboardInfo,
  clearAccessKey,
  setNewDashboardForFocus,
  addDashboardItem,
} from "../../actions/rootActions";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import NewDashboardButton from "./NewDashboardButton";

const EditorDashboardsSwitch = props => {
  const changeDashboard = id => {
    props.setNewDashboardForFocus(id);
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
  loadDashboardInfo: id => dispatch(loadDashboardInfo(id)),
  clearAccessKey: () => dispatch(clearAccessKey()),
  setNewDashboardForFocus: value => dispatch(setNewDashboardForFocus(value)),
  addDashboardItem: element => dispatch(addDashboardItem(element)),
});

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(EditorDashboardsSwitch)
);
