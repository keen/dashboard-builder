import React from "react";
import { connect } from "react-redux";
import { withRouter } from 'react-router-dom';
import Select from "react-select";

const SwitchDashboard = props => {
  const dashboardOptions = props.dashboardList.map(el => ({
    value: el.id,
    label: el.dashboardTitle
  }));

  const changeDashboardView = id => {
    props.history.push(id);
    window.location.reload();
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
  } = state.editorReducer;
  return {
    id,
    dashboardTitle,
    dashboardList
  };
};

export default withRouter(connect(mapStateToProps)(SwitchDashboard));
