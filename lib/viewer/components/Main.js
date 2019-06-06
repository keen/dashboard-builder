import React, { Component } from "react";
import MainContainer from "./MainContainer";

export default class Main extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dashboardList: [],
      searchInput: ""
    };
  }

  componentDidMount() {
    const dashboards = localStorage.getItem("dashboards");
    let parsedDashboard = JSON.parse(dashboards);
    this.setState({
      dashboardList: parsedDashboard === null ? [] : parsedDashboard
    });
  }

  handleSearch = e => {
    this.setState({
      searchInput: e.target.value
    });
  };

  render() {
    const { dashboardList, searchInput } = this.state;
    return (
      <MainContainer
        dashboardList={dashboardList}
        searchInput={searchInput}
        handleSearch={this.handleSearch}
      />
    );
  }
}
