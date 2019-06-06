import React, { Component } from "react";
import EditorContainer from './EditorContainer';
import axios from 'axios';
import client from '../../../config/analysis';

export default class Editor extends Component {
  constructor(props) {
    super(props);
    this.ref = React.createRef();
    this.state = {
      dashboardInfo: {
        dashboardTitle: "",
        dashboardData: [],
        palette: ""
      },
      dashboardList: [],
      isResizing: false,
      isMoving: false,
      draggedType: {},
      toolbarVisible: false,
      grid: 20,
      dashboardSaved: false,
      settingsVisible: false,
      savedQueries: ""
    };
  }

  componentDidMount() {
    const dashboards = localStorage.getItem("dashboards");
    const parsedDashboards = JSON.parse(dashboards);
    this.setState({
      dashboardList: parsedDashboards,
      dashboardInfo:
        parsedDashboards[this.props.match.params.id] === null
          ? []
          : parsedDashboards[this.props.match.params.id]
    });

    client
      .get('https://keen.io/projects/57856dd7ae574d605105ad75/dashboards?')
      .auth(client.readKey())
      .send()
      .then((res) => {
        console.log(res)
      })
      .catch((err) => {
        console.log('Error fetching dashboards', err)
        console.log(err.stack)
      })
  }

  render() {this.state.dashboardList.forEach(el => {
  })
    const {
      dashboardInfo: { dashboardTitle, dashboardData, palette },
      isMoving,
      isResizing,
      settingsVisible
    } = this.state;
    return (
      <EditorContainer
        dashboardTitle={dashboardTitle}
        dashboardData={dashboardData}
        palette={palette}
        ref={this.ref}
        isResizing={isResizing}
        isMoving={isMoving}
        settingsVisible={settingsVisible}
      />
    );
  }
}
