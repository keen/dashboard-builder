import * as actions from './actionTypes';
import { client, keenWebHost, keenWebFetchOptions } from 'Client/index';

export const addDashboardItem = (title = 'Untitled') => dispatch => {
    fetch(`https://${keenWebHost}/projects/${client.projectId()}/dashboards/`, {
      method: 'post',
      body: JSON.stringify({ title }),
      ...keenWebFetchOptions
    })
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

export const deleteDashboardItem = id => dispatch => {
    fetch(
      `https://${keenWebHost}/projects/${client.projectId()}/dashboards/${id}`,
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

export const getSavedQueries = () => dispatch => {
  client
    .get({
      url: client.url('queries', 'saved'),
      api_key: client.masterKey()
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

export const loadDashboards = () => dispatch => {
    fetch(`https://${keenWebHost}/projects/${client.projectId()}/dashboards`, {
      ...keenWebFetchOptions
    })
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

export const loadDashboardInfo = id => dispatch => {
    fetch(
      `https://${keenWebHost}/projects/${client.projectId()}/dashboards/${id}`,
      {
        ...keenWebFetchOptions
      }
    )
      .then(res =>
        res.json().then(data =>
          dispatch({
            type: actions.LOAD_DASHBOARD_INFO,
            dashboardInfo: data,
            id,
            isDashboardLoading: false
          })
        )
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

export const saveDashboard = dashboard => dispatch => {
    dispatch({
      type: actions.SAVE_DASHBOARD
    });
  fetch(
    `https://${keenWebHost}/projects/${client.projectId()}/dashboards/${
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

export const setLayout = (layout, items) => {
  return {
    type: actions.SET_LAYOUT,
    layout,
    items
  };
};

export const selectPalette = value => ({
  type: actions.SELECT_PALETTE,
  value
});

export const changeColors = value => ({
  type: actions.CHANGE_COLORS,
  value
});

export const changePickerColors = value => ({
  type: actions.CHANGE_PICKER_COLORS,
  value
});

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

export const dropHandler = newElement => ({
  type: actions.DROP_HANDLER,
  newElement
});

export const changeChartTitle = (title, index) => ({
  type: actions.CHANGE_CHART_TITLE,
  title,
  index
});

export const changeChartSubitle = (subtitle, index) => ({
  type: actions.CHANGE_CHART_SUBTITLE,
  subtitle,
  index
});

export const setLoading = index => ({
  type: actions.SET_LOADING,
  index
});

export const selectSavedQuery = (value, index) => ({
  type: actions.SELECT_SAVED_QUERY,
  value,
  index
});

export const loadSavedQuery = index => ({
  type: actions.LOAD_SAVED_QUERIES,
  index
});

export const changeChartType = (value, index) => ({
  type: actions.CHANGE_CHART_TYPE,
  index,
  value
});

export const resizeChart = (index, ePageX, ePageY, clientRect, element) => ({
  type: actions.RESIZE_CHART,
  index,
  ePageX,
  ePageY,
  clientRect,
  element
});

export const stopResizeChart = () => ({
  type: actions.STOP_RESIZE_CHART
});

export const moveChart = (index, ePageX, ePageY, clientRect) => ({
  type: actions.MOVE_CHART,
  index,
  ePageX,
  ePageY,
  clientRect
});

export const stopMoveChart = () => ({
  type: actions.STOP_MOVE_CHART
});

export const deleteChart = index => ({
  type: actions.DELETE_CHART,
  index
});

export const closeSettings = () => ({
  type: actions.CLOSE_SETTINGS
});

export const showSettings = index => ({
  type: actions.SHOW_SETTINGS,
  index
});

export const selectLegendPosition = (value, index) => ({
  type: actions.SELECT_LEGEND_POSITION,
  value,
  index
});

export const selectSparklineOption = (value, index) => ({
  type: actions.SELECT_SPARKLINE_OPTION,
  value,
  index
});

export const selectStackingOption = (value, index) => ({
  type: actions.SELECT_STACKING_OPTION,
  value,
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

export const changeScreenSize = value => ({
  type: actions.CHANGE_SCREEN_SIZE,
  value
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

export const colMoveChart = (index, ePageX, ePageY) => ({
  type: actions.COL_MOVE_CHART,
  index,
  ePageX,
  ePageY
});

export const setPrefix = (e, index) => ({
  type: actions.SET_PREFIX,
  value: e.target.value,
  index
});

export const setSuffix = (e, index) => ({
  type: actions.SET_SUFFIX,
  value: e.target.value,
  index
});

export const selectShowPoints = (e, index) => ({
  type: actions.SELECT_SHOW_POINTS,
  value: e,
  index
});

export const selectPointsSize = (e, index) => ({
  type: actions.SELECT_POINTS_SIZE,
  value: e,
  index
});

export const selectChoroplethMap = (e, index) => ({
  type: actions.SELECT_CHOROPLETH_MAP,
  value: e,
  index
});

export const showChoroplethBorder = (e, index) => ({
  type: actions.SHOW_CHOROPLETH_BORDER,
  value: e,
  index
});

export const selectChoroplethBorderSize = (e, index) => ({
  type: actions.SELECT_CHOROPLETH_BORDER_SIZE,
  value: e,
  index
});

export const showChoroplethSliders = (e, index) => ({
  type: actions.SHOW_CHOROPLETH_SLIDERS,
  value: e,
  index
});

export const showHeatmapSliders = (e, index) => ({
  type: actions.SHOW_HEATMAP_SLIDERS,
  value: e,
  index
});

export const showHeatmapTooltipValue = (e, index) => ({
  type: actions.SHOW_HEATMAP_TOOLTIP_VALUE,
  value: e,
  index
});


export const changeSavedQueryList = (delValue, addValue) => ({
  type: actions.CHANGE_SAVED_QUERY_LIST,
  delValue,
  addValue

export const loadDummyDashboards = () => ({
  type: actions.LOAD_DUMMY_DASHBOARDS
});
