import React, { Component } from "react";
import { connect } from "react-redux";
import isEmpty from 'lodash/isEmpty';
import {
  loadDashboardInfo,
  updateDashboardInfo,
  clearDashboardInfo
} from "../../actions/rootActions";
import EditorContainer from "./EditorContainer";

class Editor extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    const { dashboardInfo, loadDashboardInfo, updateDashboardInfo, match } = this.props;
    const { id } = match.params;
    if (dashboardInfo && !isEmpty(dashboardInfo)) {
      updateDashboardInfo(dashboardInfo);
    } else {
      loadDashboardInfo(id);
    }
  }

  componentWillUnmount() {
    this.props.clearDashboardInfo();
  }

  render() {
    const { editable, switcherEnabled } = this.props;
    return (
      <div className="dashboard-builder">
        <EditorContainer version="viewer" editable={editable} switcherEnabled={switcherEnabled} />
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  loadDashboardInfo: id => dispatch(loadDashboardInfo(id)),
  updateDashboardInfo: (data) => dispatch(updateDashboardInfo(data)),
  clearDashboardInfo: () => dispatch(clearDashboardInfo())
});

export default connect(
  null,
  mapDispatchToProps
)(Editor);
