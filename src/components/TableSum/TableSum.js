import React, { useState, useEffect, useContext } from 'react';
import Box from '@material-ui/core/Box';
import { decimalFormat, sum } from '../../utils';
import { StoreContext } from '../../context';
import { makeStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';

const useStyles = makeStyles({
  preloader: {
    marginTop: 4
  },
  progress: {
    color: '#ccc',
    animationDuration: '.8s',
  },
});

export default function TableSum() {
  const {state} = useContext(StoreContext);
  const [total, setTotal] = useState(0);
  const [profit, setProfit] = useState(0);
  const classes = useStyles();
  const {tableData, fiat, fiatSymbol} = state;

  useEffect(() => {
    if (tableData.length) {
      setTotal(sum(tableData, 'val'));
      setProfit(sum(tableData, 'profit'));
    }
  }, [fiatSymbol, tableData]);

  return (
    <Box lineHeight={ 1.25 }>
      { !total
        ? <div className={ classes.preloader }><CircularProgress className={ classes.progress } size={ 25 } disableShrink /></div>
        : <div>
          <Box fontSize="body1.fontSize" fontWeight="fontWeightMiddle">
            { `Total: ${ fiat === 'btc' ? total.toFixed(8) : decimalFormat(total, 2) } ${ fiatSymbol }` }
          </Box>
          < Box fontSize="body2.fontSize">
            Profit:
            <Box component="span" color={ (profit < 0) ? 'red' : 'green' }>
              { ` ${ fiat === 'btc' ? profit.toFixed(8) : decimalFormat(profit, 2) } ${ fiatSymbol }` }
            </Box>
          </Box>
        </div> }
    </Box>
  );
}