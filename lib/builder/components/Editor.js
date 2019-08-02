import React, { Component } from "react";
import { connect } from "react-redux";
import {
  getSavedQueries,
  loadDashboards,
  loadDashboardInfo,
  clearDashboardInfo,
  toogleDashboardsMenu
} from "../../actions/rootActions";
import EditorToolbar from "./EditorToolbar";
import EditorContainer from "../../viewer/components/EditorContainer";
import Settings from "./Settings";

class Editor extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    const { id } = this.props.match.params;
    this.props.getSavedQueries();
    this.props.loadDashboardInfo(id);
    this.props.loadDashboards();
  }

  componentDidUpdate(){
    const { id } = this.props.match.params;
    this.props.loadDashboardInfo(id);
    this.props.loadDashboards();
  }

  // componentWillUnmount() {
  //   this.props.clearDashboardInfo();
  // }

  render() {
    const { dashboardSaved, dashboardsMenu } = this.props;
    return (
      <React.Fragment>
        <EditorToolbar />
        <EditorContainer version="editor" />
        <Settings />
        {dashboardSaved && (
          <div className="dashboard-saved-message">Saving...</div>
        )}
        {dashboardsMenu && (
          <div
            className="modal-cover"
            onClick={this.props.toogleDashboardsMenu}
          />
        )}
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => {
  const { dashboardSaved, dashboardsMenu } = state;
  return {
    dashboardSaved,
    dashboardsMenu
  };
};

const mapDispatchToProps = dispatch => ({
  getSavedQueries: () => dispatch(getSavedQueries()),
  loadDashboardInfo: id => dispatch(loadDashboardInfo(id)),
  clearDashboardInfo: () => dispatch(clearDashboardInfo()),
  toogleDashboardsMenu: () => dispatch(toogleDashboardsMenu()),
  loadDashboards: () => dispatch(loadDashboards())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Editor);
