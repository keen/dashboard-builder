/* eslint-disable */

import * as actions from './actionTypes';
import { getDashboardInfo, getSavedQueriesList } from '../selectors/app';
import updateAPIKey from '../func/updateApiKey';
import loadFontsFromDashboard from '../utils/loadFontsFromDashboard';
import ReactTooltip from 'react-tooltip';

export const addDashboardItem = (title = 'Untitled') => (
  dispatch,
  getState,
  { keenClient, keenWebHost, keenWebFetchOptions }
) => {
  fetch(
    `https://${keenWebHost}/projects/${keenClient.projectId()}/dashboards/`,
    {
      method: 'post',
      body: JSON.stringify({
        title,
        data: { version: 2, items: [] },
        settings: { dryRun: false }
      }),
      ...keenWebFetchOptions
    }
  )
    .then(res =>
      res.json().then(data => {
        dispatch({
          type: actions.ADD_DASHBOARD_ITEM,
          dashboardInfo: data
        });
      })
    )
    .catch(err => console.error(err));
};

export const handleSearch = value => ({
  type: actions.HANDLE_SEARCH,
  value
});

export const deleteDashboardItem = id => (
  dispatch,
  getState,
  { keenClient, keenWebHost, keenWebFetchOptions }
) => {
  fetch(
    `https://${keenWebHost}/projects/${keenClient.projectId()}/dashboards/${id}`,
    {
      method: 'delete',
      ...keenWebFetchOptions
    }
  )
    .then(res => {
      if (res.status === 204) {
        dispatch({
          type: actions.DELETE_DASHBOARD_ITEM,
          id
        });
      }
    })
    .catch(err => console.error(err));
};

export const getSavedQueries = () => (
  dispatch,
  getState,
  { keenClient, keenWebHost, keenWebFetchOptions }
) => {
  keenClient
    .get({
      url: keenClient.url('queries', 'saved'),
      api_key: keenClient.masterKey()
    })
    .then(res =>
      dispatch({
        type: actions.GET_SAVED_QUERIES,
        savedQueries: res
      })
    )
    .catch(err => {
      console.error(err);
    });
};

export const savedQueryError = (error, index) => ({
  type: actions.SAVED_QUERY_ERROR,
  error,
  index
});

export const loadDashboards = () => (
  dispatch,
  getState,
  { keenClient, keenWebHost, keenWebFetchOptions }
) => {
  fetch(
    `https://${keenWebHost}/projects/${keenClient.projectId()}/dashboards`,
    {
      ...keenWebFetchOptions
    }
  )
    .then(res =>
      res.json().then(data =>
        dispatch({
          type: actions.LOAD_DASHBOARDS,
          dashboardList: data
        })
      )
    )
    .catch(err => console.error(err));
};

export const loadDashboardInfo = id => (
  dispatch,
  getState,
  { keenClient, keenWebHost, keenWebFetchOptions }
) => {
  fetch(
    `https://${keenWebHost}/projects/${keenClient.projectId()}/dashboards/${id}`,
    {
      ...keenWebFetchOptions
    }
  )
    .then(res =>
      res.json().then(data => {
        loadFontsFromDashboard(data);
        dispatch({
          type: actions.LOAD_DASHBOARD_INFO,
          dashboardInfo: data,
          id,
          isDashboardLoading: false
        });
      })
    )
    .catch(err => console.error(err));
};

export const updateDashboardInfo = data => ({
  type: actions.UPDATE_DASHBOARD_INFO,
  dashboardInfo: data
});

export const clearDashboardInfo = () => ({
  type: actions.CLEAR_DASHBOARD_INFO
});

export const saveDashboard = dashboard => (
  dispatch,
  getState,
  { keenClient, keenWebHost, keenWebFetchOptions }
) => {
  dispatch({
    type: actions.SAVE_DASHBOARD
  });
  fetch(
    `https://${keenWebHost}/projects/${keenClient.projectId()}/dashboards/${
      dashboard.id
    }`,
    {
      method: 'put',
      body: JSON.stringify(dashboard),
      ...keenWebFetchOptions
    }
  )
    .then(res => {
      if (res.status === 200) {
        dispatch({
          type: actions.HIDE_SAVED_DASHBOARD_MESSAGE
        });
      }
    })
    .catch(err => console.error(err));
};

export const makeDashboardPublicAndSave = dashboard => (dispatch, getState) => {
  let newDashboard = dashboard;
  if (!dashboard.is_public) {
    dispatch(toggleIsPublic());
    newDashboard = getState().dashboardInfo;
  }
  dispatch(saveDashboard(newDashboard));
};

export const hideSavedDashboardMessage = () => ({
  type: actions.HIDE_SAVED_DASHBOARD_MESSAGE
});

export const toggleDryRun = () => ({
  type: actions.TOGGLE_DRY_RUN
});

export const toggleIsPublic = () => ({
  type: actions.TOGGLE_IS_PUBLIC
});

export const setTheme = value => {
  return {
    type: actions.SET_THEME,
    value
  };
};

export const setChartTheme = (index, value) => {
  return {
    type: actions.SET_CHART_THEME,
    index,
    value
  };
};

export const setLayout = layout => {
  return {
    type: actions.SET_LAYOUT,
    layout
  };
};

