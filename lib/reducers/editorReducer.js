import * as actionTypes from "../actions/actionTypes";
import resizingCount from "../func/resizingCount";
import checkBoundaries from "../func/checkBoundaries";

const defaultData = {
  dashboardInfo: {
    id: "",
    dashboardTitle: "",
    dashboardData: [],
    palette: "",
    dryRun: false
  },
  isResizing: false,
  isMoving: false,
  isLoading: false,
  draggedType: {},
  toolbarVisible: false,
  grid: 20,
  dashboardSaved: false,
  settingsVisible: false,
  savedQueries: "",
  dashboardList: [],
};

const editorReducer = (state = defaultData, action) => {
  const { dashboardInfo, grid } = state;
  switch (action.type) {
    case actionTypes.LOAD_DASHBOARD_INFO:
      const dashboards = localStorage.getItem("dashboards");
      const parsedDashboards = JSON.parse(dashboards);
      return {
        ...state,
        dashboardInfo: parsedDashboards.find(el => el.id === action.id),
        dashboardList: parsedDashboards,
      };
    case actionTypes.CLEAR_DASHBOARD_INFO:
      return {
        ...state,
        dashboardInfo: {
          id: "",
          dashboardTitle: "",
          dashboardData: [],
          palette: "",
          dryRun: false
        },
        settingsVisible: false
      }
    case actionTypes.SET_LOADING:
      return {
        ...state,
        isLoading: action.index
      };
    case actionTypes.SELECT_SAVED_QUERY:
      return {
        ...state,
        dashboardInfo: {
          ...dashboardInfo,
          dashboardData: [
            ...dashboardInfo.dashboardData.map((el, i) =>
              action.index === i
                ? {
                    ...el,
                    sparkline: {
                      value: false,
                      label: "No"
                    },
                    savedQuery: action.value,
                    error: false
                  }
                : el
            )
          ]
        },
        isLoading: false
      };
    case actionTypes.CHANGE_CHART_TYPE:
      return {
        ...state,
        dashboardInfo: {
          ...dashboardInfo,
          dashboardData: [
            ...dashboardInfo.dashboardData.map((el, i) =>
              action.index === i
                ? {
                    ...el,
                    type: action.value
                  }
                : el
            )
          ]
        },
        isLoading: false
      };
    case actionTypes.SAVED_QUERY_ERROR:
      return {
        ...state,
        dashboardInfo: {
          ...dashboardInfo,
          dashboardData: dashboardInfo.dashboardData.map((el, i) =>
            action.index === i
              ? {
                  ...el,
                  error: action.error
                }
              : el
          )
        }
      };
    case actionTypes.GET_SAVED_QUERIES:
      const { savedQueries } = action;
      return {
        ...state,
        savedQueries
      };
    case actionTypes.LOAD_SAVED_QUERIES:
      return {
        ...state,
        dashboardInfo: {
          ...dashboardInfo,
          dashboardData: dashboardInfo.dashboardData.map((el, i) =>
            action.index === i
              ? {
                  ...el,
                  sparkline: {
                    value: false,
                    label: "No"
                  },
                }
              : el
          )
        }
      };
    case actionTypes.LOAD_SAVED_ERROR:
      return {
        ...state,
        dashboardInfo: {
          ...dashboardInfo,
          dashboardData: dashboardInfo.dashboardData.map((el, i) =>
            action.index === i
              ? {
                  ...el,
                  error: action.error
                }
              : el
          )
        }
      };
    case actionTypes.SAVE_DASHBOARD:
      const localStorageDashboards = localStorage.getItem("dashboards");
      const parsedLocalStorageDashboards = JSON.parse(localStorageDashboards);
      const updatedDashboards = parsedLocalStorageDashboards.map(el =>
        el.id === action.id
          ? {
              ...state.dashboardInfo
            }
          : el
      );
      localStorage.setItem("dashboards", JSON.stringify(updatedDashboards));
      return {
        ...state,
        dashboardSaved: true
      };
    case actionTypes.HIDE_SAVED_DASHBOARD_MESSAGE:
      return {
        ...state,
        dashboardSaved: false
      };
    case actionTypes.CHANGE_DASHBOARD_TITLE:
      return {
        ...state,
        dashboardInfo: {
          ...dashboardInfo,
          dashboardTitle: action.title
        }
      };
    case actionTypes.TOOGLE_DRY_RUN:
      return {
        ...state,
        dashboardInfo: {
          ...dashboardInfo,
          dryRun: !dashboardInfo.dryRun
        }
      }
    case actionTypes.SELECT_PALETTE:
      return {
        ...state,
        dashboardInfo: {
          ...dashboardInfo,
          palette: action.value,
          dashboardData: dashboardInfo.dashboardData.map(el => ({
            ...el,
            palette: action.value.value
          }))
        }
      };
    case actionTypes.SHOW_TOOLBAR:
      return {
        ...state,
        toolbarVisible: true
      };
    case actionTypes.CLOSE_TOOLBAR:
      return {
        ...state,
        toolbarVisible: false
      };
    case actionTypes.DRAG_START_HANDLER:
      return {
        ...state,
        draggedType: action.draggedType,
        toolbarVisible: false
      };
    case actionTypes.DROP_HANDLER:
      return {
        ...state,
        dashboardInfo: {
          ...dashboardInfo,
          dashboardData: [...dashboardInfo.dashboardData, action.newElement]
        },
        draggedType: {},
        settingsVisible: dashboardInfo.dashboardData.length
      };
    case actionTypes.CHANGE_CHART_TITLE:
      return {
        ...state,
        dashboardInfo: {
          ...dashboardInfo,
          dashboardData: [
            ...dashboardInfo.dashboardData.map((el, i) =>
              action.index === i
                ? {
                    ...el,
                    chartTitle: action.title
                  }
                : el
            )
          ]
        }
      };
    case actionTypes.RESIZE_CHART:
      return {
        ...state,
        isResizing: action.index,
        dashboardInfo: {
          ...dashboardInfo,
          dashboardData: dashboardInfo.dashboardData.map((el, i) =>
            action.index === i
              ? {
                  ...el,
                  ...resizingCount(
                    action.element,
                    action.ePageX,
                    action.ePageY,
                    el,
                    grid,
                    action.clientRect
                  )
                }
              : el
          )
        }
      };
    case actionTypes.STOP_RESIZE_CHART:
      return {
        ...state,
        isResizing: false
      };
    case actionTypes.MOVE_CHART:
      return {
        ...state,
        dashboardInfo: {
          ...dashboardInfo,
          dashboardData: dashboardInfo.dashboardData.map((el, i) =>
            action.index === i
              ? {
                  ...el,
                  ...checkBoundaries(
                    Math.round((action.ePageY - el.height / 2) / grid) * grid,
                    Math.round(
                      (action.ePageX - action.clientRect.left - el.width / 2) /
                        grid
                    ) *
                      grid -
                      grid,
                    el.width,
                    action.clientRect
                  )
                }
              : el
          )
        },
        isMoving: action.index,
        settingsVisible: false
      };
    case actionTypes.STOP_MOVE_CHART:
      return {
        ...state,
        isMoving: false
      };
    case actionTypes.DELETE_CHART:
      const approval = confirm("Do You want to delete this chart?");
      if (approval) {
        return {
          ...state,
          settingsVisible: false,
          dashboardInfo: {
            ...dashboardInfo,
            dashboardData: dashboardInfo.dashboardData.filter(
              (el, i) => i !== action.index
            )
          }
        };
      }
    case actionTypes.CLOSE_SETTINGS:
      return {
        ...state,
        settingsVisible: false
      };
    case actionTypes.SHOW_SETTINGS:
      return {
        ...state,
        settingsVisible: action.index
      };
    case actionTypes.SELECT_LEGEND_POSITION:
      return {
        ...state,
        dashboardInfo: {
          ...dashboardInfo,
          dashboardData: [
            ...dashboardInfo.dashboardData.map((el, i) =>
              action.index === i
                ? {
                    ...el,
                    legend: action.value
                  }
                : el
            )
          ]
        }
      };
    case actionTypes.SELECT_SPARKLINE_OPTION:
      return {
        ...state,
        dashboardInfo: {
          ...dashboardInfo,
          dashboardData: [
            ...dashboardInfo.dashboardData.map((el, i) =>
              action.index === i
                ? {
                    ...el,
                    sparkline: action.value
                  }
                : el
            )
          ]
        }
      };
    case actionTypes.SELECT_STACKING_OPTION:
      return {
        ...state,
        dashboardInfo: {
          ...dashboardInfo,
          dashboardData: [
            ...dashboardInfo.dashboardData.map((el, i) =>
              action.index === i
                ? {
                    ...el,
                    stacking: action.value
                  }
                : el
            )
          ]
        }
      };
    case actionTypes.SET_SRC_FOR_IMG:
      return {
        ...state,
        dashboardInfo: {
          ...dashboardInfo,
          dashboardData: [
            ...dashboardInfo.dashboardData.map((el, i) =>
              action.index === i
                ? {
                    ...el,
                    src: action.value
                  }
                : el
            )
          ]
        }
      };
    case actionTypes.SET_TEXT_FOR_PARAGRAPH:
      if (action.source === "user") {
        return {
          ...state,
          dashboardInfo: {
            ...dashboardInfo,
            dashboardData: [
              ...dashboardInfo.dashboardData.map((el, i) =>
                action.index === i
                  ? {
                      ...el,
                      text: action.newValue
                    }
                  : el
              )
            ]
          }
        };
      }
    case actionTypes.CLONE_CHART:
      const clonedElement = {
        ...dashboardInfo.dashboardData[action.index],
        top:
          dashboardInfo.dashboardData[action.index].top +
          dashboardInfo.dashboardData[action.index].height
      };
      return {
        ...state,
        dashboardInfo: {
          ...dashboardInfo,
          dashboardData: [...dashboardInfo.dashboardData, clonedElement]
        }
      };
    default:
      return state;
  }
};

export default editorReducer;
