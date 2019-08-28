import React, { useContext, useEffect, useCallback } from 'react';
import axios from 'axios';
import { StoreContext } from '../../context';
import {sorting} from '../../utilites'

import {
  spreadsheetFetchSuccess,
  spreadsheetLoading,
  spreadsheetError,
  marketFetchSuccess,
  marketLoading,
  marketError,
  setTableData,
  setCurrency
} from '../../context/actions';

import Table from '../Table';

const SPREADSHEET_ADDRESS = '1paG7wL-ZRiAHvU6QcvtISVX2ROP8NTcvslQETh8ZdRQ';
const MARKET_KEY = 'DX8Js7mGTjkscOevUm0IpubG0nMWuO';

export default function TableContainer() {
  const {state, dispatch} = useContext(StoreContext);

  const getSpreadsheetData = useCallback(() => {
    const schemaSpreadsheet = data => data.map(item => ({
      title: item.gsx$title.$t.toUpperCase(),
      buyPrice: parseFloat(item.gsx$price.$t.replace(',', '.')),
      quantity: parseFloat(item.gsx$quantity.$t.replace(',', '.')),
      buyFee: parseFloat(item.gsx$buyfee.$t.replace(',', '.')),
      sellFee: parseFloat(item.gsx$sellfee.$t.replace(',', '.')),
      wallet: item.gsx$wallet.$t
    }));

    (async () => {
      dispatch(spreadsheetLoading(true));

      try {
        const response = await axios.get(`https://spreadsheets.google.com/feeds/list/${ SPREADSHEET_ADDRESS }/od6/public/values?alt=json`);
        const spreadsheetData = schemaSpreadsheet(response.data.feed.entry);

        dispatch(spreadsheetFetchSuccess(spreadsheetData));
      } catch (err) {
        spreadsheetError(err);
        console.error(err);
      }

      dispatch(spreadsheetLoading(false));
    })();
  }, [dispatch]);

  const getMarketData = useCallback((currency = 'usd', coins = []) => {
    const coinListWODouble = coins.reduce((acc, curr) => {
      if (!acc.includes(curr)) {
        acc.push(curr);
      }
      return acc;
    }, []);

    const coinList = coinListWODouble.reduce((acc, curr) => {
      if (curr.toLowerCase() !== 'btc' && curr.toLowerCase() !== 'usdt') {
        acc += `-${ curr.toLowerCase() }btc`;
      }
      return acc;
    }, 'btcbtc-usdtbtc');

    const schemaMarket = data => data.map(item => ({
      title: item.Name,
      label: item.Label,
      price: item.Price,
      timestamp: item.Timestamp
    }));

    (async () => {
      dispatch(marketLoading(true));

      try {
        const response = await axios.get(`https://www.worldcoinindex.com/apiservice/ticker?key=${ MARKET_KEY }&label=${ coinList }&fiat=${ currency }`);
        const marketData = schemaMarket(response.data.Markets);

        dispatch(marketFetchSuccess(marketData));
      } catch (err) {
        marketError(err);
        console.error(err);
      }

      dispatch(marketLoading(false));
    })();
  }, [dispatch]);

  useEffect(() => {
    getSpreadsheetData();
  }, [getSpreadsheetData]);

  useEffect(() => {
    if (!!state.spreadsheet.data.length) {
      const coinsFromSpreadsheet = state.spreadsheet.data.map(item => item.title);

      getMarketData(state.currency, coinsFromSpreadsheet);
    }
  }, [
    state.spreadsheet.data.length,
    state.spreadsheet.data,
    getMarketData,
    state.currency
  ]);

  const compileTableData = useCallback((spreadsheet, market) => {
    const rawData = spreadsheet.map(item => {
      const coinPriceData = market.filter(i => i.label.match(/.*(?=\/)/).join().toLowerCase() === item.title.toLowerCase())[0];

      return {
        ...item,
        price: coinPriceData.price
      };
    });

    const currencyListWCount = rawData.reduce(function (acc, cur) {
      if (!acc[cur.title]) {
        acc[cur.title] = 1;
      } else {
        acc[cur.title]++;
      }
      return acc;
    }, {});

    let tableArr = [];

    for (let key in currencyListWCount) {
      if (currencyListWCount.hasOwnProperty(key)) {
        if (currencyListWCount[key] > 1) {
          let groupArr = [];
          let sum = {
            buyPrice: 0,
            quantity: 0
          };

          rawData.forEach(item => {
            if (item.title === key) {
              groupArr.push(item);
              sum.buyPrice += item.buyPrice;
              sum.quantity += item.quantity;
              sum.feeBuy += item.feeBuy;
              sum.feeSell += item.feeSell;
              // console.log(dateToTimestamp(item.date));
            }
          });

          const walletList = groupArr.reduce((acc, curr) => {
            if (!acc.includes(curr.wallet)) {
              acc.push(curr.wallet);
            }
            return acc;
          }, []);

          tableArr.push({
            title: key,
            buyPrice: sum.buyPrice / currencyListWCount[key],
            quantity: sum.quantity,
            price: market.filter(i => i.label.match(/.*(?=\/)/).join().toLowerCase() === key.toLowerCase())[0].price,
            wallet: walletList,
            group: sorting(groupArr, state.sortBy, state.sortDesc)
          });
        } else {
          rawData.forEach(item => {
            if (item.title === key) {
              tableArr.push(item);
            }
          });
        }
      }
    }

    dispatch(setTableData(sorting(tableArr, state.sortBy, state.sortDesc)));
  }, [dispatch, state.sortBy, state.sortDesc]);

  useEffect(() => {
    if (!!state.spreadsheet.data.length && !!state.market.data.length) {
      compileTableData(state.spreadsheet.data, state.market.data);
    }
  }, [
    state.spreadsheet.data,
    state.market.data,
    compileTableData,
    state.spreadsheet.data.length,
    state.market.data.length
  ]);

  if (state.spreadsheet.isLoading) {
    return (<div>Loading...</div>);
  }

  if (state.spreadsheet.error) {
    return (<div>{ state.table.error }</div>);
  }

  return (
    <div>
      <Table />

      { <button onClick={ () => dispatch(setCurrency('rur')) }>Set Currency</button> }
    </div>
  );
}


// function dateToTimestamp(str) {
//   return Date.parse(str
//     .replace(/(\d{2}).(\d{2}).(\d{4})/, '$3-$2-$1')
//     .replace(/\s/, 'T'));
// }