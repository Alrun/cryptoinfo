export const initialState = {
  fiat: 'btc',
  sortBy: 'title',
  sortDesc: false,
  tableData: [],
  spreadsheet: {
    isLoading: false,
    error: '',
    data: []
  },
  market: {
    isLoading: false,
    error: '',
    data: [],
    priceBtc: 0,
    priceUsdt: 0,
  }
};

export const reducer = (state, action) => {
  console.log('action ', action);

  switch (action.type) {
    case 'SPREADSHEET_FETCH_SUCCESS':
      return {
        ...state,
        spreadsheet: {
          ...state.spreadsheet,
          data: action.data
        }
      };

    case 'SPREADSHEET_LOADING':
      return {
        ...state,
        spreadsheet: {
          ...state.spreadsheet,
          isLoading: action.bool
        }
      };

    case 'SPREADSHEET_ERROR':
      return {
        ...state,
        spreadsheet: {
          ...state.spreadsheet,
          error: action.msg
        }
      };
    case 'MARKET_FETCH_SUCCESS':
      return {
        ...state,
        market: {
          ...state.market,
          priceBtc: action.data.filter(item => item.label.match(/.*(?=\/)/).join().toLowerCase() === 'btc')[0].price,
          priceUsdt: action.data.filter(item => item.label.match(/.*(?=\/)/).join().toLowerCase() === 'usdt')[0].price,
          data: action.data
        }
      };

    case 'MARKET_LOADING':
      return {
        ...state,
        market: {
          ...state.market,
          isLoading: action.bool
        }
      };

    case 'MARKET_ERROR':
      return {
        ...state,
        market: {
          ...state.market,
          error: action.msg
        }
      };

      case 'SET_CURRENCY':
      return {
        ...state,
        fiat: action.cur
      };

      case 'SET_TABLE_DATA':
      return {
        ...state,
        tableData: action.data
      };

    case 'SORT_ITEMS':
      return {
        ...state,
        sortBy: state.sortBy === action.sortBy ? state.sortBy : action.sortBy,
        sortDesc: state.sortBy !== action.sortBy ? state.sortDesc : !state.sortDesc
      };

    default:
      return state;
  }
};