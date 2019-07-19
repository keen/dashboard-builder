import React, { Component } from "react";
import { connect } from "react-redux";
import { loadDashboards } from "../../actions/rootActions";
import MainContainer from "../../viewer/components/MainContainer";

class Main extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.loadDashboards();
  }

  render() {
    return <MainContainer version="editor" />;
  }
}

const mapDispatchToProps = dispatch => ({
  loadDashboards: () => dispatch(loadDashboards()),
});

export default connect(
  null,
  mapDispatchToProps
)(Main);
