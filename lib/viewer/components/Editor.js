import React, { Component } from "react";
import { connect } from "react-redux";
import {
  loadDashboardInfo,
  clearDashboardInfo
} from "../../actions/rootActions";
import EditorContainer from "./EditorContainer";

class Editor extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    const { id } = this.props.match.params;
    this.props.loadDashboardInfo(id);
  }

  componentWillUnmount() {
    this.props.clearDashboardInfo();
  }

  render() {
    const { editable, switcherEnabled } = this.props;
    return (
      <div class="dashboard-builder">
        <EditorContainer version="viewer" editable={editable} switcherEnabled={switcherEnabled} />
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  loadDashboardInfo: id => dispatch(loadDashboardInfo(id)),
  clearDashboardInfo: () => dispatch(clearDashboardInfo())
});

export default connect(
  null,
  mapDispatchToProps
)(Editor);
