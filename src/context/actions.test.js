import {
  C,
  spreadsheetFetchSuccess,
  spreadsheetLoading,
  spreadsheetError,
  marketFetchSuccess,
  marketLoading,
  marketError,
  setCurrency,
  setTableData
} from './actions';
import { initialState, reducer } from './reducer';

describe('actions tests', () => {
  describe('table actions', () => {
    // test('SPREADSHEET_FETCH_SUCCESS', () => {
    //   expect(spreadsheetFetchSuccess({
    //     feed: {entry: [1, 2, 3]}
    //   })).toEqual({
    //     type: C.SPREADSHEET_FETCH_SUCCESS,
    //     data: action.data
    //   });
    // });

    test('SPREADSHEET_LOADING', () => {
      expect(spreadsheetLoading(true)).toEqual({
        type: C.SPREADSHEET_LOADING,
        bool: true
      });
    });

  });
});