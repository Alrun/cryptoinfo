import React, { useState, useEffect, useContext } from 'react';
import Box from '@material-ui/core/Box';
import { decimalFormat, sum } from '../../utils';
import { StoreContext } from '../../context';

export default function TableSum() {
  const {state/*, dispatch*/} = useContext(StoreContext);
  const [total, setTotal] = useState(0);
  const [profit, setProfit] = useState(0);
  const {tableData, fiat, fiatSymbol} = state;

  useEffect(() => {
    if (tableData.length) {
      setTotal(sum(tableData, 'val'));
      setProfit(sum(tableData, 'profit'));
    }
  }, [fiatSymbol, tableData]);

  return (
    <Box>
      <Box>{ `Total: ${ fiat === 'btc' ? total.toFixed(8) : decimalFormat(total, 2) } ${ fiatSymbol }` }</Box>
      <Box>
        Profit:
        <Box component="span" color={ (profit < 0) ? 'red' : 'green' }>
          { ` ${ fiat === 'btc' ? profit.toFixed(8) : decimalFormat(profit, 2) } ${ fiatSymbol }` }
        </Box>
      </Box>
    </Box>
  );
}