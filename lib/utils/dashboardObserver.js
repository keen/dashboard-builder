import { isEqual, omit } from 'lodash';

import { saveDashboard } from '../actions/rootActions';
import {
  getDashboardInfo,
  getMovingState,
  getResizingState
} from '../selectors/app';

const LAST_MODIFIED_DATE = 'last_modified_date';

export const transformState = state => omit(state, [LAST_MODIFIED_DATE]);

export const runDashboardObserver = store => {
  let currentDashboardState = {};
  let debounceTimer = null;

  const dispose = store.subscribe(() => {
    const state = store.getState();

    const previousDashboardState = currentDashboardState;
    const nextDashboardState = getDashboardInfo(state);

    // TODO: Remove as migration to React-Grid-Layout will be done
    if (getMovingState(state) || getResizingState(state)) return;

    if (
      !isEqual(
        transformState(previousDashboardState),
        transformState(nextDashboardState)
      )
    ) {
      if (previousDashboardState.id === nextDashboardState.id) {
        if (debounceTimer) {
          clearTimeout(debounceTimer);
        }
        debounceTimer = setTimeout(() => {
          store.dispatch(saveDashboard(nextDashboardState));
          debounceTimer = null;
        }, 10000);
      }
      currentDashboardState = nextDashboardState;
    }
  });

  return dispose;
};
