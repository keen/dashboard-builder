import React, { Component } from "react";
import TopToolbar from "./TopToolbar";
import DashboardItem from "./DashboardItem";

export default class Main extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dashboardList: [
        {
          title: "Dashboard 1"
        },
        {
          title: "Dashboard 2"
        }
      ],
      searchInput: ""
    };
  }

  addDashboardItem = () => {
    const { dashboardList } = this.state;
    this.setState({
      dashboardList: [
        ...dashboardList,
        { title: `Dashboard ${dashboardList.length + 1}` }
      ]
    });
  };

  handleSearch = e => {
    this.setState({
      searchInput: e.target.value
    });
  };

  deleteDashboardItem = (e, index) => {
    this.setState({
      dashboardList: this.state.dashboardList.filter((el, i) => i !== index)
    });
  };

  render() {
    const { dashboardList, searchInput } = this.state;
    const list = dashboardList.filter(
      el =>
        searchInput === "" ||
        el.title.toLowerCase().includes(searchInput.toLowerCase())
    );
    return (
      <div className="container">
        <TopToolbar
          handleSearch={this.handleSearch}
          addDashboardItem={this.addDashboardItem}
        />
        {list.map(({ title }, i) => {
          return (
            <DashboardItem
              key={i}
              title={title}
              index={i}
              deleteDashboardItem={this.deleteDashboardItem}
            />
          );
        })}
      </div>
    );
  }
}
