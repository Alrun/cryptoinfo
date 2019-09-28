import { C } from './actions';

export const initialState = {
  fiat: 'btc',
  fiatSymbol: '₿',
  sortBy: 'title',
  sortDesc: false,
  tableData: [],
  groupOpenAll: !localStorage.groupOpenAll ? false : JSON.parse(localStorage.groupOpenAll),
  groupOpen: [],
  spreadsheet: {
    link: '',
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
  // console.log('action ', action);

  switch (action.type) {

    case C.SET_SPREADSHEET_LINK:
      return {
        ...state,
        spreadsheet: {
          ...state.spreadsheet,
          link: action.link
        }
      };

      case C.SPREADSHEET_FETCH_SUCCESS:
      return {
        ...state,
        spreadsheet: {
          ...state.spreadsheet,
          data: action.data,
          error: ''
        }
      };

    case C.SPREADSHEET_LOADING:
      return {
        ...state,
        spreadsheet: {
          ...state.spreadsheet,
          isLoading: action.bool
        }
      };

    case C.SPREADSHEET_ERROR:
      return {
        ...state,
        spreadsheet: {
          ...state.spreadsheet,
          error: action.msg
        }
      };

    case C.MARKET_FETCH_SUCCESS:
      return {
        ...state,
        market: {
          ...state.market,
          priceBtc: action.data.filter(item => item.label.match(/.*(?=\/)/).join().toLowerCase() === 'btc')[0].price,
          priceUsdt: action.data.filter(item => item.label.match(/.*(?=\/)/).join().toLowerCase() === 'usdt')[0].price,
          data: action.data,
          error: ''
        }
      };

    case C.MARKET_LOADING:
      return {
        ...state,
        market: {
          ...state.market,
          isLoading: action.bool
        }
      };

    case C.MARKET_ERROR:
      return {
        ...state,
        market: {
          ...state.market,
          error: action.msg
        }
      };

    case C.SET_CURRENCY:
      return {
        ...state,
        fiat: action.cur,
        fiatSymbol: (() => {
          switch (action.cur) {
            case 'rur':
              return '₽';
            case 'usdt':
              return '$';
            case 'eur':
              return '€';
            default:
              return '₿';
          }
        })()
      };

    case C.SET_TABLE_DATA:
      return {
        ...state,
        tableData: action.data
      };

    case C.SORT_ITEMS:
      return {
        ...state,
        sortBy: state.sortBy === action.sortBy ? state.sortBy : action.sortBy,
        sortDesc: state.sortBy !== action.sortBy ? state.sortDesc : !state.sortDesc
      };

    case C.GROUP_OPEN_TOGGLE:
      return {
        ...state,
        groupOpen: state.groupOpen.find(id => id === action.id)
                   ? state.groupOpen.filter(item => item !== action.id)
                   : state.groupOpen.concat(action.id)
      };

    case C.GROUP_OPEN_ALL:
      return {
        ...state,
        groupOpenAll: action.bool,
        groupOpen: action.bool
                   ? state.groupOpen
                   : []
      };

    default:
      return state;
  }
};