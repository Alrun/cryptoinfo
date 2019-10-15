import React from 'react';
import { default as SwitchUI } from '@material-ui/core/Switch';
import FormControlLabel from '@material-ui/core/FormControlLabel';

export default function Switch(props) {
  const {label, checked, handleChange} = props;

  return (
    <FormControlLabel
      control={ <SwitchUI
        color="default"
        checked={ checked }
        onChange={ handleChange() }
        inputProps={ {'aria-label': 'secondary checkbox'} }
      /> }
      label={label}
      labelPlacement="end"
    />
  );
}