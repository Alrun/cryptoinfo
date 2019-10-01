import {
  C,
  setSpreadsheetLink,
  spreadsheetFetchSuccess,
  spreadsheetLoading,
  spreadsheetError,
  marketFetchSuccess,
  marketLoading,
  marketError,
  setCurrency,
  setTableData,
  sortItems,
  groupOpenAll,
  groupOpenToggle
} from './actions';

describe('actions tests', () => {
  describe('spreadsheet actions', () => {

    it('should create an action to set spreadsheet link', () => {
      expect(setSpreadsheetLink('hashlink')).toEqual({
        type: C.SET_SPREADSHEET_LINK,
        link: 'hashlink'
      });
    });

    it('should create an action to spreadsheet loading', () => {
      expect(spreadsheetLoading(false)).toEqual({
        type: C.SPREADSHEET_LOADING,
        bool: false
      });
    });

    it('should create an action to spreadsheet error', () => {
      expect(spreadsheetError('Error Message')).toEqual({
        type: C.SPREADSHEET_ERROR,
        msg: 'Error Message'
      });
    });

    it('should create an action to spreadsheet fetch success', () => {
      expect(spreadsheetFetchSuccess([1, 2, 3])).toEqual({
        type: C.SPREADSHEET_FETCH_SUCCESS,
        data: [1, 2, 3]
      });
    });
  });

  describe('should create an action to market loading', () => {
    it('MARKET_LOADING', () => {
      expect(marketLoading(false)).toEqual({
        type: C.MARKET_LOADING,
        bool: false
      });
    });

    it('should create an action to market error', () => {
      expect(marketError('Error Message')).toEqual({
        type: C.MARKET_ERROR,
        msg: 'Error Message'
      });
    });

    it('should create an action to market fetch success', () => {
      expect(marketFetchSuccess([1, 2, 3])).toEqual({
        type: C.MARKET_FETCH_SUCCESS,
        data: [1, 2, 3]
      });
    });

  });

  describe('should create an action to set table data', () => {
    it('SET_TABLE_DATA', () => {
      expect(setTableData([1, 2])).toEqual({
        type: C.SET_TABLE_DATA,
        data: [1, 2]
      });
    });
  });

  describe('should create an action to set currency', () => {
    it('SET_CURRENCY', () => {
      expect(setCurrency('btc')).toEqual({
        type: C.SET_CURRENCY,
        cur: 'btc'
      });
    });
  });

  describe('should create an action to sort table data', () => {
    it('SORT_ITEMS', () => {
      expect(sortItems('title')).toEqual({
        type: C.SORT_ITEMS,
        sortBy: 'title'
      });
    });
  });

  describe('should create an action to open one group in a table', () => {
    it('GROUP_OPEN_TOGGLE', () => {
      expect(groupOpenToggle('id')).toEqual({
        type: C.GROUP_OPEN_TOGGLE,
        id: 'id'
      });
    });
  });

  describe('should create an action to open all groups in a table', () => {
    it('GROUP_OPEN_ALL', () => {
      expect(groupOpenAll(false)).toEqual({
        type: C.GROUP_OPEN_ALL,
        bool: false
      });
    });
  });
});