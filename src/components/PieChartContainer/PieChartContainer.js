import React, { useContext, useEffect, useState } from 'react';
import { StoreContext } from '../../context';
import PieChart from '../PieChart';
import { sortStr } from '../../utils';
import { makeStyles } from '@material-ui/core';
import Fade from '@material-ui/core/Fade';
import { useTheme } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';

const useStyles = makeStyles({
  root: {
    position: 'relative',
    margin: 'auto'
  },
  cap: {
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    borderStyle: 'solid',
    borderColor: '#eee',
    position: 'absolute',
    borderRadius: '50%',
    margin: 'auto',
  },
});

export default function PieChartContainer() {
  const {state} = useContext(StoreContext);
  const [pieData, setPieData] = useState([]);
  const classes = useStyles();
  const theme = useTheme();
  const notMobile = useMediaQuery(theme.breakpoints.up('sm'));
  const {tableData, fiat, fiatSymbol} = state;

  const pieConfig = {
    pieWidth: notMobile ? 576 - 24 : 288,
    pieHeight: notMobile ? 430 : 288,
    pieOuter: 270
  };

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
    <div
      className={ classes.root }
      style={ {
        width: pieConfig.pieWidth,
        height: pieConfig.pieHeight,
        margin: !notMobile ? '1.5rem auto' : null
      } }
    >

      <Fade in={ !pieData.length } timeout={ {enter: 0, exit: 2000} }>
        <div
          className={ classes.cap }
          style={ {
            borderWidth: (pieConfig.pieOuter - pieConfig.pieOuter * 0.865) / 2,
            height: pieConfig.pieOuter,
            width: pieConfig.pieOuter
          } }
        />
      </Fade>

      <PieChart
        pieData={ pieData }
        fiatSymbol={ fiatSymbol }
        width={ pieConfig.pieWidth }
        height={ pieConfig.pieHeight }
        outer={ pieConfig.pieOuter }
        compact={!notMobile}
      />

    </div>
  );
}
