import React, { useContext } from 'react';
import { StoreContext } from '../../context';
import { sortItems } from '../../context/actions';

const head = [
  {id: 'title', title: 'Coin'},
  {id: 'quantity', title: 'Quantity'},
  {id: 'buyPrice', title: 'Buy Price'},
  {id: 'price', title: 'Current Price'},
  {id: 'profit', title: 'Profit'},
  {id: 'gain', title: 'Gain'},
  {id: 'val', title: 'Value'},
  {id: 'wallet', title: 'Wallet'},
];

export default function TableHead(props) {
  const {state, dispatch} = useContext(StoreContext);

  return (
    <div style={ {display: 'flex', padding: '10px 0'} }>
      { head.map((item, idx) => (
        <div
          style={ {width: !idx ? 60 : 140, fontWeight: 'bold', textAlign: !!idx && idx!==7 ? 'right' : ''} }
          key={ Math.random() }
          onClick={ () => dispatch(sortItems(item.id)) }
        >
          { item.title }
          { state.sortBy === item.id
          && <div style={ {display: 'inline-block', marginLeft: 5} }>
            { state.sortDesc
              ? '↓'
              : '↑' }
          </div> }

        </div>
      )) }
    </div>
  );
}