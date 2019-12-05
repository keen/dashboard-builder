import React from 'react';
import ReactDOM from 'react-dom';
import { HashRouter as Router, Route } from 'react-router-dom';
import { createStore, applyMiddleware, compose } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import KeenAnalysis from 'keen-analysis';
import updateAPIKey from './func/updateAPIKey';
import rootReducer from './reducers/rootReducer';
import onlyUIMiddleware from './middleware/onlyUIMiddleware';
import MainBuilder from './builder/components/Main';
import Editor from './builder/components/Editor';
import MainViewer from './viewer/components/Main';
import Viewer from './viewer/components/Editor';
import 'keen-dataviz/dist/keen-dataviz.css';
import '../styles/style.css';
import { library } from '@fortawesome/fontawesome-svg-core';
import { isEqual, omit } from 'lodash';
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
import { saveDashboard } from './actions/rootActions';

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
import JavascriptTimeAgo from 'javascript-time-ago';
import en from 'javascript-time-ago/locale/en';

JavascriptTimeAgo.locale(en);

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(thunk, onlyUIMiddleware))
);

let currentState = select(store.getState());
let debounceTimer;

function select(state) {
  return state.dashboardInfo;
}

function changeStore(state) {
  if (debounceTimer) {
    clearTimeout(debounceTimer);
  }
  debounceTimer = setTimeout(() => {
    store.dispatch(saveDashboard(state));
    debounceTimer = undefined;
  }, 10000);
}

function observeStore(store, select, onChange) {
  function handleChange() {
    let nextState = select(store.getState());
    const { isMoving, isResizing } = store.getState();
    if (isMoving || isResizing) return;

    function isStateChanged() {
      const nextStateData = omit(nextState, ['last_modified_date']);
      const currentStateData = omit(currentState, ['last_modified_date']);

      return !isEqual(nextStateData, currentStateData);
    }
    
    function isSavedQueriesListChanged() {
      const { settings: { savedQueriesList: nextList }} = nextState;
      const { settings: { savedQueriesList: currentList }} = currentState;

      return nextList && currentList && !isEqual(nextList.sort(), currentList.sort());
    }
    
    if (isSavedQueriesListChanged()) {
      if (nextState.id === currentState.id && nextState.is_public) {
        updateAPIKey(nextState.settings.savedQueriesList, nextState.title)
      }
    }

    if (isStateChanged()) {
      if (nextState.id === currentState.id) {
        setTimeout(() => onChange(nextState), 1000);
      }
      currentState = nextState;
    }
  }

  let unsubscribe = store.subscribe(handleChange);
  handleChange();
  return unsubscribe;
}

observeStore(store, select, changeStore);

export let client;
export let keenWebHost;
export let keenWebFetchOptions = {};
export let keenGlobals = undefined;
if (typeof webpackKeenGlobals !== 'undefined') {
  keenGlobals = webpackKeenGlobals;
}

export class DashboardBuilder {
  constructor(props) {
    const { keenAnalysis } = props;

    client = keenAnalysis.instance || new KeenAnalysis(keenAnalysis.config);
    keenWebHost = props.keenWebHost || window.location.host;

    if (!!props.keenWebHost) {
      keenWebFetchOptions = {
        mode: 'cors',
        credentials: 'include'
      };
    }

    ReactDOM.render(
      <Provider store={store}>
        <Router>
          {/*TODO: Remove props spread and read it from state*/}
          <Route
            path="/"
            component={routeProps => <MainBuilder {...routeProps} {...props} />}
            exact
          />{' '}
          <Route
            path="/editor/:id"
            component={routeProps => <Editor {...routeProps} {...props} />}
          />
          <Route
            path="/viewer/"
            component={routeProps => <MainViewer {...routeProps} {...props} />}
            exact
          />
          <Route
            path="/viewer/:id"
            component={routeProps => <Viewer {...routeProps} {...props} />}
          />
        </Router>
      </Provider>,
      document.querySelector(props.container)
    );
  }
}
