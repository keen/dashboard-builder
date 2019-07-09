import React from "react";
import ReactDOM from "react-dom";
import { HashRouter as Router, Route } from "react-router-dom";
import { createStore, applyMiddleware, compose } from "redux";
import { Provider } from "react-redux";
import thunk from "redux-thunk";
import rootReducer from "../reducers/rootReducer";
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
  faEdit
} from "@fortawesome/free-solid-svg-icons";

library.add(faParagraph, faImage, faSearch, faSpinner, faEdit);

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(thunk))
);

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
