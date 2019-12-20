import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';

import { runDashboardObserver } from './dashboardObserver';

import { APP_REDUCER } from '../constants';

describe('runDashboardObserver()', () => {
  const mockStore = configureStore([
    thunk.withExtraArgument({
      keenClient: {
        projectId: () => ''
      }
    })
  ]);
  let store;

  jest.useFakeTimers();

  beforeEach(() => {
    store = mockStore({});
  });

  it('should apply listener to store', () => {
    const store = {
      subscribe: jest.fn()
    };
    runDashboardObserver(store);

    expect(store.subscribe).toHaveBeenCalled();
  });

  it('should not dispatch dashboard save action', () => {
    store = mockStore({
      [APP_REDUCER]: {
        isMoving: true,
        isResizing: false
      }
    });

    runDashboardObserver(store);
    store.dispatch({ type: '@keen/action' });

    expect(store.getActions()).toMatchInlineSnapshot(`
      Array [
        Object {
          "type": "@keen/action",
        },
      ]
    `);
  });

  it('should not dispatch save action for same dashboard state', () => {
    store = mockStore({
      [APP_REDUCER]: {
        isMoving: true,
        isResizing: false
      }
    });

    runDashboardObserver(store);
    store.dispatch({ type: '@keen/action' });
    store.dispatch({ type: '@keen/action' });

    expect(store.getActions()).toMatchInlineSnapshot(`
      Array [
        Object {
          "type": "@keen/action",
        },
        Object {
          "type": "@keen/action",
        },
      ]
    `);
  });

  it('should dispatch save dashboard action', () => {
    const initialState = {
      [APP_REDUCER]: {
        isMoving: false,
        isResizing: false,
        dashboardInfo: {
          id: 1,
          value: 0
        }
      }
    };

    store = mockStore(actions => {
      if (actions.length === 1) {
        return {
          ...initialState,
          [APP_REDUCER]: {
            ...initialState[APP_REDUCER],
            dashboardInfo: {
              id: 1,
              value: 1
            }
          }
        };
      }

      return initialState;
    });

    runDashboardObserver(store);

    store.dispatch({ type: '@keen/action' });
    store.dispatch({ type: '@keen/action' });

    jest.runAllTimers();

    expect(store.getActions()).toMatchInlineSnapshot(`
      Array [
        Object {
          "type": "@keen/action",
        },
        Object {
          "type": "@keen/action",
        },
        Object {
          "type": "SAVE_DASHBOARD",
        },
      ]
    `);
  });
});
