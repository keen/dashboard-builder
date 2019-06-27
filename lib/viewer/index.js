import React from "react";
import ReactDOM from "react-dom";
import { HashRouter as Router, Route } from "react-router-dom";
import { createStore, applyMiddleware, combineReducers, compose } from "redux";
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
  faParagraph,
  faImage,
  faSearch,
  faSpinner,
  faCog
} from "@fortawesome/free-solid-svg-icons";

library.add(faParagraph, faImage, faSearch, faSpinner, faCog);

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
        <Route path="/viewer/:id" component={Editor} />
      </Router>
    </Provider>
  );
};

ReactDOM.render(<App />, document.getElementById("app"));
