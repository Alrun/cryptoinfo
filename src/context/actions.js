export const spreadsheetFetchSuccess = data => ({
  type: 'SPREADSHEET_FETCH_SUCCESS',
  data
});

export const spreadsheetLoading = bool => ({
  type: 'SPREADSHEET_LOADING',
  bool
});

export const spreadsheetError = msg => ({
  type: 'SPREADSHEET_ERROR',
  msg
});

export const marketFetchSuccess = data => ({
  type: 'MARKET_FETCH_SUCCESS',
  data
});

export const marketLoading = bool => ({
  type: 'MARKET_LOADING',
  bool
});

export const marketError = msg => ({
  type: 'MARKET_ERROR',
  msg
});

export const setCurrency = cur => ({
  type: 'SET_CURRENCY',
  cur
});

export const setTableData = data => ({
  type: 'SET_TABLE_DATA',
  data
});

export const sortItems = sortBy => ({
  type: 'SORT_ITEMS',
  sortBy
});