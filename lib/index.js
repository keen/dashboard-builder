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

export let client;

export class DashboardBuilder {
  constructor(props) {
    const { keenAnalysis } = props;

    client = keenAnalysis.instance || new KeenAnalysis(keenAnalysis.config);

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
