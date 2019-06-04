import React, { Component } from "react";
import EditorToolbar from "./EditorToolbar";
import EditorTopToolbar from "./EditorTopToolbar";
import EditorDashboard from "./EditorDashboard";
import Settings from "./Settings";
import checkBoundaries from "../func/checkBoundaries";
import resizingCount from "../func/resizingCount";
import client from "../../../config/analysis";

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
      isResizing: false,
      isMoving: false,
      draggedType: {},
      toolbarVisible: false,
      grid: 20,
      dashboardSaved: false,
      settingsVisible: false,
      savedQueries: "",
      hoverChart: false
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
    client
      .get(client.url("queries", "saved"))
      .auth(client.masterKey())
      .send()
      .then(res => {
        this.setState({
          savedQueries: res
        });
      })
      .catch(err => {
        console.log(err);
      });
  }

  saveDashboard = () => {
    const dashboards = localStorage.getItem("dashboards");
    const parsedDashboards = JSON.parse(dashboards);
    parsedDashboards[this.props.match.params.id] = this.state.dashboardInfo;
    localStorage.setItem("dashboards", JSON.stringify(parsedDashboards));
    this.setState({
      dashboardSaved: true
    });
    setInterval(() => {
      this.setState({
        dashboardSaved: false
      });
    }, 2000);
  };

  selectPalette = e => {
    this.setState({
      dashboardInfo: {
        ...this.state.dashboardInfo,
        palette: e,
        dashboardData: this.state.dashboardInfo.dashboardData.map(el => ({
          ...el,
          palette: e.value
        }))
      }
    });
  };

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
    e.dataTransfer.setData('text','');
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
      dashboardInfo: { dashboardData, palette },
      draggedType,
      grid,
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
      height,
      palette: palette ? palette.value : '',
      legend: { value: "right", label: "Right" },
      sparkline: { value: true, label: "Yes" },
      stacking: { value: "", label: "None" },
      text: ""
    };
    e.preventDefault();
    this.setState({
      dashboardInfo: {
        ...this.state.dashboardInfo,
        dashboardData: [...dashboardData, newElement]
      },
      draggedType: {},
      settingsVisible: this.state.dashboardInfo.dashboardData.length,
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
          ...dashboardData.map((el, i) =>
            index === i
              ? {
                  ...el,
                  chartTitle: e.target.value
                }
              : el
          )
        ]
      }
    });
  };

  selectSavedQuery = (e, index) => {
    const {
      dashboardInfo: { dashboardData }
    } = this.state;
    client.query("saved", e.value).then(res => {
      this.setState({
        dashboardInfo: {
          ...this.state.dashboardInfo,
          dashboardData: [
            ...dashboardData.map((el, i) =>
              index === i
                ? {
                    ...el,
                    results: res,
                    sparkline: {
                      value: false,
                      label: "No"
                    },
                    savedQuery: e
                  }
                : el
            )
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
          dashboardData: this.state.dashboardInfo.dashboardData.map((el, i) =>
            index === i
              ? {
                  ...el,
                  ...resizingCount(
                    element,
                    e.pageX,
                    e.pageY,
                    el,
                    grid,
                    this.ref.current.getBoundingClientRect()
                  )
                }
              : el
          )
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

  moveChart = index => {
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
          )
        },
        isMoving: index,
        settingsVisible: false
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

  deleteChart = index => {
    const approval = confirm("Do You want to delete this chart?");
    if (approval) {
      this.setState({
        settingsVisible: false,
        dashboardInfo: {
          ...this.state.dashboardInfo,
          dashboardData: this.state.dashboardInfo.dashboardData.filter(
            (el, i) => i !== index
          )
        }
      });
    }
  };

  closeSettings = () => {
    this.setState({
      settingsVisible: false
    });
  };

  settingsShow = (e, index) => {
    this.setState({
      settingsVisible: index
    });
    e.stopPropagation();
  };

  selectLegendPosition = (e, index) => {
    const {
      dashboardInfo: { dashboardData }
    } = this.state;
    this.setState({
      dashboardInfo: {
        ...this.state.dashboardInfo,
        dashboardData: [
          ...dashboardData.map((el, i) =>
            index === i
              ? {
                  ...el,
                  legend: e
                }
              : el
          )
        ]
      }
    });
  };

  selectSparklineOption = (e, index) => {
    const {
      dashboardInfo: { dashboardData }
    } = this.state;
    this.setState({
      dashboardInfo: {
        ...this.state.dashboardInfo,
        dashboardData: [
          ...dashboardData.map((el, i) =>
            index === i
              ? {
                  ...el,
                  sparkline: e
                }
              : el
          )
        ]
      }
    });
  };

  selectStackingOption = (e, index) => {
    const {
      dashboardInfo: { dashboardData }
    } = this.state;
    this.setState({
      dashboardInfo: {
        ...this.state.dashboardInfo,
        dashboardData: [
          ...dashboardData.map((el, i) =>
            index === i
              ? {
                  ...el,
                  stacking: e
                }
              : el
          )
        ]
      }
    });
  };

  setSrcForImg = (e, index) => {
    const {
      dashboardInfo: { dashboardData }
    } = this.state;
    this.setState({
      dashboardInfo: {
        ...this.state.dashboardInfo,
        dashboardData: [
          ...dashboardData.map((el, i) =>
            index === i
              ? {
                  ...el,
                  src: e.target.value
                }
              : el
          )
        ]
      }
    });
  };

  setTextForParagraph = (newValue, source, index) => {
    const {
      dashboardInfo: { dashboardData }
    } = this.state;
    if (source === "user") {
      this.setState({
        dashboardInfo: {
          ...this.state.dashboardInfo,
          dashboardData: [
            ...dashboardData.map((el, i) =>
              index === i
                ? {
                    ...el,
                    text: newValue
                  }
                : el
            )
          ]
        }
      });
    }
  };

  cloneChart = (index) => {
    const {
      dashboardInfo: { dashboardData }
    } = this.state;
    const newElement = {
      ...dashboardData[index],
      top: dashboardData[index].top + dashboardData[index].height,
    };
    this.setState({
      dashboardInfo: {
        ...this.state.dashboardInfo,
        dashboardData: [
          ...dashboardData,
          newElement,
        ]
      }
    })
  }

  render() {
    const {
      dashboardInfo: { dashboardTitle, dashboardData, palette },
      isMoving,
      isResizing,
      toolbarVisible,
      dashboardSaved,
      settingsVisible,
      savedQueries
    } = this.state;
    return (
      <React.Fragment>
        <EditorToolbar
          dragStartHandler={this.dragStartHandler}
          toolbarVisible={toolbarVisible}
          toolbarVisibleShow={this.toolbarVisibleShow}
          toolbarVisibleHide={this.toolbarVisibleHide}
        />
        <div className="dashboard-container" onClick={this.closeSettings}>
          <div className="dashboard-inner-container">
            <EditorTopToolbar
              dashboardTitle={dashboardTitle}
              changeDashboardTitle={this.changeDashboardTitle}
              saveDashboard={this.saveDashboard}
            />
            <EditorDashboard
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
              settingsShow={this.settingsShow}
              settingsVisible={settingsVisible}
              cloneChart={this.cloneChart}
            />
          </div>
        </div>
        <Settings
          settingsVisible={settingsVisible}
          dashboardData={
            settingsVisible !== false && dashboardData[settingsVisible]
          }
          selectSavedQuery={this.selectSavedQuery}
          selectLegendPosition={this.selectLegendPosition}
          selectSparklineOption={this.selectSparklineOption}
          selectStackingOption={this.selectStackingOption}
          setSrcForImg={this.setSrcForImg}
          setTextForParagraph={this.setTextForParagraph}
          savedQueries={savedQueries}
          selectPalette={this.selectPalette}
          palette={palette}
        />
        {dashboardSaved && (
          <div className="dashboard-saved-message">Dashboard Saved!</div>
        )}
      </React.Fragment>
    );
  }
}
