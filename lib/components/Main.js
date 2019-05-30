import React, { Component } from "react";
import MainTopToolbar from "./MainTopToolbar";
import MainListItem from "./MainListItem";

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
    const list = dashboardList.filter(
      el =>
        searchInput === "" ||
        el.dashboardTitle.toLowerCase().includes(searchInput.toLowerCase())
    );
    return (
      <div className="container">
        <MainTopToolbar
          handleSearch={this.handleSearch}
          addDashboardItem={this.addDashboardItem}
        />
        {list.length ? (
          list.map(({ dashboardTitle }, i) => {
            return (
              <MainListItem
                key={i}
                dashboardTitle={dashboardTitle}
                index={i}
                deleteDashboardItem={this.deleteDashboardItem}
              />
            );
          })
        ) : (
          <div className="message">No dashboards found...</div>
        )}
      </div>
    );
  }
}
