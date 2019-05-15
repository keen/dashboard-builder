import React, { Component } from "react";
import Toolbar from "./Toolbar";
import DashboardEditor from "./DashboardEditor";
import checkBoundaries from "../func/checkBoundaries";
import resizingCount from "../func/resizingCount";
import client from "../config/analysis";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default class Editor extends Component {
  constructor(props) {
    super(props);
    this.ref = React.createRef();
    this.state = {
      dashboardInfo: {
        dashboardTitle: "",
        dashboardData: []
      },
      isResizing: false,
      isMoving: false,
      draggedType: {},
      toolbarVisible: false,
      grid: 20
    };
  }

  componentDidMount() {
    const dashboards = localStorage.getItem("dashboards");
    const parsedDashboards = JSON.parse(dashboards);
    this.setState({
      dashboardInfo: parsedDashboards[this.props.match.params.id]
    });
  }

  saveDashboard = () => {
    const dashboards = localStorage.getItem("dashboards");
    const parsedDashboards = JSON.parse(dashboards);
    parsedDashboards[this.props.match.params.id] = this.state.dashboardInfo;
    console.log(parsedDashboards)
    localStorage.setItem("dashboards", JSON.stringify(parsedDashboards));
  }

  changeDashboardTitle = e => {
    this.setState({
      dashboardInfo: {
        ...this.state.dashboardInfo,
        dashboardTitle: e.target.value
      }
    });
  };

  toolbarVisibleShow = () => {
    this.setState({
      toolbarVisible: true
    });
  };

  toolbarVisibleHide = () => {
    this.setState({
      toolbarVisible: false
    });
  };

  dragStartHandler = e => {
    this.setState({
      draggedType: e.target.getAttribute("name"),
      toolbarVisible: false
    });
  };

  dragOverHandler = e => {
    e.preventDefault();
  };

  dropHandler = e => {
    const {
      dashboardInfo: { dashboardData },
      draggedType,
      grid
    } = this.state;
    const top = Math.round(e.pageY / grid) * grid - grid;
    const left =
      Math.round(
        (e.pageX - this.ref.current.getBoundingClientRect().left) / grid
      ) *
        grid -
      grid;
    const width = 500;
    const height = 300;
    const chartTitle = "";
    const newElement = {
      type: draggedType,
      chartTitle,
      ...checkBoundaries(
        top,
        left,
        width,
        this.ref.current.getBoundingClientRect()
      ),
      width,
      height
    };
    e.preventDefault();
    this.setState({
      dashboardInfo: {
        ...this.state.dashboardInfo,
        dashboardData: [...dashboardData, newElement]
      },
      draggedType: {}
    });
  };

  changeTitle = (e, index) => {
    const {
      dashboardInfo: { dashboardData }
    } = this.state;
    this.setState({
      dashboardInfo: {
        ...this.state.dashboardInfo,
        dashboardData: [
          ...dashboardData.map((el, i) => {
            if (index === i) {
              return {
                ...el,
                chartTitle: e.target.value
              };
            }
            return el;
          })
        ]
      }
    });
  };

  selectSavedQuery = (e, index) => {
    const { dashboardInfo: {dashboardData} } = this.state;
    client.query("saved", e.target.value).then(res => {
      this.setState({
        dashboardInfo: {
          ...this.state.dashboardInfo,
          dashboardData: [
            ...dashboardData.map((el, i) => {
              if (index === i) {
                return {
                  ...el,
                  results: res,
                  sparkline: false
                };
              }
              return el;
            })
          ]
        }
      });
    });
  };

  resize = (e, index) => {
    const element = e.target.getAttribute("class");
    const startResize = e => {
      const { grid } = this.state;
      this.setState({
        isResizing: index,
        dashboardInfo: {
          ...this.state.dashboardInfo,
          dashboardData: this.state.dashboardInfo.dashboardData.map((el, i) => {
            if (i === index) {
              return {
                ...el,
                ...resizingCount(
                  element,
                  e.pageX,
                  e.pageY,
                  el,
                  grid,
                  this.ref.current.getBoundingClientRect()
                )
              };
            }
            return el;
          })
        }
      });
    };
    const stopResize = () => {
      this.setState({
        isResizing: false
      });
      window.removeEventListener("mousemove", startResize, false);
    };
    window.addEventListener("mousemove", startResize, false);
    window.addEventListener("mouseup", stopResize, false);
  };

  moveChart = (e, index) => {
    const startMove = e => {
      const { grid } = this.state;
      this.setState({
        dashboardInfo: {
          ...this.state.dashboardInfo,
          dashboardData: this.state.dashboardInfo.dashboardData.map((el, i) =>
          i === index
            ? {
                ...el,
                ...checkBoundaries(
                  Math.round((e.pageY - el.height / 2) / grid) * grid,
                  Math.round(
                    (e.pageX -
                      this.ref.current.getBoundingClientRect().left -
                      el.width / 2) /
                      grid
                  ) *
                    grid -
                    grid,
                  el.width,
                  this.ref.current.getBoundingClientRect()
                )
              }
            : el
        ),
        },
        isMoving: index
      });
    };
    const stopMove = () => {
      this.setState({
        isMoving: false
      });
      window.removeEventListener("mousemove", startMove, false);
    };
    window.addEventListener("mousemove", startMove, false);
    window.addEventListener("mouseup", stopMove, false);
  };

  deleteChart = (e, index) => {
    const approval = confirm("Do You want to delete this chart?");
    if (approval) {
      this.setState({
        dashboardInfo: {
          ...this.state.dashboardInfo,
          dashboardData: this.state.dashboardInfo.dashboardData.filter((el, i) => i !== index)
        }
      });
    }
  };

  render() {
    const {
      dashboardInfo: { dashboardTitle, dashboardData },
      isMoving,
      isResizing,
      toolbarVisible
    } = this.state;
    return (
      <React.Fragment>
        <Toolbar
          dragStartHandler={this.dragStartHandler}
          toolbarVisible={toolbarVisible}
          toolbarVisibleShow={this.toolbarVisibleShow}
          toolbarVisibleHide={this.toolbarVisibleHide}
        />
        <div className="dashboard-container">
          <div className="dashboard-title">
            <input
              type="text"
              value={dashboardTitle}
              onChange={this.changeDashboardTitle}
              placeholder="Enter your dashboard title..."
            />
            <div className="save-dashboard-button" onClick={this.saveDashboard}>
              <FontAwesomeIcon icon="save" /> Save
            </div>
          </div>
          <DashboardEditor
            ref={this.ref}
            dragOverHandler={this.dragOverHandler}
            dropHandler={this.dropHandler}
            dashboardData={dashboardData}
            changeTitle={this.changeTitle}
            selectSavedQuery={this.selectSavedQuery}
            resize={this.resize}
            isResizing={isResizing}
            moveChart={this.moveChart}
            isMoving={isMoving}
            deleteChart={this.deleteChart}
          />
        </div>
      </React.Fragment>
    );
  }
}
