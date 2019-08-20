import React from 'react';

import {raw} from '../../data';

const head = [
  {id: 0, title: 'Currency'},
  {id: 1, title: 'Quantity'},
  {id: 2, title: 'Buy Price'},
  {id: 3, title: 'Buy Fee'},
  {id: 4, title: 'Sell Fee'},
  // {id: 5, title: 'Amount'},
];

// const raw = [
//     {title: 'BTC', price: 1, quantity: 10, fee: {buy: 0.01, sell: 0.01}},
//     {title: 'ETC', price: 1, quantity: 20, fee: {buy: 0.01, sell: 0.01}},
//     {title: 'BTC', price: 1, quantity: 5, fee: {buy: 0.01, sell: 0.01}},
//     {title: 'LTC', price: 1, quantity: 300, fee: {buy: 0.01, sell: 0.01}},
//   ];

function formatRawData(data) {
  return data.map(item => {
    return {
      title: item.gsx$title.$t,
      price: item.gsx$price.$t,
      quantity: item.gsx$quantity.$t,
      fee: {
        buy: item.gsx$buyfee.$t,
        sell: item.gsx$buyfee.$t
      }
    }
  });
}

function collectRowData(data) {

  let row = data.map(item => {
    return item;
  });

  console.log(row);
}

async function getData() {

  let response = new Promise((resolve, reject) => {
    setTimeout(() => resolve( raw.feed.entry ), 500)
  });

  let data = await response;

  let row = await formatRawData(data);
  return collectRowData(row);
}

getData();

// console.log(formatRawData());

export default function Table() {

  return (
    <div>
      {/*{raw.map(item => {*/}
      {/*  return (<div>{item.title}</div>)*/}

      {/*})}*/}
    </div>
  );
}