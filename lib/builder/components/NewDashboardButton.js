import React from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import {
  addDashboardItem,
  loadDashboardInfo,
  toogleDashboardsMenu,
  setNewDashboardForFocus,
  clearAccessKey,
} from "../../actions/rootActions";
import GetUniqueId from "../../func/getUniqueId";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const NewDashboardButton = props => {
  const addDashboard = () => {
    const newElement = {
      id: GetUniqueId(),
      title: "Unnamed dashboard",
      data: {
        version: 2,
        items: []
      },
      settings: {
        dryRun: false
      }
    };
    props.addDashboardItem(newElement);
    props.history.push(`/editor/${newElement.id}`);
    props.loadDashboardInfo(newElement.id);
    props.setNewDashboardForFocus(newElement.id);
    props.dashboardsMenu && props.toogleDashboardsMenu();
    props.clearAccessKey();
  };
  return (
    <div className="new-dashboard-button" onClick={addDashboard}>
      <FontAwesomeIcon icon="plus-circle" /> New dashboard
    </div>
  );
};

const mapStateToProps = state => {
  const { dashboardsMenu } = state;
  return {
    dashboardsMenu
  };
};

const mapDispatchToProps = dispatch => ({
  addDashboardItem: element => dispatch(addDashboardItem(element)),
  loadDashboardInfo: id => dispatch(loadDashboardInfo(id)),
  toogleDashboardsMenu: () => dispatch(toogleDashboardsMenu()),
  setNewDashboardForFocus: value => dispatch(setNewDashboardForFocus(value)),
  clearAccessKey: () => dispatch(clearAccessKey()),
});

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(NewDashboardButton)
);
