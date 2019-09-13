import React from 'react';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  row: {
    padding: theme.spacing(1),
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2),
  },
}));

export default function TableRow(props) {
  const {title, buyPrice, price, quantity, /*buyFee, sellFee, */wallet, profit, gain, val} = props.data;
  const {isLoading, errorText, fiat, colWidth, hideMore} = props;
  const classes = useStyles();

  return (
    <div style={ {display: 'flex'} }>
      <div className={ classes.row } style={ {position: 'relative', width: colWidth.col1} }>
        <div style={ {position: 'absolute', left: -10} }>{ errorText }{ isLoading && '*' }</div>
        { title }
      </div>
      <div className={ classes.row } style={ {width: colWidth.col2, textAlign: 'right'} }>{ quantity.toFixed(8) }</div>
      <div className={ classes.row } style={ {width: colWidth.col3, textAlign: 'right'} }>{ fiat === 'btc' ? buyPrice.toFixed(8) : buyPrice.toFixed(2) }</div>
      <div className={ classes.row } style={ {width: colWidth.col4, textAlign: 'right'} }>{ fiat === 'btc' ? price.toFixed(8) : price.toFixed(2) }</div>
      <div className={ classes.row } style={ {width: colWidth.col5, textAlign: 'right'} }>{ fiat === 'btc' ? profit.toFixed(8) : profit.toFixed(2) }</div>
      <div className={ classes.row } style={ {width: colWidth.col6, textAlign: 'right'} }>{ gain.toFixed(2) }</div>
      <div className={ classes.row } style={ {width: colWidth.col7, textAlign: 'right'} }>{ fiat === 'btc' ? val.toFixed(8) : val.toFixed(2) }</div>
      <div className={ classes.row } style={ {width: colWidth.col8} }>{ wallet }</div>
      {!hideMore && <div><MoreVertIcon/></div>}
      {/*<div>{ (buyFee || sellFee) && `${ buyFee } / ${ sellFee }` }</div>*/}
    </div>
  );
}