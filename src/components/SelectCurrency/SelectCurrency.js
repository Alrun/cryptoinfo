import React, { useContext } from 'react';
import { StoreContext } from '../../context';
import { makeStyles } from '@material-ui/core/styles';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import Popper from '@material-ui/core/Popper';
import Button from '@material-ui/core/Button';
import Fade from '@material-ui/core/Fade';
import Paper from '@material-ui/core/Paper';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import { setCurrency } from '../../context/actions';

const currencyList = [
  {id: 'btc', title: 'BTC', symbol: '₿'},
  {id: 'usdt', title: 'USD', symbol: '$'},
  {id: 'eur', title: 'EUR', symbol: '€'},
  {id: 'rur', title: 'RUR', symbol: '₽'}
];

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
    marginRight: 8,
  }
}));

export default function SelectCurrency() {
  const {state, dispatch} = useContext(StoreContext);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const classes = useStyles();

  const handleOpen = e => {
    setAnchorEl(anchorEl ? null : e.currentTarget);
  };

  const handleClickAway = () => {
    setAnchorEl(null);
  };

  const handleClick = e => {
    dispatch(setCurrency(e.currentTarget.id));
  };

  return (
      <ClickAwayListener onClickAway={ handleClickAway }>
        <div>
          <Button variant="outlined" onClick={ handleOpen }>

            <div className={ classes.icon }>
              {currencyList.find(item => item.id === state.fiat).symbol}
            </div>
            {currencyList.find(item => item.id === state.fiat).title}

          </Button>
          <Popper
            open={ !!anchorEl }
            anchorEl={ anchorEl }
            transition
            placement="bottom-end"
            modifiers={{
              flip: {
                enabled: false
              },
              offset: {
                offset: '0, 1px'
              },
              computeStyle: {
                y: "'right'",
              },
            }}
          >
            { ({TransitionProps}) => (
              <Fade { ...TransitionProps } timeout={ 150 }>
                <Paper elevation={8}>
                  <List component="div">
                    { currencyList.map(item => (
                      <ListItem
                        button
                        id={ item.id }
                        key={ item.id }
                        onClick={ handleClick }
                        selected={item.id === state.fiat}
                      >
                        <div className={ classes.icon }>{ item.symbol }</div>
                        { item.title }
                      </ListItem>
                    )) }
                  </List>
                </Paper>

              </Fade>
            ) }
          </Popper>
        </div>
      </ClickAwayListener>
  );
}