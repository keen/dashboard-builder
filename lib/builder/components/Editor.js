import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  getSavedQueries,
  loadDashboards,
  loadDashboardInfo,
  clearDashboardInfo,
  toggleDashboardsMenu,
  loadingSingleDashboard
} from '../../actions/rootActions';
import EditorToolbar from './EditorToolbar';
import EditorContainer from '../../viewer/components/EditorContainer';
import Settings from './Settings';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

class Editor extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    const { id } = this.props.match.params;
    this.props.loadingSingleDashboard();
    this.props.getSavedQueries();
    this.props.loadDashboardInfo(id);
    this.props.loadDashboards();
  }

  componentDidUpdate() {
    const { dashboardSaved } = this.props;
    if (!dashboardSaved) {
      this.props.loadDashboards();
    }
  }

  componentWillUnmount() {
    this.props.keenWebHost !== 'none' && this.props.clearDashboardInfo();
  }

  render() {
    const {
      dashboardSaved,
      dashboardsMenu,
      isDashboardLoading,
      querySource,
      keenWebHost
    } = this.props;
    return (
      <div className="dashboard-builder">
        <EditorToolbar />
        <EditorContainer version="editor" />
        <Settings querySource={querySource} />
        {dashboardSaved && (
          <div className="dashboard-saved-message">
            <FontAwesomeIcon
              style={{ color: '#fff', marginRight: '1rem' }}
              className="fa-spin"
              icon="spinner"
              size="1x"
            />
            <span>Saving...</span>
          </div>
        )}
        {keenWebHost !== 'none' && (dashboardsMenu || isDashboardLoading) && (
          <div
            className="modal-cover"
            onClick={
              !isDashboardLoading
                ? () => this.props.toggleDashboardsMenu()
                : null
            }
          />
        )}
        {keenWebHost !== 'none' && isDashboardLoading && (
          <div className="new-chart-info">
            <span className="loading">
              <FontAwesomeIcon icon="spinner" size="1x" />
            </span>
          </div>
        )}
      </div>
    );
  }
}

const mapStateToProps = state => {
  const { dashboardSaved, dashboardsMenu, isDashboardLoading } = state.app;
  return {
    dashboardSaved,
    dashboardsMenu,
    isDashboardLoading
  };
};

const mapDispatchToProps = {
  getSavedQueries,
  loadDashboardInfo,
  clearDashboardInfo,
  toggleDashboardsMenu,
  loadDashboards,
  loadingSingleDashboard
};

export default connect(mapStateToProps, mapDispatchToProps)(Editor);
