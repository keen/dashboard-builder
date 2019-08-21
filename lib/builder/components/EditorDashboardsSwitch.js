import React from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import {
  toggleDashboardsMenu,
  loadDashboardInfo,
  clearAccessKey,
  setNewDashboardForFocus,
  addDashboardItem,
  loadingSingleDashboard,
  filterDashboardsMenu
} from "../../actions/rootActions";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import NewDashboardButton from "./NewDashboardButton";
import ReactTimeAgo from "react-time-ago";

const EditorDashboardsSwitch = props => {
  const changeDashboard = id => {
    props.loadingSingleDashboard();
    props.setNewDashboardForFocus(id);
    props.history.push(id);
    props.loadDashboardInfo(id);
    props.toggleDashboardsMenu();
    props.clearAccessKey();
  };

  const { dashboardList, active, dashboardMenuFilter } = props;
  const filteredDashboards = dashboardList.filter(
    el =>
      dashboardMenuFilter === "" ||
      el.title.toLowerCase().includes(dashboardMenuFilter.toLowerCase())
  );
  return (
    <React.Fragment>
      <div className="editor-dashboard-switch modal">
        <div className="modal-header">
          Dashboards
          <FontAwesomeIcon icon="times" onClick={props.toggleDashboardsMenu} />
        </div>
        <div className="dashboards-filter">
          <input
            type="text"
            placeholder="Search"
            onChange={e => props.filterDashboardsMenu(e.target.value)}
          />
        </div>
        <div className="modal-body">
          {filteredDashboards.map(el => (
            <div
              key={el.id}
              onClick={() => changeDashboard(el.id)}
              className={active === el.id ? "item active" : "item"}
            >
              <span>
                {active === el.id && (
                  <FontAwesomeIcon icon="angle-double-right" />
                )}
                {el.title}
              </span>
              <ReactTimeAgo
                className="time"
                date={new Date(el.last_modified_date)}
              />
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
    dashboardInfo: { id: active },
    dashboardMenuFilter
  } = state;
  return {
    dashboardList,
    active,
    dashboardMenuFilter
  };
};

const mapDispatchToProps = {
  toggleDashboardsMenu,
  loadDashboardInfo,
  clearAccessKey,
  setNewDashboardForFocus,
  addDashboardItem,
  loadingSingleDashboard,
  filterDashboardsMenu
};

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(EditorDashboardsSwitch)
);
