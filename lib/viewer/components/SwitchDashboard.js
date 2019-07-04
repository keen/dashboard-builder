import React from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { loadDashboardInfo } from "../../actions/rootActions";
import Select from "react-select";

const SwitchDashboard = props => {
  const dashboardOptions = props.dashboardList
    .map(el => ({
      value: el.id,
      label: el.dashboardTitle
    }));

  const changeDashboardView = id => {
    props.history.push(id);
    props.loadDashboardInfo(id);
  };

  return (
    <div className="switch-dashboard">
      <Select
        value={{ value: props.id, label: props.dashboardTitle }}
        onChange={id => changeDashboardView(id.value)}
        options={dashboardOptions}
      />
    </div>
  );
};

const mapStateToProps = state => {
  const {
    dashboardInfo: { id, dashboardTitle },
    dashboardList
  } = state;
  return {
    id,
    dashboardTitle,
    dashboardList
  };
};

const mapDispatchToProps = dispatch => ({
  loadDashboardInfo: id => dispatch(loadDashboardInfo(id))
});

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(SwitchDashboard)
);
