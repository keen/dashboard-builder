import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { loadDashboardInfo } from '../../actions/rootActions';
import Select from 'react-select';

const SwitchDashboard = props => {
  const dashboardOptions = props.dashboardList.map(el => ({
    value: el.id,
    label: el.title
  }));

  const changeDashboardView = id => {
    props.history.push(id);
    props.loadDashboardInfo(id);
  };

  return (
    <div className="switch-dashboard">
      <Select
        value={{ value: props.id, label: props.title }}
        onChange={id => changeDashboardView(id.value)}
        options={dashboardOptions}
      />
    </div>
  );
};

const mapStateToProps = state => {
  const {
    dashboardInfo: { id, title },
    dashboardList
  } = state;
  return {
    id,
    title,
    dashboardList
  };
};

const mapDispatchToProps = {
  loadDashboardInfo
};

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(SwitchDashboard)
);
