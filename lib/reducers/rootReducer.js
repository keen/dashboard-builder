import * as actionTypes from '../actions/actionTypes';
import resizingCount from '../func/resizingCount';
import checkBoundaries from '../func/checkBoundaries';
import sortDashboardList from '../func/sortDashboardList';
import ReactTooltip from 'react-tooltip';

const defaultPalette = { value: '', label: 'Default' };
const defaultData = {
  dashboardInfo: {
    id: '',
    title: '',
    data: {
      version: 2,
      items: []
    },
    settings: {
      palette: defaultPalette,
      colors: [],
      picker: {},
      dryRun: false,
      theme: {},
      layout: [],
      items: [],
      charts_theme: []
    },
  },
  isResizing: undefined,
  isMoving: undefined,
  isLoading: false,
  loadingSettings: false,
  draggedType: '',
  toolbarVisible: false,
  grid: 20,
  dashboardSaved: false,
  settingsVisible: false,
  savedQueries: '',
  isDashboardListLoaded: false,
  dashboardList: [],
  dashboardsMenu: '',
  searchInput: '',
  accessKey: '',
  newDashboardId: '',
  screenSize: 'desktop',
  isDashboardLoading: false,
  dashboardMenuFilter: '',
  sortingValue: { value: 'az', label: 'A - Z' }
};

