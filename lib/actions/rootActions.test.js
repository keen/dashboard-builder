import { selectSavedQuery, changeSavedQueryList } from './rootActions';

import { defaultData as initialState } from '../reducers/rootReducer';

import { SELECT_SAVED_QUERY } from './actionTypes';
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
                  savedQuery: [{ value: 'initialQueryValue' }]
                }
              ]
            },
            data: {
              items: [
                {
                  saveQuery: [{ value: 'initialQueryValue' }]
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
                  savedQuery: [{ value: 'initialQueryValue' }]
                }
              ]
            },
            data: {
              items: [
                {
                  saveQuery: [{ value: 'initialQueryValue' }]
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

    it.only('should not update access key for already existing saved query', () => {
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
                  saveQuery: [{ value: 'initialQueryValue' }]
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
                  savedQuery: [{ value: 'initialQueryValue' }]
                }
              ]
            },
            data: {
              items: [
                {
                  saveQuery: [{ value: 'initialQueryValue' }]
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
});