export const changeDashboardTitle = title => ({
  type: actions.CHANGE_DASHBOARD_TITLE,
  title
});

export const showToolbar = () => ({
  type: actions.SHOW_TOOLBAR
});

export const closeToolbar = () => ({
  type: actions.CLOSE_TOOLBAR
});

export const dragStartHandler = draggedType => ({
  type: actions.DRAG_START_HANDLER,
  draggedType
});

export const dropHandler = (element, id) => ({
  type: actions.DROP_HANDLER,
  element,
  id
});

export const setLoading = index => ({
  type: actions.SET_LOADING,
  index
});

export const selectSavedQuery = (queryNames, index) => (
  dispatch,
  getState,
  { keenClient }
) => {
  const store = getState();

  const dashboardInfo = getDashboardInfo(store);
  const item = dashboardInfo.settings.items.find(el => el.i === index);
  const delValue = item.savedQuery;
  const savedQueriesList = getSavedQueriesList(store);
  const savedQueries = Array.isArray(queryNames) ? queryNames : [queryNames];
  dispatch(changeSavedQueryList(delValue, savedQueries));
  const newStore = getState();
  const newSavedQueriesList = getSavedQueriesList(newStore);
  const isPublic = dashboardInfo.is_public;
  if (isPublic && savedQueries.length) {
    const isNewQueryAdded = savedQueries.some(
      query => !savedQueriesList.includes(query.value)
    );

    if (isNewQueryAdded) {
      updateAPIKey(newSavedQueriesList, dashboardInfo.title, keenClient);
    }
  }
  dispatch({
    type: actions.SELECT_SAVED_QUERY,
    savedQueries,
    index
  });
};

export const loadSavedQuery = index => ({
  type: actions.LOAD_SAVED_QUERIES,
  index
});

export const changeChartType = (value, index) => ({
  type: actions.CHANGE_CHART_TYPE,
  index,
  value
});

export const deleteChart = index => (dispatch, getState, { keenClient }) => {
  const approvalDelChart = confirm('Do You want to delete this chart?');
  if (approvalDelChart) {
    ReactTooltip.hide();
    const store = getState();
    const dashboardInfo = getDashboardInfo(store);
    const item = dashboardInfo.settings.items.find(el => el.i === index);
    const delValue = item.savedQuery;
    dispatch(changeSavedQueryList(delValue, []));
    const newStore = getState();
    const savedQueriesList = getSavedQueriesList(newStore);
    const isPublic = dashboardInfo.is_public;
    if (isPublic && delValue.length) {
      const isNewQueryAdded = delValue.some(
        query => !savedQueriesList.includes(query.value)
      );
      if (isNewQueryAdded) {
        updateAPIKey(savedQueriesList, dashboardInfo.title, keenClient);
      }
    }
    dispatch({
      type: actions.DELETE_CHART,
      index
    });
  }
};

export const closeSettings = () => ({
  type: actions.CLOSE_SETTINGS
});

export const showSettings = index => ({
  type: actions.SHOW_SETTINGS,
  index
});

export const setSrcForImg = (value, index) => ({
  type: actions.SET_SRC_FOR_IMG,
  value,
  index
});

export const setTextForParagraph = (newValue, source, index) => ({
  type: actions.SET_TEXT_FOR_PARAGRAPH,
  newValue,
  source,
  index
});

export const cloneChart = index => ({
  type: actions.CLONE_CHART,
  index
});

export const toggleDashboardsMenu = value => ({
  type: actions.TOGGLE_DASHBOARDS_MENU,
  value
});

export const setNewDashboardForFocus = value => ({
  type: actions.SET_NEW_DASHBOARD_FOR_FOCUS,
  value
});

export const setAccessKey = value => ({
  type: actions.SET_ACCESS_KEY,
  value
});

export const clearAccessKey = () => ({
  type: actions.CLEAR_ACCESS_KEY
});

export const mapOldItems = newDashboard => ({
  type: actions.MAP_OLD_ITEMS,
  newDashboard
});

export const loadingSingleDashboard = () => ({
  type: actions.LOADING_SINGLE_DASHBOARD
});

export const filterDashboardsMenu = value => ({
  type: actions.FILTER_DASHBOARDS_MENU,
  value
});

export const changeSorting = sorting => ({
  type: actions.CHANGE_SORTING,
  sorting
});

export const changeSavedQueryList = (delValue, addValue) => (
  dispatch,
  getState
) => {
  const store = getState();
  const dashboardInfo = getDashboardInfo(store);
  const savedQueriesList = dashboardInfo.settings.savedQueriesList
    ? [...dashboardInfo.settings.savedQueriesList]
    : [];
  savedQueriesList.length &&
    delValue &&
    delValue.forEach(el => {
      let delIndex = savedQueriesList.indexOf(el.value);
      delIndex >= 0 && savedQueriesList.splice(delIndex, 1);
    });
  addValue.length &&
    addValue.forEach(el => {
      savedQueriesList.push(el.value);
    });

  dispatch({
    type: actions.CHANGE_SAVED_QUERY_LIST,
    savedQueriesList
  });
};

export const loadDummyDashboards = () => ({
  type: actions.LOAD_DUMMY_DASHBOARDS
});
