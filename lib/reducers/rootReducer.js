import * as actionTypes from '../actions/actionTypes';
import sortDashboardList from '../func/sortDashboardList';
import defaultDashboardInfo from './defaultDashboardInfo.js';
import getFontsList from '../func/getFontsList';
import ReactTooltip from 'react-tooltip';
import merge from 'lodash/merge';

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
      dryRun: false,
      theme: {},
      layout: [],
      items: [],
      charts_theme: {},
      counter: 0,
      fonts: [],
      savedQueriesList: []
    },
  },
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
      const addedDashboard = merge({}, defaultData.dashboardInfo, action.dashboardInfo);
      return {
        ...state,
        dashboardInfo: addedDashboard,
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
      const loadedDashboard = merge({}, defaultData.dashboardInfo, action.dashboardInfo);
      return {
        ...state,
        isDashboardLoading: action.isDashboardLoading,
        dashboardInfo: loadedDashboard,
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
            savedQueriesList: []
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
          settings: {
            ...dashboardInfo.settings,
            items: [
              ...dashboardInfo.settings.items.map((el) =>
              el.i === action.index
                ? {
                    ...el,
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
          settings: {
            ...dashboardInfo.settings,
            items: [
              ...dashboardInfo.settings.items.map((el, i) =>
                action.index === el.i
                  ? {
                      ...el,
                      type: action.value
                    }
                  : el
              )
            ]
          }
          // data: {
          //   ...dashboardInfo.data,
          //   items: [
          //     ...dashboardInfo.data.items.map((el, i) =>
          //       action.index === i
          //         ? {
          //             ...el,
          //             type: action.value
          //           }
          //         : el
          //     )
          //   ]
          // }
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
            items: dashboardInfo.data.items.map((el) =>
              action.index === el.i
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
            items: dashboardInfo.data.items.map((el) =>
              action.index === el.i
                ? {
                    ...el,
                    sparkline: el.sparkline ? el.sparkline : false
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
            items: dashboardInfo.data.items.map((el) =>
              action.index === el.i
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
            ...dashboardInfo.theme
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
      const fonts = getFontsList(dashboardInfo.settings.fonts, action.value.style);
      return {
        ...state,
        dashboardInfo: {
          ...dashboardInfo,
          settings: {
            ...dashboardInfo.settings,
            theme: action.value,
            fonts,
          },
        }
      }
      case actionTypes.SET_CHART_THEME:
        const charts_theme = 
          dashboardInfo.settings.charts_theme ? {...dashboardInfo.settings.charts_theme} : {};
        charts_theme[action.index] = action.value;
        const themeFonts = action.value.style ? getFontsList(dashboardInfo.settings.fonts, action.value.style) : dashboardInfo.settings.fonts;
      return {
        ...state,
        dashboardInfo: {
          ...dashboardInfo,
          settings: {
            ...dashboardInfo.settings,
            charts_theme,
            fonts: themeFonts
          },
        }
      }
    case actionTypes.SET_LAYOUT:
      return {
        ...state,
        dashboardInfo: {
          ...state.dashboardInfo,
          settings: {
            ...state.dashboardInfo.settings,
            layout: action.layout,
          }
        }
      }
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
          ...state.dashboardInfo,
          settings: {
            ...state.dashboardInfo.settings,
            items: [
              ...state.dashboardInfo.settings.items, action.element
            ],
            counter: state.dashboardInfo.settings.counter + 1
          },
        },
        draggedType: {},
        settingsVisible: action.id
      }
    case actionTypes.DELETE_CHART:
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
    case actionTypes.SET_SRC_FOR_IMG:
      return {
        ...state,
        dashboardInfo: {
          ...dashboardInfo,
          settings: {
            ...dashboardInfo.settings,
            items: [
              ...dashboardInfo.settings.items.map((el) =>
                action.index === el.i
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
      return action.source === 'user' ?
      {
        ...state,
        dashboardInfo: {
          ...dashboardInfo,
          settings: {
            ...dashboardInfo.settings,
            items: dashboardInfo.settings.items.map((el) => 
              action.index === el.i
              ? {
                  ...el,
                  text: action.newValue
                }
              : el
            )
          }
        }
      } : { ...state }
    case actionTypes.CLEAR_ITEMS: // can be removed - for development only
      return {
        ...state,
        dashboardInfo: {
          ...dashboardInfo,
          settings: {
            ...dashboardInfo.settings,
            items: [],
          }
        }
      }
    
      case actionTypes.CLEAR_DASHBOARD:
        const newDashboardList = state.dashboardList.map(dashboard => {
          if (dashboard.id === '578d21c8ae574d42cf3b6166') {
            dashboard.settings.items = dashboard.settings.items.filter(item => item.i !== undefined);
          }
          return dashboard
        });
        return {
          ...state,
          dashboardList: newDashboardList,
        }
    case actionTypes.CLONE_CHART:
      const { counter } = dashboardInfo.settings;
      const { id:dashboardId } = dashboardInfo;
      const id = `chart-${dashboardId}-n${counter}`;
      const clonedElement = dashboardInfo.settings.items.find(item => item.i === action.index);
      const clonedElementLayout = dashboardInfo.settings.layout.find(item => item.i === action.index);
      const theme = (dashboardInfo.settings.charts_theme && dashboardInfo.settings.charts_theme[action.index]) || {};
      let newTheme = {};
      if (theme && theme.style) {
        const regex = new RegExp(`${action.index}`, 'g');
        newTheme = {
          ...theme,
          style: theme.style.replace(regex, id),
        }
      }
      const { x, y, w, h } = clonedElementLayout;
      const { type, savedQuery, options, error, text, src } = clonedElement;
      const newElement = {
        i: id,
        x,
        y: h + y,
        w,
        h,
        type,
        savedQuery,
        options,
        error,
        text,
        src,
      };
      return {
        ...state,
        dashboardInfo: {
          ...dashboardInfo,
          settings: {
            ...dashboardInfo.settings,
            items: [
              ...dashboardInfo.settings.items,
              newElement
            ],
            charts_theme: {
              ...dashboardInfo.settings.charts_theme,
              [id]: newTheme,
            },
            counter: dashboardInfo.settings.counter + 1,
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

    case actionTypes.CHANGE_SAVED_QUERY_LIST:
      const { savedQueriesList } = action;
      return {
        ...state,
        dashboardInfo: {
          ...dashboardInfo,
          settings: {
            ...dashboardInfo.settings,
            savedQueriesList
          }
        }
      };

    case actionTypes.LOAD_DUMMY_DASHBOARDS:
      return {
        ...state,
        dashboardList: [defaultDashboardInfo],
        dashboardInfo: {
          ...state.dashboardInfo,
          ...defaultDashboardInfo
        }
      };

    default:
      return state;
  }
};

export default editorReducer;
