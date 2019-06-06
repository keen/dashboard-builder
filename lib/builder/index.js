import React from "react";
import ReactDOM from "react-dom";
import { HashRouter as Router, Route } from "react-router-dom";
import Main from "./components/Main";
import Editor from "./components/Editor";
import "keen-dataviz/dist/keen-dataviz.css";
import '../../styles/style.css';
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
  faClone
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
  faClone
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
