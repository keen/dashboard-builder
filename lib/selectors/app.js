import { get } from 'lodash';

import { APP_REDUCER } from '../constants';

export const getSavedQueriesList = state =>
  get(
    state,
    [APP_REDUCER, 'dashboardInfo', 'settings', 'savedQueriesList'],
    []
  );

export const getDashboardInfo = state =>
  get(state, [APP_REDUCER, 'dashboardInfo']);

export const getMovingState = state => get(state, [APP_REDUCER, 'isMoving']);

export const getResizingState = state =>
  get(state, [APP_REDUCER, 'isResizing']);
