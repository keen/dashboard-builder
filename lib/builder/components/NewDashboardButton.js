import React from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import {
  addDashboardItem,
  toogleDashboardsMenu,
  setNewDashboardForFocus,
  clearAccessKey,
} from "../../actions/rootActions";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const NewDashboardButton = props => {
  const addDashboard = () => {
    props.addDashboardItem();
    if(props.newDashboardId){
      props.history.push(`/editor/${props.newDashboardId}`);
      props.setNewDashboardForFocus(props.newDashboardId);
      props.dashboardsMenu && props.toogleDashboardsMenu();
      props.clearAccessKey();
    }
  };
  return (
    <div className="new-dashboard-button" onClick={addDashboard}>
      <FontAwesomeIcon icon="plus-circle" /> New dashboard
    </div>
  );
};

const mapStateToProps = state => {
  const { dashboardsMenu, newDashboardId } = state;
  return {
    dashboardsMenu,
    newDashboardId
  };
};

const mapDispatchToProps = dispatch => ({
  addDashboardItem: element => dispatch(addDashboardItem(element)),
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
