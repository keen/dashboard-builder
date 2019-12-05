import { get } from 'lodash';

export const getDashboardInfo = state =>
  get(state, ['dashboardInfo']);

export const getSavedQueriesList = state =>
  get(state, 'dashboardInfo.settings.savedQueriesList', ['savedQueriesList']);