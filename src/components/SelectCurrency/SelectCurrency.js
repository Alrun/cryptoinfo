import React, { useContext } from 'react';
import { StoreContext } from '../../context';

import { setCurrency } from '../../context/actions';

import { makeStyles, withStyles } from '@material-ui/core/styles';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import InputBase from '@material-ui/core/InputBase';

const CustomInput = withStyles(theme => ({
  root: {
    'label + &': {
      marginTop: theme.spacing(3),
    },
  },
  input: {
    borderRadius: 4,
    position: 'relative',
    backgroundColor: theme.palette.background.paper,
    border: '1px solid #ced4da',
    fontSize: 16,
    padding: '10px 26px 10px 12px',
    transition: theme.transitions.create(['border-color', 'box-shadow']),
    // Use the system font instead of the default Roboto font.
    fontFamily: [
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(','),
    '&:focus': {
      // borderRadius: 4,
      // borderColor: '#80bdff',
      // boxShadow: '0 0 0 0.2rem rgba(0,123,255,.25)',
    },
  },
}))(InputBase);

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  margin: {
    margin: theme.spacing(1),
  },
}));

export default function SelectCurrency() {
  const {state, dispatch} = useContext(StoreContext);

  const classes = useStyles();
  // const [age, setAge] = React.useState('');
  const handleChange = event => {
    dispatch(setCurrency(event.target.value))
  };


  return (
    <form className={classes.root} autoComplete="off">
      <FormControl className={classes.margin}>
        <Select
          value={state.fiat}
          onChange={handleChange}
          input={
            <CustomInput
              name="currency"
              id="currency-customized-select"
            />
          }
        >
          <MenuItem value='btc'><i>1</i>BTC</MenuItem>
          <MenuItem value='usdt'><i>1</i>USD</MenuItem>
          <MenuItem value='eur'><i>1</i>EUR</MenuItem>
          <MenuItem value='rur'><i>1</i>RUR</MenuItem>
        </Select>
      </FormControl>
    </form>
  );
}