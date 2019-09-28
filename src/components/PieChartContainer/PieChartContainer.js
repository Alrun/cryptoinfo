import React, { useContext, useEffect, useState } from 'react';
import { StoreContext } from '../../context';
import PieChart from '../PieChart';
import { sortStr } from '../../utils';
import { makeStyles } from '@material-ui/core';
import Fade from '@material-ui/core/Fade';

const useStyles = makeStyles(theme => ({
  cap: {
    width: 600,
    height: 450,
    margin: 'auto'
  },
}));

export default function PieChartContainer() {
  const {state} = useContext(StoreContext);
  const [pieData, setPieData] = useState([]);
  const classes = useStyles();
  const {tableData, fiat, fiatSymbol} = state;

  useEffect(() => {
    if (!!tableData.length) {
      setPieData(tableData.map(item => {
        return {
          name: item.title,
          value: item.val,
          fiat: fiat,
          fiatSymbol: fiatSymbol
        };
      }).sort((a, b) => sortStr(a.name, b.name)));
    }
  }, [tableData.length, tableData, fiatSymbol, fiat]);

  return (
    <>
      {
        !pieData.length
        ? <Fade in={ !pieData.length } timeout={ {enter: 1000, exit: 10000}}>
          <div className={ classes.cap }>
            1111
          </div
          >
        </Fade>
        : <Fade in={ true/*!pieData.length*/ } timeout={ {enter: 10000, exit: 10000}}>
          <PieChart data={ pieData } fiatSymbol={ fiatSymbol } />
        </Fade>
      }
    </>
  );
}
