import React, { Component } from "react";
import Toolbar from "./Toolbar";
import DashboardEditor from "./DashboardEditor";
import checkBoundaries from "../func/checkBoundaries";
import resizingCount from "../func/resizingCount";

const dashboards = [
  [
    {
      type: "area",
      title: "Area chart",
      top: 20,
      left: 20,
      width: 600,
      height: 300,
      query: ''
    }
  ],
  [
    {
      type: "bar",
      title: "Bar chart",
      top: 20,
      left: 20,
      width: 600,
      height: 300,
      query: ''
    },
    {
      type: "area",
      title: "Area chart",
      top: 20,
      left: 640,
      width: 540,
      height: 300,
      query: ''
    },
    {
      type: "line",
      title: "",
      top: 340,
      left: 20,
      width: 1160,
      height: 400,
      query: ''
    }
  ]
];

export default class Editor extends Component {
  constructor(props) {
    super(props);
    this.ref = React.createRef();
    this.state = {
      dashboardId: props.match.params.id,
      dashboardTitle: "",
      dashboardData: dashboards[props.match.params.id]
        ? dashboards[props.match.params.id]
        : [],
      isResizing: false,
      isMoving: false,
      draggedType: {},
      toolbarVisible: false,
      grid: 20
    };
  }

  changeDashboardTitle = e => {
    this.setState({
      dashboardTitle: e.target.value
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
    const { dashboardData, draggedType, grid } = this.state;
    const top = Math.round(e.pageY / grid) * grid - grid;
    const left =
      Math.round(
        (e.pageX - this.ref.current.getBoundingClientRect().left) / grid
      ) *
        grid -
      grid;
    const width = 500;
    const height = 300;
    const title = "";
    const newElement = {
      type: draggedType,
      title,
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
      dashboardData: [...dashboardData, newElement],
      draggedType: {}
    });
  };

  changeTitle = (e, index) => {
    const { dashboardData } = this.state;
    this.setState({
      dashboardData: [
        ...dashboardData.map((el, i) => {
          if (index === i) {
            return {
              ...el,
              title: e.target.value
            };
          }
          return el;
        })
      ]
    });
  };

  resize = (e, index) => {
    const element = e.target.getAttribute("class");
    const startResize = e => {
      const { grid } = this.state;
      this.setState({
        isResizing: index,
        dashboardData: this.state.dashboardData.map((el, i) => {
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
        dashboardData: this.state.dashboardData.map((el, i) =>
          i === index
            ? {
                ...el,
                ...checkBoundaries(
                  Math.round(e.pageY / grid) * grid - grid,
                  Math.round(
                    (e.pageX - this.ref.current.getBoundingClientRect().left) /
                      grid
                  ) *
                    grid -
                    el.width -
                    grid,
                  el.width,
                  this.ref.current.getBoundingClientRect()
                )
              }
            : el
        ),
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
    this.setState({
      dashboardData: this.state.dashboardData.filter((el, i) => i !== index)
    });
  };

  render() {
    const {
      dashboardTitle,
      dashboardData,
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
          </div>
          <DashboardEditor
            ref={this.ref}
            dragOverHandler={this.dragOverHandler}
            dropHandler={this.dropHandler}
            dashboardData={dashboardData}
            changeTitle={this.changeTitle}
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