const editorReducer = (state = defaultData, action) => {
  const { dashboardInfo, grid } = state;
  switch (action.type) {
    case actionTypes.LOAD_DASHBOARDS:
      return {
        ...state,
        isDashboardListLoaded: true,
        dashboardList: action.dashboardList.sort((a, b) => {
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
      return {
        ...state,
        dashboardInfo: action.dashboardInfo,
        newDashboardId: action.dashboardInfo.id
      };
    case actionTypes.HANDLE_SEARCH:
      return {
        ...state,
        searchInput: action.value
      };
    case actionTypes.DELETE_DASHBOARD_ITEM:
      const dashboardList = state.dashboardList.filter(
        el => el.id !== action.id
      );
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
    case actionTypes.LOAD_DASHBOARD_INFO:
      return {
        ...state,
        isDashboardLoading: action.isDashboardLoading,
        dashboardInfo: action.dashboardInfo
      };
    case actionTypes.UPDATE_DASHBOARD_INFO:
      return {
        ...state,
        dashboardInfo: action.dashboardInfo
      };
    case actionTypes.CLEAR_DASHBOARD_INFO:
      return {
        ...state,
        dashboardInfo: {
          id: '',
          title: '',
          data: { version: 2, items: [] },
          settings: {
            palette: defaultPalette,
            colors: [],
            picker: {},
            dryRun: false,
            theme: {},
            layout: [],
            items: [],
          },
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
                      sparkline: false,
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
                      : false
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
          title: action.title
        }
      };
    case actionTypes.TOGGLE_DRY_RUN:
      return {
        ...state,
        dashboardInfo: {
          ...dashboardInfo,
          settings: {
            ...dashboardInfo.settings,
            dryRun: !dashboardInfo.settings.dryRun
          },
          theme: {
            ...dashboardInfo.theme,
          }
        }
      };
    case actionTypes.TOGGLE_IS_PUBLIC:
      return {
        ...state,
        dashboardInfo: {
          ...dashboardInfo,
          is_public: !dashboardInfo.is_public
        }
      };
    case actionTypes.SET_THEME:
      return {
        ...state,
        dashboardInfo: {
          ...dashboardInfo,
          settings: {
            ...dashboardInfo.settings,
            theme: action.value,
          },
        }
      }
      case actionTypes.SET_CHART_THEME:
        const charts_theme = 
          dashboardInfo.settings.charts_theme ? [...dashboardInfo.settings.charts_theme] : []
        ;
        charts_theme[action.index] = action.value;
      return {
        ...state,
        dashboardInfo: {
          ...dashboardInfo,
          settings: {
            ...dashboardInfo.settings,
            charts_theme
          },
        }
      }
    case actionTypes.SET_LAYOUT:
      return {
        ...state,
        dashboardInfo: {
          ...dashboardInfo,
          settings: {
            ...dashboardInfo.settings,
            layout: action.layout,
            items: action.items,
          },
        },
      }
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
            items:
              dashboardInfo.data.items &&
              dashboardInfo.data.items.map(el => ({
                ...el,
                palette: action.value
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
      case actionTypes.CHANGE_CHART_SUBTITLE:
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
                          chartSubtitle: action.subtitle
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
        isResizing: undefined
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
    case actionTypes.COL_MOVE_CHART:
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
                    top: action.ePageY,
                    left: action.ePageX
                  }
                : el
            )
          }
        }
      };
    case actionTypes.STOP_MOVE_CHART:
      return {
        ...state,
        isMoving: undefined
      };
    case actionTypes.DELETE_CHART:
      const approvalDelChart = confirm('Do You want to delete this chart?');
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
      if (action.source === 'user') {
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
    case actionTypes.TOGGLE_DASHBOARDS_MENU:
      return {
        ...state,
        dashboardsMenu: action.value || ''
      };
    case actionTypes.SET_NEW_DASHBOARD_FOR_FOCUS:
      return {
        ...state,
        newDashboardId: action.value
      };
    case actionTypes.SET_ACCESS_KEY:
      return {
        ...state,
        accessKey: action.value
      };
    case actionTypes.CLEAR_ACCESS_KEY:
      return {
        ...state,
        accessKey: ''
      };
    case actionTypes.CHANGE_SCREEN_SIZE:
      return {
        ...state,
        screenSize: action.value,
        dashboardInfo: {
          ...dashboardInfo,
          data: {
            ...dashboardInfo.data,
            items: dashboardInfo.data.items.sort((a, b) => {
              if (a.top < b.top) {
                return -1;
              }
              if (a.top > b.top) {
                return 1;
              }
              return 0;
            })
          }
        }
      };
    case actionTypes.MAP_OLD_ITEMS:
      return {
        ...state,
        dashboardInfo: action.newDashboard
      };
    case actionTypes.LOADING_SINGLE_DASHBOARD:
      return {
        ...state,
        isDashboardLoading: true
      };

    case actionTypes.FILTER_DASHBOARDS_MENU:
      return {
        ...state,
        dashboardMenuFilter: action.value
      };

    case actionTypes.CHANGE_SORTING:
      return {
        ...state,
        sortingValue: action.sorting,
        dashboardList: sortDashboardList(
          action.sorting.value,
          state.dashboardList
        )
      };

    case actionTypes.SET_PREFIX:
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
                      prefix: action.value
                    }
                  : el
              )
            ]
          }
        }
      };

    case actionTypes.SET_SUFFIX:
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
                      suffix: action.value
                    }
                  : el
              )
            ]
          }
        }
      };

    case actionTypes.SELECT_SHOW_POINTS:
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
                      showPoints: action.value
                    }
                  : el
              )
            ]
          }
        }
      };

    case actionTypes.SELECT_POINTS_SIZE:
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
                      pointsSize: action.value
                    }
                  : el
              )
            ]
          }
        }
      };

    case actionTypes.SELECT_CHOROPLETH_MAP:
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
                      mapChoropleth: action.value
                    }
                  : el
              )
            ]
          }
        }
      };

    case actionTypes.SHOW_CHOROPLETH_BORDER:
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
                      borderChoropleth: action.value
                    }
                  : el
              )
            ]
          }
        }
      };

    case actionTypes.SELECT_CHOROPLETH_BORDER_SIZE:
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
                      borderSizeChoropleth: action.value
                    }
                  : el
              )
            ]
          }
        }
      };

    case actionTypes.SHOW_CHOROPLETH_SLIDERS:
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
                      slidersChoropleth: action.value
                    }
                  : el
              )
            ]
          }
        }
      };

    case actionTypes.SHOW_HEATMAP_SLIDERS:
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
                      slidersHeatmap: action.value
                    }
                  : el
              )
            ]
          }
        }
      };

    case actionTypes.SHOW_HEATMAP_TOOLTIP_VALUE:
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
                      heatmapTooltipValue: action.value
                    }
                  : el
              )
            ]
          }
        }
      };

    default:
      return state;
  }
};

export default editorReducer;
