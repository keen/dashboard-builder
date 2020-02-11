import React, { useEffect, useRef } from 'react';
import { Route, withRouter } from 'react-router-dom';

import MainBuilder from './builder/components/Main';
import Editor from './builder/components/Editor';
import MainViewer from './viewer/components/Main';
import Viewer from './viewer/components/Editor';

const AppRoutes = props => {
  const {
    config,
    location: { pathname: currentPathname },
    onRouteChange
  } = props;
  const prevLocationRef = useRef();
  useEffect(() => {
    prevLocationRef.current = currentPathname;
  }, [props]);
  const prevPathname = prevLocationRef.current;

  prevPathname &&
    onRouteChange &&
    prevPathname !== currentPathname &&
    onRouteChange();

  return (
    <>
      {/*TODO: Remove props spread and read it from state*/}
      <Route
        path="/"
        component={routeProps => <MainBuilder {...routeProps} {...config} />}
        exact
      />{' '}
      <Route
        path="/editor/:id"
        component={routeProps => <Editor {...routeProps} {...config} />}
      />
      <Route
        path="/viewer/"
        component={routeProps => <MainViewer {...routeProps} {...config} />}
        exact
      />
      <Route
        path="/viewer/:id"
        component={routeProps => <Viewer {...routeProps} {...config} />}
      />
    </>
  );
};

export default withRouter(AppRoutes);
