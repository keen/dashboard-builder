/* eslint-disable */

import React from 'react';
import ReactDOM from 'react-dom';
import { HashRouter as Router, Route } from 'react-router-dom';
import { createStore, applyMiddleware, compose } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import KeenAnalysis from 'keen-analysis';
import rootReducer from './reducers/rootReducer';
import onlyUIMiddleware from './middleware/onlyUIMiddleware';
import 'keen-dataviz/dist/keen-dataviz.css';
import '../styles/style.css';
import { library } from '@fortawesome/fontawesome-svg-core';
import { isEqual, omit } from 'lodash';
import JavascriptTimeAgo from 'javascript-time-ago';
import en from 'javascript-time-ago/locale/en';

import {
  faTrashAlt,
  faChartArea,
  faChartBar,
  faChartLine,
  faChartPie,
  faPlusCircle,
  faSave,
  faSearch,
  faTable,
  faParagraph,
  faImage,
  faCog,
  faClone,
  faSpinner,
  faShareAlt,
  faBars,
  faTimes,
  faAngleDoubleRight,
  faEdit,
  faEye,
  faMobileAlt,
  faTabletAlt,
  faLaptop,
  faFilter,
  faExternalLinkAlt,
  faCode,
  faCopy,
  faFileDownload,
  faInfoCircle,
  faChevronRight
} from '@fortawesome/free-solid-svg-icons';

import 'keen-dataviz/dist/keen-dataviz.css';

import KeenAnalysisContext from './contexts/keenAnalysis';

import '../styles/style.css';

import { saveDashboard } from './actions/rootActions';

import createOnlyUIMiddleware from './middleware/onlyUIMiddleware';
import { runDashboardObserver } from './utils/dashboardObserver';

library.add(
  faTrashAlt,
  faChartArea,
  faChartBar,
  faChartLine,
  faChartPie,
  faPlusCircle,
  faSave,
  faSearch,
  faTable,
  faParagraph,
  faImage,
  faCog,
  faClone,
  faSpinner,
  faShareAlt,
  faBars,
  faTimes,
  faAngleDoubleRight,
  faEdit,
  faEye,
  faMobileAlt,
  faTabletAlt,
  faLaptop,
  faFilter,
  faExternalLinkAlt,
  faCode,
  faCopy,
  faFileDownload,
  faInfoCircle,
  faChevronRight
);

import MainBuilder from './builder/components/Main';
import Editor from './builder/components/Editor';
import MainViewer from './viewer/components/Main';
import Viewer from './viewer/components/Editor';

JavascriptTimeAgo.locale(en);

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export let keenGlobals = undefined;
if (typeof webpackKeenGlobals !== 'undefined') {
  keenGlobals = webpackKeenGlobals;
}

export class DashboardBuilder {
  constructor(config) {
    const { keenAnalysis, onRouteChange, transitionMode } = config;

    const client =
      keenAnalysis.instance || new KeenAnalysis(keenAnalysis.config);
    const keenWebHost = config.keenWebHost || window.location.host;
    let keenWebFetchOptions;

    if (!!config.keenWebHost) {
      keenWebFetchOptions = {
        mode: 'cors',
        credentials: 'include'
      };
    }

    const store = createStore(
      rootReducer,
      composeEnhancers(
        applyMiddleware(
          createOnlyUIMiddleware(keenWebHost),
          thunk.withExtraArgument({
            keenClient: client,
            keenWebHost,
            keenWebFetchOptions
          })
        )
      )
    );

    runDashboardObserver(store);

    ReactDOM.render(
      <Provider store={store}>
        <KeenAnalysisContext.Provider value={client}>
          <Router>
            <Route
              path="/"
              component={() => {
                if (onRouteChange) onRouteChange();
                return null;
              }}
            />
            <Route
              path="/"
              component={routeProps => (
                <MainBuilder {...routeProps} {...config} />
              )}
              exact
            />{' '}
            <Route
              path="/editor/:id"
              component={routeProps => <Editor {...routeProps} {...config} />}
            />
            <Route
              path="/viewer/"
              component={routeProps => (
                <MainViewer {...routeProps} {...config} />
              )}
              exact
            />
            <Route
              path="/viewer/:id"
              component={routeProps => <Viewer {...routeProps} {...config} />}
            />
          </Router>
        </KeenAnalysisContext.Provider>
      </Provider>,
      document.querySelector(config.container)
    );
  }
}
