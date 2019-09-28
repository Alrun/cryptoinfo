import React, { useContext } from 'react';
import { default as SwitchUI } from '@material-ui/core/Switch';
import FormControlLabel from '@material-ui/core/FormControlLabel';

import { StoreContext } from '../../context';
import { groupOpenAll } from '../../context/actions';

export default function Switch() {
  const {state, dispatch} = useContext(StoreContext);

  const handleChange = () => {
    dispatch(groupOpenAll(!state.groupOpenAll));
    localStorage.groupOpenAll = !state.groupOpenAll;
  };

  return (
    <FormControlLabel
      control={ <SwitchUI
        checked={ state.groupOpenAll }
        onChange={ handleChange }
        inputProps={ {'aria-label': 'secondary checkbox'} }
      /> }
      label="Expand all"
      labelPlacement="end"
    />
  );
}