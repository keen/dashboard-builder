import React, { Component } from 'react';
import { connect } from 'react-redux';
import isEmpty from 'lodash/isEmpty';
import {
  loadDashboardInfo,
  updateDashboardInfo,
  clearDashboardInfo,
  loadDashboards
} from '../../actions/rootActions';
import EditorContainer from './EditorContainer';

class Editor extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    const {
      dashboardInfo,
      loadDashboardInfo,
      updateDashboardInfo,
      loadDashboards,
      match
    } = this.props;
    const { id } = match.params;
    if (dashboardInfo && !isEmpty(dashboardInfo)) {
      updateDashboardInfo(dashboardInfo);
    } else {
      loadDashboardInfo(id);
      loadDashboards();
    }
  }

  componentWillUnmount() {
    this.props.keenWebHost !== 'none' && this.props.clearDashboardInfo();
  }

  render() {
    const { isDashboardPublic } = this.props;
    return (
      <div className="dashboard-builder">
        <EditorContainer
          version="viewer"
          isDashboardPublic={isDashboardPublic}
        />
      </div>
    );
  }
}

const mapDispatchToProps = {
  loadDashboardInfo,
  updateDashboardInfo,
  clearDashboardInfo,
  loadDashboards
};

export default connect(
  null,
  mapDispatchToProps
)(Editor);
