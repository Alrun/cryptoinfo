import React, { useContext, useEffect, useCallback } from 'react';
import axios from 'axios';
import { StoreContext } from '../../context';
import { sortStr } from '../../utils';
import Table from '../Table';
import {
  spreadsheetFetchSuccess,
  spreadsheetLoading,
  spreadsheetError,
  marketFetchSuccess,
  marketLoading,
  marketError,
  setTableData,
  groupOpenAll
} from '../../context/actions';
import Grid from '@material-ui/core/Grid';
import Switch from '../Switch/Switch';

export const DEMO_SPREADSHEET = '1paG7wL-ZRiAHvU6QcvtISVX2ROP8NTcvslQETh8ZdRQ';
const DEMO_KEY = 'DX8Js7mGTjkscOevUm0IpubG0nMWuO';

export default function TableContainer() {
  const {state, dispatch} = useContext(StoreContext);

  const handleGroupToggle = () => () => {
    dispatch(groupOpenAll(!state.groupOpenAll));
    localStorage.groupOpenAll = !state.groupOpenAll;
  };

  const getSpreadsheetData = useCallback((link) => {
    const schemaSpreadsheet = data => data.map(item => ({
      title: item.gsx$title.$t.toUpperCase(),
      buyPrice: parseFloat(item.gsx$price.$t.replace(',', '.')),
      quantity: parseFloat(item.gsx$quantity.$t.replace(/\s+/g, '').replace(',', '.')),
      buyFee: parseFloat(item.gsx$buyfee.$t.replace(',', '.')),
      sellFee: parseFloat(item.gsx$sellfee.$t.replace(',', '.')),
      wallet: item.gsx$wallet.$t
    }));

    (async () => {
      dispatch(spreadsheetLoading(true));

      try {
        const response = await axios.get(`https://spreadsheets.google.com/feeds/list/${ link }/od6/public/values?alt=json`);
        const spreadsheetData = schemaSpreadsheet(response.data.feed.entry);

        dispatch(spreadsheetFetchSuccess(spreadsheetData));

        if (link !== DEMO_SPREADSHEET) localStorage.spreadSheetLink = link;
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
        const response = await axios.get(`https://www.worldcoinindex.com/apiservice/ticker?key=${ DEMO_KEY }&label=${ coinList }&fiat=${ fiat }`);

        if (!!response.data.Markets) {
          const dataWODeadCoins = response.data.Markets.filter(item => item.Name !== 'Harvestmasternode');

          dispatch(marketFetchSuccess(schemaMarket(dataWODeadCoins)));
        } else {
          dispatch(marketFetchSuccess(
            coinList.split('-').map(item => (
              {
                title: '',
                label: item.replace(/(btc)$/, '/$1').toUpperCase(),
                price: 0
              }
            ))
          ));

          dispatch(marketError(response.data.error));
        }
      } catch (err) {
        dispatch(marketError(err));
        console.error(err);
      }

      dispatch(marketLoading(false));
    })();
  }, [dispatch]);

  const compileTableData = useCallback((spreadsheet, market) => {
    const rawData = spreadsheet.map(item => {
      const coinPriceData = market.filter(i => i.label.match(/.*(?=\/)/).join().toLowerCase() === item.title.toLowerCase()).length
                            ? market.filter(i => i.label.match(/.*(?=\/)/).join().toLowerCase() === item.title.toLowerCase())[0]
                            : 0;

      return {
        ...item,
        price: coinPriceData.price,
        label: coinPriceData.title
      };
    });

    const rawDataExtended = rawData.map(item => {
      const calcProfit = (priceSell, priceBuy, quantity, buyFee, sellFee) => {
        return (priceSell * quantity - priceSell * quantity / 100 * sellFee) - (priceBuy * quantity + priceBuy * quantity / 100 * buyFee);
      };

      const calcGain = (priceSell, priceBuy, quantity, buyFee, sellFee) => {
        return (calcProfit(priceSell, priceBuy, quantity, buyFee, sellFee)) * 100 / (priceSell * quantity);
      };

      return {
        ...item,
        quantity: item.quantity || 0,
        buyPrice: state.fiat === 'btc'
                  ? item.title.toLowerCase() === 'btc'
                    ? !!state.market.priceBtc ? item.buyPrice / state.market.priceBtc : 1
                    : item.buyPrice
                  : item.title.toLowerCase() === 'btc'
                    ? !!state.market.priceBtc ? item.buyPrice * state.market.priceUsdt : NaN
                    : !!state.market.priceBtc ? item.buyPrice * state.market.priceBtc : NaN,
        price: state.fiat === 'btc'
               ? !!state.market.priceBtc ? item.price / state.market.priceBtc : NaN
               : !!state.market.priceBtc ? item.price : NaN,
        profit: state.market.priceBtc
                ? state.fiat === 'btc'
                  ? item.title.toLowerCase() === 'btc'
                    ? calcProfit(item.price / state.market.priceBtc, item.buyPrice / state.market.priceBtc, item.quantity, item.buyFee, item.sellFee)
                    : calcProfit(item.price / state.market.priceBtc, item.buyPrice, item.quantity, item.buyFee, item.sellFee)
                  : item.title.toLowerCase() === 'btc'
                    ? calcProfit(item.price, item.buyPrice * state.market.priceUsdt, item.quantity, item.buyFee, item.sellFee)
                    : calcProfit(item.price, item.buyPrice * state.market.priceBtc, item.quantity, item.buyFee, item.sellFee)
                : NaN,
        gain: state.fiat === 'btc'
              ? item.title.toLowerCase() === 'btc'
                ? calcGain(item.price / state.market.priceBtc, item.buyPrice / state.market.priceBtc, item.quantity, item.buyFee, item.sellFee)
                : calcGain(item.price / state.market.priceBtc, item.buyPrice, item.quantity, item.buyFee, item.sellFee)
              : item.title.toLowerCase() === 'btc'
                ? calcGain(item.price, item.buyPrice * state.market.priceUsdt, item.quantity, item.buyFee, item.sellFee)
                : calcGain(item.price, item.buyPrice * state.market.priceBtc, item.quantity, item.buyFee, item.sellFee),
        val: state.market.priceBtc
             ? state.fiat === 'btc'
               ? item.price / state.market.priceBtc * item.quantity
               : item.price * item.quantity
             : NaN
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
          let groupLabel = '';
          let sum = {
            quantity: 0,
            buyPrice: 0,
            val: 0,
            profit: 0,
            gain: 0
          };

          rawDataExtended.forEach(item => {
            if (item.title === key) {
              groupLabel = item.label;
              groupArr.push(item);
              sum.buyPrice += (item.buyPrice || 0) * item.quantity;
              sum.quantity += item.quantity;
              sum.profit += item.profit || 0;
              sum.gain += item.gain * item.quantity || 0;
              sum.val += item.val || 0;
              sum.feeBuy += item.feeBuy || 0;
              sum.feeSell += item.feeSell || 0;
            }
          });

          let walletList = groupArr.reduce((acc, curr) => {
            if (!acc.includes(curr.wallet) && curr.wallet) {
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
            label: groupLabel,
            buyPrice: sum.buyPrice / sum.quantity,
            quantity: sum.quantity,
            val: sum.val,
            price: !!state.market.priceBtc
                   ? state.fiat === 'btc'
                     ? market.filter(i => i.label.match(/.*(?=\/)/).join().toLowerCase() === key.toLowerCase())[0].price / state.market.priceBtc
                     : market.filter(i => i.label.match(/.*(?=\/)/).join().toLowerCase() === key.toLowerCase())[0].price
                   : NaN,
            profit: sum.profit,
            gain: sum.profit * 100 / sum.val,
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
    if (!state.spreadsheet.link) {
      if (!localStorage.spreadSheetLink) {
        getSpreadsheetData(DEMO_SPREADSHEET);
      } else {
        getSpreadsheetData(localStorage.spreadSheetLink);
      }
    } else {
      getSpreadsheetData(state.spreadsheet.link);
    }
  }, [state.spreadsheet.link, getSpreadsheetData]);

  useEffect(() => {
    if (state.spreadsheet.data.length) {
      const coinsFromSpreadsheet = state.spreadsheet.data.map(item => item.title);
      getMarketData(state.fiat, coinsFromSpreadsheet);
    }
  }, [
    state.spreadsheet.data.length,
    state.spreadsheet.data,
    getMarketData,
    state.fiat
  ]);

  useEffect(() => {
    if (state.spreadsheet.data.length && state.market.data.length) {
      const ssList = [ ...new Set([...state.spreadsheet.data.map(item => item.title), 'USDT', 'BTC'])];
      const mList = state.market.data.reduce((acc, cur) => {
        if (!acc.includes(cur.label.match(/.*(?=\/)/).join())) {
          acc.push(cur.label.match(/.*(?=\/)/).join());
        }
        return acc;
      }, ['USDT', 'BTC']);

      if (mList.length === ssList.length) {
        compileTableData(state.spreadsheet.data, state.market.data);
      } else {
        console.error(`mList {${mList.length}} !== ssList {${ssList.length}}`)
      }
    }
  }, [
    state.spreadsheet.data,
    state.market.data,
    compileTableData,
    state.spreadsheet.data.length,
    state.market.data.length
  ]);

  return (
    <>
      <Grid container alignItems="flex-end">
        <Grid item xs="auto">
          <Switch
            checked={state.groupOpenAll}
            label="Expand all"
            handleChange={handleGroupToggle}
          />
        </Grid>
      </Grid>
      <Grid item xs={12}>
        <Table />
      </Grid>
    </>
  );
}