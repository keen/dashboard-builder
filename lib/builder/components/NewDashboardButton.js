import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import {
  addDashboardItem,
  toggleDashboardsMenu,
  setNewDashboardForFocus,
  clearAccessKey
} from '../../actions/rootActions';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

class NewDashboardButton extends React.Component {
  constructor(props) {
    super(props);
  }

  addDashboard = () => {
    this.props.addDashboardItem();
  };

  componentDidUpdate() {
    let dashboardId;
    if (this.props.id && this.props.newDashboardId === false) {
      dashboardId = this.props.id;
    }
    if (this.props.id === this.props.newDashboardId) {
      dashboardId = this.props.newDashboardId;
    }
    if (dashboardId) {
      this.props.history.push(`/editor/${dashboardId}`);
      this.props.setNewDashboardForFocus(dashboardId);
      this.props.dashboardsMenu && this.props.toggleDashboardsMenu();
      this.props.clearAccessKey();
    }
  }

  render() {
    return (
      <div className="new-dashboard-button" onClick={this.addDashboard}>
        <FontAwesomeIcon icon="plus-circle" size="sm" /> New dashboard
      </div>
    );
  }
}

const mapStateToProps = state => {
  const {
    dashboardInfo: { id },
    dashboardsMenu,
    newDashboardId
  } = state.app;
  return {
    id,
    dashboardsMenu,
    newDashboardId
  };
};

const mapDispatchToProps = {
  addDashboardItem,
  toggleDashboardsMenu,
  setNewDashboardForFocus,
  clearAccessKey
};

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(NewDashboardButton)
);
