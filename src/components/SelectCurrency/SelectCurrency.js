import React, { useContext } from 'react';
import { StoreContext } from '../../context';

import { setCurrency } from '../../context/actions';

import { makeStyles, withStyles } from '@material-ui/core/styles';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import InputBase from '@material-ui/core/InputBase';
import Box from '@material-ui/core/Box';

const CustomInput = withStyles(theme => ({
  root: {
  //   'label + &': {
  //     marginTop: theme.spacing(5),
  //   },
  },
  input: {
    borderRadius: 5,
    position: 'relative',
    backgroundColor: theme.palette.background.paper,
    border: '1px solid #ced4da',
    fontSize: 14,
    padding: '8px 24px 8px 8px',
    transition: theme.transitions.create(['border-color', 'box-shadow']),
    // Use the system font instead of the default Roboto font.
    '&:focus': {
      background: theme.palette.background.paper,
      borderRadius: 5,
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
  wrap: {
    marginBottom: theme.spacing(1),
    minWidth: 90
  },
  icon: {
    display: 'inline-block',
    border: '1px solid #999',
    borderRadius: '50%',
    width: '1.4em',
    height: '1.4em',
    lineHeight: '1.3em',
    textAlign: 'center',
    marginRight: 5,
  },
  menu: {
    // border: '1px solid red',
    // minWidth: 90
  },
  menuList: {
    // border: '1px solid green',
    padding: 0,
  },
  menuItem: {
    minWidth: 90,
    fontSize: '1rem',
    minHeight: 40,
    paddingLeft: 10
  }
}));

export default function SelectCurrency() {
  const {state, dispatch} = useContext(StoreContext);

  const classes = useStyles();
  // const [age, setAge] = React.useState('');
  const handleChange = event => {
    dispatch(setCurrency(event.target.value));
  };


  return (
    <form className={ classes.root } autoComplete="off">
      <FormControl className={ classes.wrap }>
        <Select
          value={ state.fiat }
          onChange={ handleChange }
          MenuProps={{classes: {paper: classes.menu, list: classes.menuList}}}
          input={
            <CustomInput
              name="currency"
              id="currency-customized-select"
            />
          }
        >
          <MenuItem className={classes.menuItem} value="btc"><Box className={ classes.icon }>₿</Box>BTC</MenuItem>
          <MenuItem className={classes.menuItem} value="usdt"><Box className={ classes.icon }>$</Box>USD</MenuItem>
          <MenuItem className={classes.menuItem} value="eur"><Box className={ classes.icon }>€</Box>EUR</MenuItem>
          <MenuItem className={classes.menuItem} value="rur"><Box className={ classes.icon }>₽</Box>RUR</MenuItem>
        </Select>
      </FormControl>
    </form>
  );
}