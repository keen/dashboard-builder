/* eslint-disable */

import { combineReducers } from 'redux';
import * as actionTypes from '../actions/actionTypes';
import sortDashboardList from '../func/sortDashboardList';
import defaultDashboardInfo from './defaultDashboardInfo.js';
import ReactTooltip from 'react-tooltip';
import merge from 'lodash/merge';
import transformChart from '../func/transformChart';
import { generateUniqueId } from '../utils/generateUniqueId';
import { APP_REDUCER } from '../constants';

const defaultPalette = { value: '', label: 'Default' };
export const defaultData = {
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
      fonts: [],
      savedQueriesList: []
    }
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

const appReducer = (state = defaultData, action) => {
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
      const addedDashboard = merge(
        {},
        defaultData.dashboardInfo,
        action.dashboardInfo
      );
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
      const loadedDashboard = merge(
        {},
        defaultData.dashboardInfo,
        action.dashboardInfo
      );
      const { items } = loadedDashboard.settings;
      const formattedItems =
        (items && items.map(item => transformChart(item))) || [];
      const newDashboardInfo = {
        ...loadedDashboard,
        settings: {
          ...loadedDashboard.settings,
          items: formattedItems
        }
      };
      return {
        ...state,
        isDashboardLoading: action.isDashboardLoading,
        dashboardInfo: newDashboardInfo
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
              ...dashboardInfo.settings.items.map(el =>
                el.i === action.index
                  ? {
                      ...el,
                      savedQuery: Array.isArray(action.savedQueries)
                        ? action.savedQueries
                        : [action.savedQueries],
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
              ...dashboardInfo.settings.items.map(el =>
                action.index === el.i
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
          settings: {
            ...dashboardInfo.settings,
            items: dashboardInfo.settings.items.map(el =>
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
          settings: {
            ...dashboardInfo.settings,
            items: dashboardInfo.settings.items.map(el =>
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
          settings: {
            ...dashboardInfo.settings,
            items: dashboardInfo.settings.items.map(el =>
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
      return {
        ...state,
        dashboardInfo: {
          ...dashboardInfo,
          settings: {
            ...dashboardInfo.settings,
            theme: action.value
          }
        }
      };
    case actionTypes.SET_CHART_THEME:
      const charts_theme = dashboardInfo.settings.charts_theme
        ? { ...dashboardInfo.settings.charts_theme }
        : {};
      charts_theme[action.index] = action.value;
      return {
        ...state,
        dashboardInfo: {
          ...dashboardInfo,
          settings: {
            ...dashboardInfo.settings,
            charts_theme
          }
        }
      };
    case actionTypes.SET_LAYOUT:
      return {
        ...state,
        dashboardInfo: {
          ...state.dashboardInfo,
          settings: {
            ...state.dashboardInfo.settings,
            layout: action.layout
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
          ...state.dashboardInfo,
          settings: {
            ...state.dashboardInfo.settings,
            items: [...state.dashboardInfo.settings.items, action.element]
          }
        },
        draggedType: '',
        settingsVisible: action.id
      };
    case actionTypes.DELETE_CHART:
      return {
        ...state,
        settingsVisible: false,
        dashboardInfo: {
          ...dashboardInfo,
          settings: {
            ...dashboardInfo.settings,
            items: dashboardInfo.settings.items.filter(
              item => item.i !== action.index
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
              ...dashboardInfo.settings.items.map(el =>
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
      return action.source === 'user'
        ? {
            ...state,
            dashboardInfo: {
              ...dashboardInfo,
              settings: {
                ...dashboardInfo.settings,
                items: dashboardInfo.settings.items.map(el =>
                  action.index === el.i
                    ? {
                        ...el,
                        text: action.newValue
                      }
                    : el
                )
              }
            }
          }
        : { ...state };
    case actionTypes.CLEAR_ITEMS: // can be removed - for development only
      return {
        ...state,
        dashboardInfo: {
          ...dashboardInfo,
          settings: {
            ...dashboardInfo.settings,
            items: []
          }
        }
      };
    case actionTypes.CLONE_CHART:
      const id = `chart-${generateUniqueId()}`;
      const clonedElement = dashboardInfo.settings.items.find(
        item => item.i === action.index
      );
      const clonedElementLayout = dashboardInfo.settings.layout.find(
        item => item.i === action.index
      );
      const theme =
        (dashboardInfo.settings.charts_theme &&
          dashboardInfo.settings.charts_theme[action.index]) ||
        {};
      let newTheme = {};
      if (theme && theme.style) {
        const regex = new RegExp(`${action.index}`, 'g');
        newTheme = {
          ...theme,
          style: theme.style.replace(regex, id)
        };
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
        src
      };
      return {
        ...state,
        dashboardInfo: {
          ...dashboardInfo,
          settings: {
            ...dashboardInfo.settings,
            items: [...dashboardInfo.settings.items, newElement],
            charts_theme: {
              ...dashboardInfo.settings.charts_theme,
              [id]: newTheme
            }
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

export default combineReducers({
  [APP_REDUCER]: appReducer
});
