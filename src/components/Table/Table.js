import React, { useContext } from 'react';
import { StoreContext } from '../../context';

import TableHead from '../TableHead';
import TableRow from '../TableRow';

export default function Table(props) {
  const {state, dispatch} = useContext(StoreContext);

  const Row = item => {
    return (<TableRow
      data={ item }
      fiat={state.fiat}
      isLoading={ state.market.isLoading }
      errorText={ state.market.error }
    />);
  };

  return (
    <div>

      <TableHead />

      { state.tableData.map(item => {
        if (!item.group) {
          return (
            <div key={ Math.random() }>
              { Row(item) }
            </div>);
        } else {
          return (
            <div key={ Math.random() }>
              { Row(item) }
              <div>
                { item.group.map(i => {
                  return (
                    <div key={ Math.random() }>
                      { Row(i) }
                    </div>
                  );
                }) }
              </div>
            </div>
          );
        }
      }) }

    </div>
  );
}