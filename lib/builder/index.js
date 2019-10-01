import React from 'react';
import ReactDOM from 'react-dom';
import { HashRouter as Router, Route } from 'react-router-dom';
import { createStore, applyMiddleware, compose } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import KeenAnalysis from 'keen-analysis';
import rootReducer from '../reducers/rootReducer';
import Main from './components/Main';
import Editor from './components/Editor';
import 'keen-dataviz/dist/keen-dataviz.css';
import '../../styles/style.css';
import { library } from '@fortawesome/fontawesome-svg-core';
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
  faFilter
} from '@fortawesome/free-solid-svg-icons';

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
  faFilter
);
import JavascriptTimeAgo from 'javascript-time-ago';
import en from 'javascript-time-ago/locale/en';

JavascriptTimeAgo.locale(en);

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(thunk))
);

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
          <Route path="/" component={Main} exact />
          <Route path="/editor/:id" component={Editor} />
        </Router>
      </Provider>,
      document.querySelector(props.container)
    );
  }
}
