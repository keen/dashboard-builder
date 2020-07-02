import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { loadDashboards } from '../../actions/rootActions';
import MainContainer from './MainContainer';

const Main = props => {
  useEffect(() => {
    props.loadDashboards();
  }, []);
  return <MainContainer version="viewer" keenWebHost={props.keenWebHost} />;
};

const mapDispatchToProps = {
  loadDashboards
};

export default connect(null, mapDispatchToProps)(Main);
