import React, { Component } from 'react';
import { connect } from 'react-redux';
import { loadDashboards } from '../../actions/rootActions';
import MainContainer from './MainContainer';

class Main extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.loadDashboards();
  }

  render() {
    return <MainContainer version="viewer" />;
  }
}

const mapDispatchToProps = {
  loadDashboards
};

export default connect(
  null,
  mapDispatchToProps
)(Main);
