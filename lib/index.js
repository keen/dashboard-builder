import React from "react";
import ReactDOM from "react-dom";
import { HashRouter as Router, Route } from "react-router-dom";
import { createStore, applyMiddleware, compose } from "redux";
import { Provider } from "react-redux";
import thunk from "redux-thunk";
import KeenAnalysis from "keen-analysis";
import rootReducer from "./reducers/rootReducer";
import MainBuilder from "./builder/components/Main";
import Editor from "./builder/components/Editor";
import MainViewer from "./viewer/components/Main";
import Viewer from "./viewer/components/Editor";
import "keen-dataviz/dist/keen-dataviz.css";
import "../styles/style.css";
import { library } from "@fortawesome/fontawesome-svg-core";
import isEqual from "lodash/isEqual";
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
  faFilter
} from "@fortawesome/free-solid-svg-icons";
import { saveDashboard, hideSavedDashboardMessage } from "./actions/rootActions";

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
  faFilter
);

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(thunk))
);

let currentState = select(store.getState());

function select(state) {
  return state.dashboardInfo;
};

function changeStore(state) {
  setTimeout(() => {
    store.dispatch(saveDashboard(state));
  }, 1000);
  setTimeout(() => {
    store.dispatch(hideSavedDashboardMessage());
  }, 2000);
}

function observeStore(store, select, onChange) {

  function handleChange() {
    let nextState = select(store.getState());

    function isStateChanged() {
      return !isEqual(nextState.data, currentState.data) ||
      !isEqual(nextState.settings, currentState.settings) ||
      nextState.title !== currentState.title;
    }
        
    if (isStateChanged()) {
      if (nextState.id === currentState.id) {
        onChange(nextState);
      }
      currentState = nextState;
    }
  }

  let unsubscribe = store.subscribe(handleChange);
  handleChange();
  return unsubscribe;
};

observeStore(store, select, changeStore);

export let client;

export let keenWebHost;

export class DashboardBuilder {
  constructor(props) {
    const { keenAnalysis } = props;

    client = keenAnalysis.instance || new KeenAnalysis(keenAnalysis.config);
    keenWebHost = props.keenWebHost || window.location.host

    ReactDOM.render(
      <Provider store={store}>
        <Router>
          <Route path="/" component={MainBuilder} exact />
          <Route path="/editor/:id" component={Editor} />
          <Route path="/viewer/" component={MainViewer} exact />
          <Route path="/viewer/:id" component={Viewer} />
        </Router>
      </Provider>,
      document.querySelector(props.container)
    );
  }
}
