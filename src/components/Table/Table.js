import React, { useContext, useEffect, useCallback } from 'react';
import { StoreContext } from '../../context';

import TableHead from '../TableHead';
import TableRow from '../TableRow';

export default function Table(props) {
  const {state, dispatch} = useContext(StoreContext);

  return (
    <div>

      <TableHead />

      { state.tableData.map(item => {
        if (!item.group) {
          return (<TableRow data={ item } key={Math.random()} />);
        } else {
          return (
            <div key={Math.random()}>
              <TableRow data={ item } />
              <div>
                { item.group.map(i => {
                  return (<TableRow data={ i } key={Math.random()} />);
                }) }
              </div>
            </div>
          );
        }
      }) }

    </div>
  );
}