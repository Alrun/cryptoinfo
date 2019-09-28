import React, { useContext } from 'react';
import { StoreContext } from '../../context';
import { decimalFormat } from '../../utils';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import CircularProgress from '@material-ui/core/CircularProgress';

const useStyles = makeStyles(theme => ({
  title: {
    display: 'inline-block',
    margin: 0,
    fontSize: theme.typography.h6.fontSize
  },
  progress: {
    color: '#ccc',
    animationDuration: '.8s',
  },
  preloader: {
    verticalAlign: 'middle'
  }
}));


export default function Price() {
  const {state} = useContext(StoreContext);
  const classes = useStyles();
  return (
    <>
      <Box className={classes.title}>
        1 BTC:&nbsp;
        { !state.market.priceBtc
        ? <Box className={ classes.preloader } component="span">
          <CircularProgress className={ classes.progress } size={ 16 } disableShrink thickness={5}/>
        </Box>
          : <Box component="span" fontWeight="fontWeightMedium">
            {decimalFormat(state.market.priceBtc, 2)} {state.fiat === 'btc' ? '$' : state.fiatSymbol}
          </Box>
        }
      </Box>
    </>
  );
}