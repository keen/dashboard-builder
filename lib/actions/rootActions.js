import * as actions from "./actionTypes";
import { client, keenWebHost } from "Client/index";

export const addDashboardItem = () => dispatch => {
  fetch(`https://${keenWebHost}/projects/${client.projectId()}/dashboards/`, {
    method: "post",
    body: JSON.stringify({ title: "Untitled" })
  })
    .then(res =>
      res.json().then(data => {
        dispatch({
          type: actions.ADD_DASHBOARD_ITEM,
          dashboardInfo: data
        });
      })
    )
    .catch(err => console.log(JSON.parse(err)));
};

export const handleSearch = value => ({
  type: actions.HANDLE_SEARCH,
  value
});

export const deleteDashboardItem = id => dispatch => {
  fetch(
    `https://${keenWebHost}/projects/${client.projectId()}/dashboards/${id}`,
    {
      method: "delete"
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
    .catch(err => console.log(JSON.parse(err)));
};

export const getSavedQueries = () => dispatch => {
  client
    .get({
      url: client.url("queries", "saved"),
      api_key: client.masterKey()
    })
    .then(res =>
      dispatch({
        type: actions.GET_SAVED_QUERIES,
        savedQueries: res
      })
    )
    .catch(err => {
      console.log(err);
    });
};

export const savedQueryError = (error, index) => ({
  type: actions.SAVED_QUERY_ERROR,
  error,
  index
});

export const loadDashboards = () => dispatch => {
  fetch(`https://${keenWebHost}/projects/${client.projectId()}/dashboards`)
    .then(res =>
      res.json().then(data =>
        dispatch({
          type: actions.LOAD_DASHBOARDS,
          dashboardList: data
        })
      )
    )
    .catch(err => console.log(JSON.parse(err)));
};

export const loadDashboardInfo = id => dispatch => {
  fetch(
    `https://${keenWebHost}/projects/${client.projectId()}/dashboards/${id}`
  )
    .then(res =>
      res.json().then(data =>
        dispatch({
          type: actions.LOAD_DASHBOARD_INFO,
          dashboardInfo: data,
          id
        })
      )
    )
    .catch(err => console.log(JSON.parse(err)));
};

export const clearDashboardInfo = () => ({
  type: actions.CLEAR_DASHBOARD_INFO
});

export const saveDashboard = dashboard => dispatch => {
  fetch(`https://${keenWebHost}/projects/${client.projectId()}/dashboards/${dashboard.id}`, {
    method: "put",
    body: JSON.stringify(dashboard)
  })
    .then(res => {
      if (res.status === 200) {
        dispatch({
          type: actions.SAVE_DASHBOARD
        });
      }
    })
    .catch(err => console.log(JSON.parse(err)));
};

export const hideSavedDashboardMessage = () => ({
  type: actions.HIDE_SAVED_DASHBOARD_MESSAGE
});

export const toogleDryRun = () => ({
  type: actions.TOOGLE_DRY_RUN
});

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

export const toogleDashboardsMenu = value => ({
  type: actions.TOOGLE_DASHBOARDS_MENU,
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
