import React, { useContext, useEffect, useState, useCallback, useMemo } from 'react';
import PieChart from '../PieChart';
import { StoreContext } from '../../context';
import { sortStr } from '../../utils';

// const mock = [
//   {name: 'ADA', value: 400},
//   {name: 'BTC', value: 300},
//   {name: 'ETH', value: 300},
//   {name: 'LTC', value: 200},
//   {name: 'USDT', value: 10},
//   {name: 'XEM', value: 110},
// ];

export default function PieChartContainer() {
  const {state} = useContext(StoreContext);
  const [pieData, setPieData] = useState([]);


  useEffect(() => {
    if (!!state.tableData.length) {
      setPieData(state.tableData.map(item => {
        return {
          name: item.title,
          value: item.val
        };
      }).sort((a, b) => sortStr(a.name, b.name)));
    }
  }, [state.tableData.length, state.tableData]);

  return (
    <PieChart data={ pieData } fiat={state.fiat} fiatSymbol={state.fiatSymbol} />
  );
}
