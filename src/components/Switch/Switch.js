import React, {useContext} from 'react';
import {default as SwitchUI} from '@material-ui/core/Switch';

import {StoreContext} from '../../context';

export default function Switch() {

  const {state, dispatch} = useContext(StoreContext);

  // const handleChange = () => dispatch(test());
  const handleChange = () => console.log('switch');

  return (
      <SwitchUI
        checked={state.isChecked}
        onChange={handleChange}
        value="checkedA"
        inputProps={{'aria-label': 'secondary checkbox'}}
      />
  );
}