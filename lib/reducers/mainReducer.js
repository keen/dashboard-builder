import * as actionTypes from "../actions/actionTypes";
import GetUniqueId from "../func/getUniqueId";
import editorParse from "../func/oldDashboardData";

const defaultData = {
  dashboardList: [],
  searchInput: ""
};

const mainReducer = (state = defaultData, action) => {
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
        dashboardList
      };
    case actionTypes.ADD_DASHBOARD_ITEM:
      const newDashboardList = [
        ...state.dashboardList,
        {
          id: GetUniqueId(),
          dashboardTitle: "Unnamed dashboard",
          dashboardData: [],
          dryRun: false
        }
      ];
      localStorage.setItem("dashboards", JSON.stringify(newDashboardList));
      return {
        ...state,
        dashboardList: newDashboardList
      };

    case actionTypes.HANDLE_SEARCH:
      return {
        ...state,
        searchInput: action.value
      };

    case actionTypes.DELETE_DASHBOARD_ITEM:
      const approval = confirm("Do You want to delete this dashboard?");
      if (approval) {
        const dashboardList = state.dashboardList.filter(
          (el, i) => i !== action.index
        );
        localStorage.setItem("dashboards", JSON.stringify(dashboardList));
        return {
          ...state,
          dashboardList
        };
      }

    default:
      return state;
  }
};

export default mainReducer;
