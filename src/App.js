import React, { useReducer } from 'react';
import { reducer, initialState } from './context/reducer';
import { StoreContext } from './context';
import Main from './components/Main';
import CssBaseline from '@material-ui/core/CssBaseline';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';

const theme = createMuiTheme({
  palette: {
    background: {
      default: '#fff'
    },
  },
  overrides: {
  }
});

function App() {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <StoreContext.Provider value={ {dispatch, state} }>
      <MuiThemeProvider theme={ theme }>
        <CssBaseline />
        <Main />
      </MuiThemeProvider>
    </StoreContext.Provider>
  );
}

export default App;