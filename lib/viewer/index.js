import React from "react";
import ReactDOM from "react-dom";
import { HashRouter as Router, Route } from "react-router-dom";
import Main from './components/Main';
import Editor from "./components/Editor";
import "keen-dataviz/dist/keen-dataviz.css";
import '../styles/style.css';
import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faParagraph,
  faImage,
  faSearch
} from "@fortawesome/free-solid-svg-icons";

library.add(
  faParagraph,
  faImage,
  faSearch
);

const App = () => {
  return (
    <Router>
      <Route path="/" component={Main} exact />
      <Route path="/editor/:id" component={Editor} />
    </Router>
  );
};

ReactDOM.render(<App />, document.getElementById("app"));
