import React from "react";
import ReactDOM from "react-dom";
import { HashRouter as Router, Route } from "react-router-dom";
import Editor from "./components/Editor";
import "keen-dataviz/dist/keen-dataviz.css";
import "./styles/style.css";
import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faParagraph,
  faImage,
} from "@fortawesome/free-solid-svg-icons";

library.add(
  faParagraph,
  faImage,
);

const App = () => {
  return (
    <Router>
      <Route path="/:id" component={Editor} />
    </Router>
  );
};

ReactDOM.render(<App />, document.getElementById("app"));
