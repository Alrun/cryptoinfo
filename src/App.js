import React, { useReducer } from 'react';

import { reducer, initialState } from './context/reducer';
import { StoreContext } from './context';
import Main from './components/Main';

function App() {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <StoreContext.Provider value={ {dispatch, state} }>
      <Main />
    </StoreContext.Provider>
  );
}

export default App;