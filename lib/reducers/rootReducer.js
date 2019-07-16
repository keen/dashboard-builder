import * as actionTypes from "../actions/actionTypes";
import resizingCount from "../func/resizingCount";
import checkBoundaries from "../func/checkBoundaries";
import editorParse from "../func/oldDashboardData";
import ReactTooltip from "react-tooltip";

const defaultPalette = { value: "", label: "Default" };
const defaultData = {
  dashboardInfo: {
    id: "",
    title: "",
    data: {
      version: 2,
      items: []
    },
    settings: {
      palette: defaultPalette,
      colors: [],
      picker: {},
      dryRun: false
    }
  },
  isResizing: false,
  isMoving: false,
  isLoading: false,
  loadingSettings: false,
  draggedType: {},
  toolbarVisible: false,
  grid: 20,
  dashboardSaved: false,
  settingsVisible: false,
  savedQueries: "",
  dashboardList: [],
  dashboardsMenu: "",
  searchInput: "",
  accessKey: "",
  newDashboardId: "",
  screenSize: "desktop",
};

const editorReducer = (state = defaultData, action) => {
  const { dashboardInfo, grid } = state;
  switch (action.type) {
    case actionTypes.LOAD_LOCAL_STORAGE:
      const dashboards = localStorage.getItem("dashboards");
      const parsedDashboard = JSON.parse(dashboards);
      const dashboardList = parsedDashboard === null ? [] : parsedDashboard;
      const oldLoaded = localStorage.getItem("oldLoaded");
      const parsedOldLoaded = JSON.parse(oldLoaded);
      if (!parsedOldLoaded) {
        const approval = confirm("Do You want to import old dashboards?");
        if (approval) {
          const oldDashboards = editorParse();
          dashboardList.push(...oldDashboards);
          localStorage.setItem("dashboards", JSON.stringify(dashboardList));
        }
        localStorage.setItem("oldLoaded", JSON.stringify(true));
      }
      return {
        ...state,
        dashboardList: dashboardList.sort((a, b) => {
          if (a.title.toLowerCase() < b.title.toLowerCase()) {
            return -1;
          }
          if (a.title.toLowerCase() > b.title.toLowerCase()) {
            return 1;
          }
          return 0;
        })
      };
    case actionTypes.ADD_DASHBOARD_ITEM:
      const newDashboardList = [...state.dashboardList, action.element];
      localStorage.setItem("dashboards", JSON.stringify(newDashboardList));
      return {
        ...state,
        dashboardList: newDashboardList.sort((a, b) => {
          if (a.title.toLowerCase() < b.title.toLowerCase()) {
            return -1;
          }
          if (a.title.toLowerCase() > b.title.toLowerCase()) {
            return 1;
          }
          return 0;
        })
      };
    case actionTypes.HANDLE_SEARCH:
      return {
        ...state,
        searchInput: action.value
      };
    case actionTypes.DELETE_DASHBOARD_ITEM:
      const approvalDelDash = confirm("Do You want to delete this dashboard?");
      if (approvalDelDash) {
        ReactTooltip.hide();
        const dashboardList = state.dashboardList.filter(
          (el, i) => i !== action.index
        );
        localStorage.setItem("dashboards", JSON.stringify(dashboardList));
        return {
          ...state,
          dashboardList: dashboardList.sort((a, b) => {
            if (a.title.toLowerCase() < b.title.toLowerCase()) {
              return -1;
            }
            if (a.title.toLowerCase() > b.title.toLowerCase()) {
              return 1;
            }
            return 0;
          })
        };
      }
    case actionTypes.LOAD_DASHBOARD_INFO:
      const dashboardsAll = localStorage.getItem("dashboards");
      const parsedDashboards = JSON.parse(dashboardsAll);
      return {
        ...state,
        dashboardInfo: parsedDashboards.find(el => el.id === action.id),
        dashboardList: parsedDashboards.sort((a, b) => {
          if (a.title.toLowerCase() < b.title.toLowerCase()) {
            return -1;
          }
          if (a.title.toLowerCase() > b.title.toLowerCase()) {
            return 1;
          }
          return 0;
        })
      };
    case actionTypes.CLEAR_DASHBOARD_INFO:
      return {
        ...state,
        dashboardInfo: {
          id: "",
          title: "",
          data: { version: 2, items: [] },
          settings: {
            palette: defaultPalette,
            colors: [],
            picker: {},
            dryRun: false
          }
        },
        dashboardSaved: false,
        settingsVisible: false
      };
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
          data: {
            ...dashboardInfo.data,
            items: [
              ...dashboardInfo.data.items.map((el, i) =>
                action.index === i
                  ? {
                      ...el,
                      sparkline: {
                        value: false,
                        label: "No"
                      },
                      stacking: {
                        value: "",
                        label: "None"
                      },
                      legend: {
                        value: "right",
                        label: "Right"
                      },
                      savedQuery: Array.isArray(action.value)
                        ? action.value
                        : [action.value],
                      error: false
                    }
                  : el
              )
            ]
          }
        }
      };
    case actionTypes.CHANGE_CHART_TYPE:
      return {
        ...state,
        dashboardInfo: {
          ...dashboardInfo,
          data: {
            ...dashboardInfo.data,
            items: [
              ...dashboardInfo.data.items.map((el, i) =>
                action.index === i
                  ? {
                      ...el,
                      type: action.value
                    }
                  : el
              )
            ]
          }
        },
        isLoading: false
      };
    case actionTypes.SAVED_QUERY_ERROR:
      return {
        ...state,
        dashboardInfo: {
          ...dashboardInfo,
          data: {
            ...dashboardInfo.data,
            items: dashboardInfo.data.items.map((el, i) =>
              action.index === i
                ? {
                    ...el,
                    error: action.error
                  }
                : el
            )
          }
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
          data: {
            ...dashboardInfo.data,
            items: dashboardInfo.data.items.map((el, i) =>
              action.index === i
                ? {
                    ...el,
                    sparkline: el.sparkline
                      ? el.sparkline
                      : {
                          value: false,
                          label: "No"
                        }
                  }
                : el
            )
          }
        }
      };
    case actionTypes.LOAD_SAVED_ERROR:
      return {
        ...state,
        dashboardInfo: {
          ...dashboardInfo,
          data: {
            ...dashboardInfo.data,
            items: dashboardInfo.data.items.map((el, i) =>
              action.index === i
                ? {
                    ...el,
                    error: action.error
                  }
                : el
            )
          }
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
        dashboardSaved: true,
        dashboardList: updatedDashboards.sort((a, b) => {
          if (a.title.toLowerCase() < b.title.toLowerCase()) {
            return -1;
          }
          if (a.title.toLowerCase() > b.title.toLowerCase()) {
            return 1;
          }
          return 0;
        })
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
          title: action.title
        }
      };
    case actionTypes.TOOGLE_DRY_RUN:
      return {
        ...state,
        dashboardInfo: {
          ...dashboardInfo,
          settings: {
            ...dashboardInfo.settings,
            dryRun: !dashboardInfo.settings.dryRun
          }
        }
      };
    case actionTypes.SELECT_PALETTE:
      return {
        ...state,
        dashboardInfo: {
          ...dashboardInfo,
          settings: {
            ...dashboardInfo.settings,
            palette: action.value
          },
          data: {
            ...dashboardInfo.data,
            items: dashboardInfo.data.items.map(el => ({
              ...el,
              palette: action.value.value
            }))
          }
        }
      };
    case actionTypes.CHANGE_COLORS:
      return {
        ...state,
        dashboardInfo: {
          ...dashboardInfo,
          settings: {
            ...dashboardInfo.settings,
            colors: action.value
          },
          data: {
            ...dashboardInfo.data,
            items: dashboardInfo.data.items.map(el => ({
              ...el,
              colors: action.value
            }))
          }
        }
      };
    case actionTypes.CHANGE_PICKER_COLORS:
      return {
        ...state,
        dashboardInfo: {
          ...dashboardInfo,
          settings: {
            ...dashboardInfo.settings,
            picker: action.value
          },
          data: {
            ...dashboardInfo.data,
            items: dashboardInfo.data.items.map(el => ({
              ...el,
              picker: action.value
            }))
          }
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
          data: {
            ...dashboardInfo.data,
            items: [...dashboardInfo.data.items, action.newElement]
          }
        },
        draggedType: {},
        settingsVisible: dashboardInfo.data.items.length
      };
    case actionTypes.CHANGE_CHART_TITLE:
      return {
        ...state,
        dashboardInfo: {
          ...dashboardInfo,
          data: {
            ...dashboardInfo.data,
            items: [
              ...dashboardInfo.data.items.map((el, i) =>
                action.index === i
                  ? {
                      ...el,
                      chartTitle: action.title
                    }
                  : el
              )
            ]
          }
        }
      };
    case actionTypes.RESIZE_CHART:
      return {
        ...state,
        isResizing: action.index,
        settingsVisible: action.index,
        dashboardInfo: {
          ...dashboardInfo,
          data: {
            ...dashboardInfo.data,
            items: dashboardInfo.data.items.map((el, i) =>
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
          data: {
            ...dashboardInfo.data,
            items: dashboardInfo.data.items.map((el, i) =>
              action.index === i
                ? {
                    ...el,
                    ...checkBoundaries(
                      Math.round((action.ePageY - el.height / 2) / grid) * grid,
                      Math.round(
                        (action.ePageX -
                          action.clientRect.left -
                          el.width / 2) /
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
          }
        },
        isMoving: action.index
      };
    case actionTypes.STOP_MOVE_CHART:
      return {
        ...state,
        isMoving: false
      };
    case actionTypes.DELETE_CHART:
      const approvalDelChart = confirm("Do You want to delete this chart?");
      if (approvalDelChart) {
        ReactTooltip.hide();
        return {
          ...state,
          settingsVisible: false,
          dashboardInfo: {
            ...dashboardInfo,
            data: {
              ...dashboardInfo.data,
              items: dashboardInfo.data.items.filter(
                (el, i) => i !== action.index
              )
            }
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
          data: {
            ...dashboardInfo.data,
            items: [
              ...dashboardInfo.data.items.map((el, i) =>
                action.index === i
                  ? {
                      ...el,
                      legend: action.value
                    }
                  : el
              )
            ]
          }
        }
      };
    case actionTypes.SELECT_SPARKLINE_OPTION:
      return {
        ...state,
        dashboardInfo: {
          ...dashboardInfo,
          data: {
            ...dashboardInfo.data,
            items: [
              ...dashboardInfo.data.items.map((el, i) =>
                action.index === i
                  ? {
                      ...el,
                      sparkline: action.value
                    }
                  : el
              )
            ]
          }
        }
      };
    case actionTypes.SELECT_STACKING_OPTION:
      return {
        ...state,
        dashboardInfo: {
          ...dashboardInfo,
          data: {
            ...dashboardInfo.data,
            items: [
              ...dashboardInfo.data.items.map((el, i) =>
                action.index === i
                  ? {
                      ...el,
                      stacking: action.value
                    }
                  : el
              )
            ]
          }
        }
      };
    case actionTypes.SET_SRC_FOR_IMG:
      return {
        ...state,
        dashboardInfo: {
          ...dashboardInfo,
          data: {
            ...dashboardInfo.data,
            items: [
              ...dashboardInfo.data.items.map((el, i) =>
                action.index === i
                  ? {
                      ...el,
                      src: action.value
                    }
                  : el
              )
            ]
          }
        }
      };
    case actionTypes.SET_TEXT_FOR_PARAGRAPH:
      if (action.source === "user") {
        return {
          ...state,
          dashboardInfo: {
            ...dashboardInfo,
            data: {
              ...dashboardInfo.data,
              items: [
                ...dashboardInfo.data.items.map((el, i) =>
                  action.index === i
                    ? {
                        ...el,
                        text: action.newValue
                      }
                    : el
                )
              ]
            }
          }
        };
      }
    case actionTypes.CLONE_CHART:
      const clonedElement = {
        ...dashboardInfo.data.items[action.index],
        top:
          dashboardInfo.data.items[action.index].top +
          dashboardInfo.data.items[action.index].height
      };
      return {
        ...state,
        dashboardInfo: {
          ...dashboardInfo,
          data: {
            ...dashboardInfo.data,
            items: [...dashboardInfo.data.items, clonedElement]
          }
        }
      };
    case actionTypes.TOOGLE_DASHBOARDS_MENU:
      return {
        ...state,
        dashboardsMenu: action.value || '',
      };
    case actionTypes.SET_NEW_DASHBOARD_FOR_FOCUS:
      return {
        ...state,
        newDashboardId: action.value
      };
    case actionTypes.SET_ACCESS_KEY:
      return {
        ...state,
        accessKey: action.value,
      };
    case actionTypes.CLEAR_ACCESS_KEY:
      return {
        ...state,
        accessKey: '',
      };
    case actionTypes.CHANGE_SCREEN_SIZE:
      return {
        ...state,
        screenSize: action.value
      };
    default:
      return state;
  }
};

export default editorReducer;
