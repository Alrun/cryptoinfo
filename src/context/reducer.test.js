import { reducer, initialState } from './reducer';
import { C } from './actions';

describe('reducer tests', () => {
  it('should return the initial state', () => {
    expect(reducer(undefined, {})).toEqual(initialState)
  });

  describe('table reducer', () => {
    it('SPREADSHEET_FETCH_SUCCESS', () => {
      const action = {
        type: C.SPREADSHEET_FETCH_SUCCESS,
        data: {
          feed: {entry: [1, 2, 3]}
        }
      };

      expect(reducer(initialState, action)).toEqual({
        ...initialState,
        spreadsheet: {
          ...initialState.spreadsheet,
          data: action.data,
          error: ''
        }
      });
    });

    test('SPREADSHEET_LOADING', () => {
      const action = {
        type: C.SPREADSHEET_LOADING,
        bool: true
      };

      expect(reducer(initialState, action)).toEqual({
        ...initialState,
        spreadsheet: {
          ...initialState.spreadsheet,
          isLoading: action.bool
        }
      });
    });

    test('SPREADSHEET_ERROR', () => {
      const action = {
        type: C.SPREADSHEET_ERROR,
        msg: '500 server error'
      };

      expect(reducer(initialState, action)).toEqual({
        ...initialState,
        spreadsheet: {
          ...initialState.spreadsheet,
          error: action.msg
        }
      });
    });
  });
});