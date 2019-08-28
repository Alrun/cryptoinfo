import React from 'react';

export default function TableRow(props) {
  const {title, buyPrice, price, quantity, buyFee, sellFee, wallet} = props.data;

  return (
    <div style={{display: 'flex'}}>
      <div style={{width: 120}}>{title}</div>
      <div style={{width: 120}}>{quantity}</div>
      <div style={{width: 120}}>{buyPrice}</div>
      <div style={{width: 120}}>{price}</div>
      <div style={{width: 120}}>{title}</div>
      <div style={{width: 120}}>{title}</div>
      <div style={{width: 120}}>{title}</div>
      <div style={{width: 120}}>{Array.isArray(wallet) ? wallet.join(', ') : wallet}</div>
      <div>{buyFee} / {sellFee}</div>
    </div>
  )
}