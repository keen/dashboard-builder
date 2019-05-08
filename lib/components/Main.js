import React, { Component } from "react";
import TopToolbar from "./TopToolbar";
import DashboardListItem from "./DashboardListItem";

export default class Main extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dashboardList: [
        {
          title: "Unnamed dashboard"
        },
        {
          title: "Unnamed dashboard"
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
        { title: 'Unnamed dashboard' }
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
        {list.length ? list.map(({ title }, i) => {
          return (
            <DashboardListItem
              key={i}
              title={title}
              index={i}
              deleteDashboardItem={this.deleteDashboardItem}
            />
          );
        }) : <div className="message">No dashboards found...</div>}
      </div>
    );
  }
}
