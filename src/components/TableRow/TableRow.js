import React from 'react';

export default function TableRow(props) {
  const {title, buyPrice, price, quantity, buyFee, sellFee, wallet, profit, gain, val} = props.data;
  const {isLoading, errorText, fiat} = props;

  return (
    <div style={ {display: 'flex'} }>
      <div style={ {position: 'relative', width: 60} }>
        <div style={ {position: 'absolute', left: -10} }>{ errorText }{ isLoading && '*' }</div>
        { title }
      </div>
      <div style={ {width: 140, textAlign: 'right'} }>{ quantity.toFixed(8) }</div>
      <div style={ {width: 140, textAlign: 'right'} }>{ fiat === 'btc' ? buyPrice.toFixed(8) : buyPrice.toFixed(2) }</div>
      <div style={ {width: 140, textAlign: 'right'} }>{ fiat === 'btc' ? price.toFixed(8) : price.toFixed(2) }</div>
      <div style={ {width: 140, textAlign: 'right'} }>{ fiat === 'btc' ? profit.toFixed(8) : profit.toFixed(2) }</div>
      <div style={ {width: 140, textAlign: 'right'} }>{ gain.toFixed(2) }</div>
      <div style={ {width: 140, textAlign: 'right'} }>{ fiat === 'btc' ? val.toFixed(8) : val.toFixed(2) }</div>
      <div style={ {width: 140, padding: '0 10px'} }>{ wallet }</div>
      <div>{ (buyFee || sellFee) && `${ buyFee } / ${ sellFee }` }</div>
    </div>
  );
}