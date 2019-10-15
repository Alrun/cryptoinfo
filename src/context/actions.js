export const C = {
  SET_SPREADSHEET_LINK: 'SET_SPREADSHEET_LINK',
  SPREADSHEET_FETCH_SUCCESS: 'SPREADSHEET_FETCH_SUCCESS',
  SPREADSHEET_LOADING: 'SPREADSHEET_LOADING',
  SPREADSHEET_ERROR: 'SPREADSHEET_ERROR',
  MARKET_FETCH_SUCCESS: 'MARKET_FETCH_SUCCESS',
  MARKET_LOADING: 'MARKET_LOADING',
  MARKET_ERROR: 'MARKET_ERROR',
  SORT_ITEMS: 'SORT_ITEMS',
  SET_TABLE_DATA: 'SET_TABLE_DATA',
  SET_CURRENCY: 'SET_CURRENCY',
  GROUP_OPEN_TOGGLE: 'GROUP_OPEN_TOGGLE',
  GROUP_OPEN_ALL: 'GROUP_OPEN_ALL',
  SHOW_PERCENT: 'SHOW_PERCENT'
};

export const setSpreadsheetLink = link => ({
    type: C.SET_SPREADSHEET_LINK,
    link
});

export const spreadsheetFetchSuccess = data => ({
  type: C.SPREADSHEET_FETCH_SUCCESS,
  data
});

export const spreadsheetLoading = bool => ({
  type: C.SPREADSHEET_LOADING,
  bool
});

export const spreadsheetError = msg => ({
  type: C.SPREADSHEET_ERROR,
  msg
});

export const marketFetchSuccess = data => ({
  type: C.MARKET_FETCH_SUCCESS,
  data
});

export const marketLoading = bool => ({
  type: C.MARKET_LOADING,
  bool
});

export const marketError = msg => ({
  type: C.MARKET_ERROR,
  msg
});

export const setCurrency = cur => ({
  type: C.SET_CURRENCY,
  cur
});

export const setTableData = data => ({
  type: C.SET_TABLE_DATA,
  data
});

export const sortItems = sortBy => ({
  type: C.SORT_ITEMS,
  sortBy
});

export const groupOpenToggle = id => ({
  type: C.GROUP_OPEN_TOGGLE,
  id
});

export const groupOpenAll = bool => ({
  type: C.GROUP_OPEN_ALL,
  bool
});

export const showPercent = bool => ({
  type: C.SHOW_PERCENT,
  bool
});