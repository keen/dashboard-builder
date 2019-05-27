import React, { Component } from "react";
import TopDashboardEditorToolbar from "./TopDashboardEditorToolbar";
import DashboardEditor from "./DashboardEditor";

export default class Editor extends Component {
  constructor(props) {
    super(props);
    this.ref = React.createRef();
    this.state = {
      dashboardInfo: {
        dashboardTitle: "",
        dashboardData: [],
        palette: "",
      },
      isResizing: false,
      isMoving: false,
      draggedType: {},
      toolbarVisible: false,
      grid: 20,
      dashboardSaved: false,
      settingsVisible: false
    };
  }

  componentDidMount() {
    const dashboards = localStorage.getItem("dashboards");
    const parsedDashboards = JSON.parse(dashboards);
    this.setState({
      dashboardInfo:
        parsedDashboards[this.props.match.params.id] === null
          ? []
          : parsedDashboards[this.props.match.params.id]
    });
  }

  render() {
    const {
      dashboardInfo: { dashboardTitle, dashboardData },
    } = this.state;
    return (
      <React.Fragment>
        <div className="dashboard-container">
          <div className="dashboard-inner-container">
            <TopDashboardEditorToolbar
              dashboardTitle={dashboardTitle}
            />
            <DashboardEditor
              ref={this.ref}
              dashboardData={dashboardData}
            />
          </div>
        </div>
      </React.Fragment>
    );
  }
}
