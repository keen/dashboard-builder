/* eslint-disable no-unused-expressions */

const createOnlyUIMiddleware = keenWebHost => () => next => action => {
  const actionList = [
    'ADD_DASHBOARD_ITEM',
    'DELETE_DASHBOARD_ITEM',
    'LOAD_DASHBOARDS',
    'LOAD_DASHBOARD_INFO',
    'SAVE_DASHBOARD',
    'HIDE_SAVED_DASHBOARD_MESSAGE'
  ];
  keenWebHost === 'none'
    ? !actionList.includes(action.type) && next(action)
    : next(action);
};

export default createOnlyUIMiddleware;
