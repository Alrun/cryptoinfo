import React, {useContext} from 'react';
import {default as S} from '@material-ui/core/Switch';

import {StoreContext} from '../../context';
import {test} from '../../context/actions';

export default function Switcher() {

  const {state, dispatch} = useContext(StoreContext);

  const handleChange = () => dispatch(test());

  return (
      <S
        checked={state.isChecked}
        onChange={handleChange}
        value="checkedA"
        inputProps={{'aria-label': 'secondary checkbox'}}
      />
  );
}