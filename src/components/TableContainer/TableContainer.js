import React, { useContext, useEffect, useCallback } from 'react';
import axios from 'axios';
import { StoreContext } from '../../context';

import {
  spreadsheetFetchSuccess,
  spreadsheetLoading,
  spreadsheetError,
  marketFetchSuccess,
  marketLoading,
  marketError,
  setTableData
} from '../../context/actions';
import { sortStr } from '../../utilites';

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
        dispatch(spreadsheetError(err.message));
        console.error(err.message);
      }

      dispatch(spreadsheetLoading(false));
    })();
  }, [dispatch]);

  const getMarketData = useCallback((currency, coins = []) => {
    const fiat = currency === 'btc' ? 'usdt' : currency;
    const coinListWODouble = coins.reduce((acc, cur) => {
      if (!acc.includes(cur)) {
        acc.push(cur);
      }
      return acc;
    }, []);

    const coinList = coinListWODouble.reduce((acc, cur) => {
      if (cur.toLowerCase() !== 'btc' && cur.toLowerCase() !== 'usdt') {
        acc += `-${ cur.toLowerCase() }btc`;
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
        const response = await axios.get(`https://www.worldcoinindex.com/apiservice/ticker?key=${ MARKET_KEY }&label=${ coinList }&fiat=${ fiat }`);
        const marketData = schemaMarket(response.data.Markets);

        dispatch(marketFetchSuccess(marketData));
      } catch (err) {
        dispatch(marketError(err));
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
      getMarketData(state.fiat, coinsFromSpreadsheet);
    }
  }, [
    state.spreadsheet.data.length,
    state.spreadsheet.data,
    getMarketData,
    state.fiat
  ]);

  const compileTableData = useCallback((spreadsheet, market) => {
    const rawData = spreadsheet.map(item => {
      const coinPriceData = market.filter(i => i.label.match(/.*(?=\/)/).join().toLowerCase() === item.title.toLowerCase())[0];

      return {
        ...item,
        price: coinPriceData.price,
        label: coinPriceData.title
      };
    });

    const rawDataExtended = rawData.map(item => {
      const calcProfit = (priceSell, priceBuy, quantity, buyFee, sellFee) => {
        return priceSell * quantity - priceBuy * quantity - (quantity / 100 * buyFee + quantity) / 100 * buyFee * priceBuy - quantity / 100 * sellFee * priceSell;
      };

      const calcGain = (priceSell, priceBuy, quantity) => {
        return (priceSell * quantity - priceBuy * quantity) * 100 / (priceBuy * quantity);
      };

      return {
        ...item,
        buyPrice: state.fiat === 'btc'
                  ? item.title.toLowerCase() === 'btc'
                    ? item.buyPrice / state.market.priceBtc
                    : item.buyPrice
                  : item.title.toLowerCase() === 'btc'
                    ? item.buyPrice * state.market.priceUsdt
                    : item.buyPrice * state.market.priceBtc,
        price: state.fiat === 'btc'
               ? item.title.toLowerCase() === 'btc'
                 ? 1
                 : item.price / state.market.priceBtc
               : item.price,
        profit: state.fiat === 'btc'
                ? item.title.toLowerCase() === 'btc'
                  ? calcProfit(item.price / state.market.priceBtc, item.buyPrice / state.market.priceBtc, item.quantity, item.buyFee, item.sellFee)
                  : calcProfit(item.price / state.market.priceBtc, item.buyPrice, item.quantity, item.buyFee, item.sellFee)
                : item.title.toLowerCase() === 'btc'
                  ? calcProfit(item.price, item.buyPrice * state.market.priceUsdt, item.quantity, item.buyFee, item.sellFee)
                  : calcProfit(item.price, item.buyPrice * state.market.priceBtc, item.quantity, item.buyFee, item.sellFee),
        gain: state.fiat === 'btc'
              ? item.title.toLowerCase() === 'btc'
                ? calcGain(item.price / state.market.priceBtc, item.buyPrice / state.market.priceBtc, item.quantity)
                : calcGain(item.price / state.market.priceBtc, item.buyPrice, item.quantity)
              : item.title.toLowerCase() === 'btc'
                ? calcGain(item.price, item.buyPrice * state.market.priceUsdt, item.quantity)
                : calcGain(item.price, item.buyPrice * state.market.priceBtc, item.quantity),
        val: state.fiat === 'btc'
             ? item.price / state.market.priceBtc * item.quantity
             : item.price * item.quantity
      };
    });

    const currencyListWCount = rawDataExtended.reduce((acc, cur) => {
      if (!acc[cur.title]) {
        acc[cur.title] = 1;
      } else {
        acc[cur.title]++;
      }
      return acc;
    }, {});

    let tableArr = [];

    const sortTableRows = (arr = [], sortBy, reverse) => {
      const sortedArr = arr.sort((a, b) => {
        if (typeof a[sortBy] === 'string' && typeof b[sortBy] === 'string') {
          return sortStr(a[sortBy], b[sortBy]);
        }
        if (typeof a[sortBy] === 'number' && typeof b[sortBy] === 'number') {
          return a[sortBy] - b[sortBy];
        }
        return console.error(`Not valid format data ${ a } or ${ b } for sortTableRows!`);
      });
      return reverse ? sortedArr.reverse() : sortedArr;
    };

    for (let key in currencyListWCount) {
      if (currencyListWCount.hasOwnProperty(key)) {
        if (currencyListWCount[key] > 1) {
          let groupArr = [];
          let sum = {
            quantity: 0,
            buyPrice: 0,
            val: 0,
            profit: 0,
            gain: 0
          };

          rawDataExtended.forEach(item => {
            if (item.title === key) {
              groupArr.push(item);
              sum.buyPrice += item.buyPrice * item.quantity;
              sum.quantity += item.quantity;
              sum.feeBuy += item.feeBuy;
              sum.feeSell += item.feeSell;
              sum.val += item.val;
              sum.profit += item.profit;
              sum.gain += item.gain * item.quantity;
            }
          });

          let walletList = groupArr.reduce((acc, curr) => {
            if (!acc.includes(curr.wallet)) {
              acc.push(curr.wallet);
            }
            return acc;
          }, []);

          if (state.sortBy === 'wallet') {
            walletList.sort((a, b) => {
              return sortStr(a, b);
            });

            if (state.sortDesc) walletList.reverse();
          }

          tableArr.push({
            title: key,
            buyPrice: sum.buyPrice / sum.quantity,
            quantity: sum.quantity,
            val: sum.val,
            price: state.fiat === 'btc'
                   ? market.filter(i => i.label.match(/.*(?=\/)/).join().toLowerCase() === key.toLowerCase())[0].price / state.market.priceBtc
                   : market.filter(i => i.label.match(/.*(?=\/)/).join().toLowerCase() === key.toLowerCase())[0].price,
            profit: sum.profit,
            gain: sum.gain / sum.quantity,
            wallet: walletList.join(', '),
            group: sortTableRows(groupArr, state.sortBy, state.sortDesc)
          });
        } else {
          rawDataExtended.forEach(item => {
            if (item.title === key) {
              tableArr.push(item);
            }
          });
        }
      }
    }

    dispatch(setTableData(sortTableRows(tableArr, state.sortBy, state.sortDesc)));
  }, [
    dispatch,
    state.sortBy,
    state.sortDesc,
    state.fiat,
    state.market
  ]);

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
    return (<div>{ state.spreadsheet.error }</div>);
  }

  return (
    <Table />
  );
}


// function dateToTimestamp(str) {
//   return Date.parse(str
//     .replace(/(\d{2}).(\d{2}).(\d{4})/, '$3-$2-$1')
//     .replace(/\s/, 'T'));
// }