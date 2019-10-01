import React, { useContext } from 'react';
import { StoreContext } from '../../context';
import { decimalFormat } from '../../utils';
import { makeStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'inline-flex',
    flexWrap: 'wrap',
    margin: 0,
    fontSize: theme.typography.h6.fontSize,
  },
  title: {
    marginRight: theme.spacing(1) / 2
  },
  value: {
    whiteSpace: 'nowrap',
    fontWeight: theme.typography.fontWeightMedium
  },
  preloader: {
    marginTop: 2
  },
  progress: {
    color: '#ccc',
    animationDuration: '.8s',
  },
}));

export default function Price() {
  const {state} = useContext(StoreContext);
  const classes = useStyles();
  return (
    <div className={ classes.root }>

        <div className={ classes.title }>
          1 BTC:
        </div>
        { !state.market.priceBtc
          ? <div className={ classes.preloader }>
            <CircularProgress className={ classes.progress } size={ 16 } disableShrink thickness={ 5 } />
          </div>
          : <div className={ classes.value }>
            { decimalFormat(state.market.priceBtc, 2) }&nbsp;{ state.fiat === 'btc' ? '$' : state.fiatSymbol }
          </div>
        }

    </div>
  );
}