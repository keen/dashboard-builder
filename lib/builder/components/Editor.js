import React, { Component } from "react";
import { connect } from "react-redux";
import { getSavedQueries, loadDashboardInfo, clearDashboardInfo } from "../../actions/rootActions";
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
  }

  componentWillUnmount(){
    this.props.clearDashboardInfo();
  }

  render() {
    const { dashboardSaved } = this.props;
    return (
      <React.Fragment>
        <EditorToolbar />
        <EditorContainer version="editor" />
        <Settings />
        {dashboardSaved && (
          <div className="dashboard-saved-message">Dashboard Saved!</div>
        )}
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => ({
  dashboardSaved: state.editorReducer.dashboardSaved
});

const mapDispatchToProps = dispatch => ({
  getSavedQueries: () => dispatch(getSavedQueries()),
  loadDashboardInfo: id => dispatch(loadDashboardInfo(id)),
  clearDashboardInfo: () => dispatch(clearDashboardInfo())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Editor);
