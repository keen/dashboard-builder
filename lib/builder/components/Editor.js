import React, { Component } from "react";
import { connect } from "react-redux";
import {
  getSavedQueries,
  loadDashboards,
  loadDashboardInfo,
  clearDashboardInfo,
  toggleDashboardsMenu,
  loadingSingleDashboard
} from "../../actions/rootActions";
import EditorToolbar from "./EditorToolbar";
import EditorContainer from "../../viewer/components/EditorContainer";
import Settings from "./Settings";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

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
    this.props.loadDashboards();
  }

  render() {
    const { dashboardSaved, dashboardsMenu, isDashboardLoading } = this.props;
    return (
      <div className="dashboard-builder">
        <EditorToolbar />
        <EditorContainer version="editor" />
        <Settings />
        {dashboardSaved && (
          <div className="dashboard-saved-message">Saving...</div>
        )}
        {(dashboardsMenu || isDashboardLoading) && (
          <div
            className="modal-cover"
            onClick={
              !isDashboardLoading ? () => this.props.toggleDashboardsMenu() : null
            }
          />
        )}
        {isDashboardLoading && (
          <div className="new-chart-info">
            <span className="loading">
              <FontAwesomeIcon icon="spinner" />
            </span>
          </div>
        )}
      </div>
    );
  }
}

const mapStateToProps = state => {
  const { dashboardSaved, dashboardsMenu, isDashboardLoading } = state;
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

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Editor);
