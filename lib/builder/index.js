import React from "react";
import ReactDOM from "react-dom";
import { HashRouter as Router, Route } from "react-router-dom";
import { createStore, applyMiddleware, combineReducers } from "redux";
import { Provider } from "react-redux";
import thunk from "redux-thunk";
import mainReducer from "../reducers/mainReducer";
import editorReducer from "../reducers/editorReducer";
import Main from "./components/Main";
import Editor from "./components/Editor";
import "keen-dataviz/dist/keen-dataviz.css";
import "../../styles/style.css";
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
  faShareAlt
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
  faShareAlt
);

const rootReducer = combineReducers({ mainReducer, editorReducer });

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(rootReducer, composeEnhancers(
  applyMiddleware(thunk)
));

const App = () => {
  return (
    <Provider store={store}>
      <Router>
        <Route path="/" component={Main} exact />
        <Route path="/editor/:id" component={Editor} />
      </Router>
    </Provider>
  );
};

ReactDOM.render(<App />, document.getElementById("app"));
