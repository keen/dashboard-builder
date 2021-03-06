/* eslint-disable */

import React from 'react';
import ReactDOM from 'react-dom';
import { HashRouter as Router, Route } from 'react-router-dom';
import { createStore, applyMiddleware, compose } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import PropTypes from 'prop-types';
import isEmpty from 'lodash/isEmpty';
import KeenAnalysis from 'keen-analysis';
import rootReducer from '../reducers/rootReducer';
import Main from './components/Main';
import Editor from './components/Editor';
import 'keen-dataviz/dist/keen-dataviz.css';
import '../../styles/style.css';
import { library } from '@fortawesome/fontawesome-svg-core';
import {
  faParagraph,
  faImage,
  faSearch,
  faSpinner,
  faEdit,
  faMobileAlt,
  faTabletAlt,
  faLaptop,
  faExternalLinkAlt,
  faFileDownload,
  faArrowsAltH,
  faTimes
} from '@fortawesome/free-solid-svg-icons';

library.add(
  faParagraph,
  faImage,
  faSearch,
  faSpinner,
  faEdit,
  faMobileAlt,
  faTabletAlt,
  faLaptop,
  faExternalLinkAlt,
  faFileDownload,
  faArrowsAltH,
  faTimes
);
import JavascriptTimeAgo from 'javascript-time-ago';
import en from 'javascript-time-ago/locale/en';

import KeenAnalysisContext from '../contexts/keenAnalysis';

JavascriptTimeAgo.locale(en);

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export let keenGlobals = undefined;
if (typeof webpackKeenGlobals !== 'undefined') {
  keenGlobals = webpackKeenGlobals;
}

export class DashboardViewer {
  constructor(props) {
    const { keenAnalysis, dashboardInfo } = props;
    const shouldRenderViewer = dashboardInfo && !isEmpty(dashboardInfo);
    const client =
      keenAnalysis.instance || new KeenAnalysis(keenAnalysis.config);
    const keenWebHost = props.keenWebHost || window.location.host;
    let keenWebFetchOptions;

    if (!!props.keenWebHost) {
      keenWebFetchOptions = {
        mode: 'cors',
        credentials: 'include'
      };
    }

    const store = createStore(
      rootReducer,
      composeEnhancers(
        applyMiddleware(
          thunk.withExtraArgument({
            keenClient: client,
            keenWebHost,
            keenWebFetchOptions
          })
        )
      )
    );

    ReactDOM.render(
      <Provider store={store}>
        <KeenAnalysisContext.Provider value={client}>
          <Router>
            {shouldRenderViewer ? (
              <Route
                path="/"
                component={routeProps => <Editor {...routeProps} {...props} />}
                exact
              />
            ) : (
              <Route path="/" component={Main} exact />
            )}
            <Route
              path="/viewer/:id"
              component={routeProps => <Editor {...routeProps} {...props} />}
            />
          </Router>
        </KeenAnalysisContext.Provider>
      </Provider>,
      document.querySelector(props.container)
    );
  }
}

DashboardViewer.propTypes = {
  dashboardInfo: PropTypes.shape({
    created_date: PropTypes.string,
    data: PropTypes.shape({
      version: PropTypes.number,
      items: PropTypes.arrayOf(
        PropTypes.shape({
          height: PropTypes.number,
          width: PropTypes.number,
          top: PropTypes.number,
          left: PropTypes.number,
          colors: PropTypes.array,
          palette: PropTypes.string,
          picker: PropTypes.object,
          legend: PropTypes.shape({
            value: PropTypes.string,
            label: PropTypes.string
          }),
          sparkline: PropTypes.shape({
            value: PropTypes.bool,
            label: PropTypes.string
          }),
          stacking: PropTypes.shape({
            value: PropTypes.string,
            label: PropTypes.string
          }),
          savedQuery: PropTypes.shape({
            value: PropTypes.string,
            label: PropTypes.string
          })
        })
      )
    }),
    id: PropTypes.string,
    is_public: PropTypes.bool,
    last_modified_date: PropTypes.string,
    project_id: PropTypes.string,
    rows: PropTypes.arrayOf(
      PropTypes.shape({
        height: PropTypes.number,
        tiles: PropTypes.arrayOf(
          PropTypes.shape({
            column_width: PropTypes.number,
            query_name: PropTypes.string
          })
        )
      })
    ),
    settings: PropTypes.shape({
      dryRun: PropTypes.bool,
      is_public: PropTypes.bool,
      colors: PropTypes.array,
      palette: PropTypes.string,
      picker: PropTypes.object
    }),
    title: PropTypes.string
  })
};
