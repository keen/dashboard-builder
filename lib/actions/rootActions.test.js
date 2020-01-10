import {
  selectSavedQuery,
  deleteChart,
  changeSavedQueryList
} from './rootActions';

import { defaultData as initialState } from '../reducers/rootReducer';

import {
  SELECT_SAVED_QUERY,
  DELETE_CHART,
  CHANGE_SAVED_QUERY_LIST
} from './actionTypes';
import { APP_REDUCER } from '../constants';

describe('Root Actions', () => {
  describe('selectSavedQuery()', () => {
    let dispatch;
    let keenClient;

    const query = {
      value: 'queryValue'
    };

    beforeEach(() => {
      dispatch = jest.fn();
      keenClient = {
        get: jest
          .fn()
          .mockImplementationOnce(() =>
            Promise.resolve([{ key: 'access_key' }])
          ),
        post: jest.fn(),
        url: jest.fn(),
        masterKey: jest.fn()
      };
    });

    it('should not update access key for non empty saved queries', () => {
      const state = {
        [APP_REDUCER]: {
          ...initialState,
          dashboardInfo: {
            is_public: true,
            settings: {
              items: [
                {
                  i: 0,
                  savedQuery: [{ value: 'initialQueryValue' }]
                }
              ]
            },
            data: {
              items: [
                {
                  savedQuery: [{ value: 'initialQueryValue' }]
                }
              ]
            }
          }
        }
      };
      const getState = jest.fn().mockImplementationOnce(() => state);
      const thunkAction = selectSavedQuery([], 0);

      thunkAction(dispatch, getState, { keenClient });

      expect(keenClient.get).not.toHaveBeenCalled();
      expect(dispatch).toHaveBeenCalledTimes(2);
    });

    it('should not update access key for non public dashboard', () => {
      const state = {
        [APP_REDUCER]: {
          ...initialState,
          dashboardInfo: {
            is_public: false,
            settings: {
              items: [
                {
                  i: 0,
                  savedQuery: [{ value: 'initialQueryValue' }]
                }
              ]
            },
            data: {
              items: [
                {
                  savedQuery: [{ value: 'initialQueryValue' }]
                }
              ]
            }
          }
        }
      };

      const getState = jest.fn().mockImplementationOnce(() => state);
      const thunkAction = selectSavedQuery(query, 0);

      thunkAction(dispatch, getState, { keenClient });

      expect(keenClient.get).not.toHaveBeenCalled();
      expect(dispatch).toHaveBeenCalledTimes(2);
    });

    it('should not update access key for already existing saved query', () => {
      const state = {
        [APP_REDUCER]: {
          ...initialState,
          dashboardInfo: {
            is_public: true,
            settings: {
              savedQueriesList: [query.value],
              items: [
                {
                  i: 0,
                  savedQuery: [{ value: 'initialQueryValue' }]
                }
              ]
            },
            data: {
              items: [
                {
                  savedQuery: [{ value: 'initialQueryValue' }]
                }
              ]
            }
          }
        }
      };

      const getState = jest.fn().mockImplementationOnce(() => state);
      const thunkAction = selectSavedQuery(query, 0);

      thunkAction(dispatch, getState, { keenClient });

      expect(keenClient.get).not.toHaveBeenCalled();
      expect(dispatch).toHaveBeenCalledTimes(2);
    });

    it('should update access key', () => {
      const state = {
        [APP_REDUCER]: {
          ...initialState,
          dashboardInfo: {
            is_public: true,
            settings: {
              items: [
                {
                  i: 0,
                  savedQuery: [{ value: 'initialQueryValue' }]
                }
              ]
            },
            data: {
              items: [
                {
                  savedQuery: [{ value: 'initialQueryValue' }]
                }
              ]
            }
          }
        }
      };

      const getState = jest.fn().mockImplementationOnce(() => state);
      const thunkAction = selectSavedQuery(query, 0);

      thunkAction(dispatch, getState, { keenClient });

      expect(keenClient.get).toHaveBeenCalled();
      expect(dispatch).toHaveBeenCalledTimes(2);
      expect(dispatch).toHaveBeenLastCalledWith({
        type: SELECT_SAVED_QUERY,
        index: 0,
        savedQueries: [query]
      });
    });
  });

  describe('delChart()', () => {
    let dispatch;
    let keenClient;

    beforeEach(() => {
      dispatch = jest.fn();
      keenClient = {
        get: jest
          .fn()
          .mockImplementationOnce(() =>
            Promise.resolve([{ key: 'access_key' }])
          ),
        post: jest.fn(),
        url: jest.fn(),
        masterKey: jest.fn()
      };
    });

    it('should not delete chart and not update access key when confirm is false', () => {
      const state = {
        [APP_REDUCER]: {
          ...initialState,
          dashboardInfo: {
            is_public: true,
            settings: {
              items: [
                {
                  i: 0,
                  savedQuery: [{ value: 'initialQueryValue' }]
                }
              ]
            },
            data: {
              items: [
                {
                  savedQuery: [{ value: 'initialQueryValue' }]
                }
              ]
            }
          }
        }
      };
      window.confirm = jest.fn().mockImplementationOnce(() => false);

      const getState = jest.fn().mockImplementationOnce(() => state);
      const thunkAction = deleteChart(0);

      thunkAction(dispatch, getState, { keenClient });

      expect(window.confirm).toHaveBeenCalled();
      expect(keenClient.get).not.toHaveBeenCalled();
      expect(dispatch).not.toHaveBeenCalled();
    });

    it('should delete chart and not update access key when confirm is true but dashboard is not public', () => {
      const state = {
        [APP_REDUCER]: {
          ...initialState,
          dashboardInfo: {
            is_public: false,
            settings: {
              items: [
                {
                  i: 0,
                  savedQuery: [{ value: 'initialQueryValue' }]
                }
              ]
            },
            data: {
              items: [
                {
                  savedQuery: [{ value: 'initialQueryValue' }]
                }
              ]
            }
          }
        }
      };
      window.confirm = jest.fn().mockImplementationOnce(() => true);

      const getState = jest.fn().mockImplementationOnce(() => state);
      const thunkAction = deleteChart(0);

      thunkAction(dispatch, getState, { keenClient });

      expect(window.confirm).toHaveBeenCalled();
      expect(keenClient.get).not.toHaveBeenCalled();
      expect(dispatch).toHaveBeenLastCalledWith({
        type: DELETE_CHART,
        index: 0
      });
    });

    it('should delete chart and not update access key when saved query is not assigned', () => {
      const state = {
        [APP_REDUCER]: {
          ...initialState,
          dashboardInfo: {
            is_public: true,
            settings: {
              items: [
                {
                  i: 0,
                  savedQuery: []
                }
              ]
            },
            data: {
              items: [
                {
                  savedQuery: []
                }
              ]
            }
          }
        }
      };
      window.confirm = jest.fn().mockImplementationOnce(() => true);

      const getState = jest.fn().mockImplementationOnce(() => state);
      const thunkAction = deleteChart(0);

      thunkAction(dispatch, getState, { keenClient });

      expect(window.confirm).toHaveBeenCalled();
      expect(keenClient.get).not.toHaveBeenCalled();
      expect(dispatch).toHaveBeenLastCalledWith({
        type: DELETE_CHART,
        index: 0
      });
    });

    it('should delete chart and update access key', () => {
      const state = {
        [APP_REDUCER]: {
          ...initialState,
          dashboardInfo: {
            is_public: true,
            settings: {
              items: [
                {
                  i: 0,
                  savedQuery: [{ value: 'initialQueryValue' }]
                }
              ]
            },
            data: {
              items: [
                {
                  savedQuery: [{ value: 'initialQueryValue' }]
                }
              ]
            }
          }
        }
      };
      window.confirm = jest.fn().mockImplementationOnce(() => true);

      const getState = jest
        .fn()
        .mockImplementationOnce(() => state)
        .mockImplementationOnce(() => state);
      const thunkAction = deleteChart(0);

      thunkAction(dispatch, getState, { keenClient });

      expect(window.confirm).toHaveBeenCalled();
      expect(keenClient.get).toHaveBeenCalled();
      expect(dispatch).toHaveBeenLastCalledWith({
        type: DELETE_CHART,
        index: 0
      });
    });
  });

  describe('change', () => {
    const dispatch = jest.fn();

    it('should dispatch CHANGE_SAVED_QUERY_LIST action', () => {
      const state = {
        [APP_REDUCER]: {
          ...initialState,
          dashboardInfo: {
            settings: {
              savedQueriesList: ['queryName', 'queryName1']
            }
          }
        }
      };

      const savedQueriesList = ['queryName1', 'queryName2'];

      const getState = jest.fn().mockImplementationOnce(() => state);
      const thunkAction = changeSavedQueryList(
        [{ value: 'queryName' }],
        [{ value: 'queryName2' }]
      );

      thunkAction(dispatch, getState);

      expect(dispatch).toHaveBeenLastCalledWith({
        type: CHANGE_SAVED_QUERY_LIST,
        savedQueriesList
      });
    });
  });
});
