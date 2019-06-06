import React, { Component } from "react";
import MainContainer from '../../viewer/components/MainContainer';

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

  addDashboardItem = () => {
    const dashboardList = [
      ...this.state.dashboardList,
      { dashboardTitle: "Unnamed dashboard", dashboardData: [] }
    ];
    this.setState({
      dashboardList
    });
    localStorage.setItem("dashboards", JSON.stringify(dashboardList));
  };

  handleSearch = e => {
    this.setState({
      searchInput: e.target.value
    });
  };

  deleteDashboardItem = index => {
    const approval = confirm("Do You want to delete this dashboard?");
    const dashboardList = this.state.dashboardList.filter(
      (el, i) => i !== index
    );
    if (approval) {
      this.setState({
        dashboardList
      });
      localStorage.setItem("dashboards", JSON.stringify(dashboardList));
    }
  };

  render() {
    const { dashboardList, searchInput } = this.state;
    return (
      <MainContainer 
        dashboardList={dashboardList}
        searchInput={searchInput}
        addDashboardItem={this.addDashboardItem}
        handleSearch={this.handleSearch}
        deleteDashboardItem={this.deleteDashboardItem}
      />
    );
  }
}
