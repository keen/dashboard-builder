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
    return (
      <React.Fragment>
        <EditorContainer version="viewer" />
      </React.Fragment>
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
