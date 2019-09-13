import React, { useContext, useEffect } from 'react';
import { StoreContext } from '../../context';

import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Collapse from '@material-ui/core/Collapse';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';

import TableHead from '../TableHead';
import TableRow from '../TableRow';
import { groupOpenToggle } from '../../context/actions';

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    border: '1px solid #ccc',
    // paddingBottom: '1px'
    // padding: theme
    // maxWidth: 360,
  },
  row: {
    borderTop: '1px solid #eee',
    padding: 0,
    '&:hover': {
      backgroundColor: '#fafafa',
    },
    // marginBottom: '-1px'
  },
  toggle: {
    borderTop: '1px solid #eee',
    cursor: 'pointer',
    padding: 0,
    transition: 'background-color 0.12s',
    '&:hover': {
      backgroundColor: '#eee',
    },
  },
  nested: {
    backgroundColor: '#fcfcfc',
    borderTop: '1px solid #eee',
    padding: 0,
    '&:hover': {
      backgroundColor: '#fafafa',
    },
  },
  // collapse: {
  // borderTop: '1px solid #eee',
  // marginTop: '-1px'
  // }
}));

const colWidth = {
  col1: 60,
  col2: 140,
  col3: 140,
  col4: 140,
  col5: 140,
  col6: 140,
  col7: 140,
  col8: 140,
  col9: 140
};

export default function Table() {
  const {state, dispatch} = useContext(StoreContext);

  const classes = useStyles();

  const Row = (item, hideMore) => {
    return (
      <TableRow
        data={ item }
        fiat={ state.fiat }
        isLoading={ state.market.isLoading }
        errorText={ state.market.error }
        colWidth={ colWidth }
        hideMore={ hideMore }
      />
    );
  };

  useEffect(() => {
    if (state.groupOpenAll) {
      dispatch(groupOpenToggle(
        state.tableData
          .filter(item => item.group ? item.title : null)
          .map(i => i.title)
      ));
    } else {
      dispatch(groupOpenToggle([]));
    }
  }, [state.groupOpenAll, dispatch, state.tableData]);

  return (
    <>
      <List component="div" className={ classes.root } disablePadding>

        <TableHead colWidth={ colWidth } />

        { state.tableData.map(item => {
          return !item.group
                 ? <ListItem
                   component="div"
                   key={ item.title }
                   className={ classes.row }
                 >
                   { Row(item) }
                 </ListItem>
                 : <React.Fragment key={ item.title }>
                   <ListItem
                     component="div"
                     className={ classes.toggle }
                     onClick={ () => dispatch(groupOpenToggle(item.title)) }
                   >
                     { Row(item, true) }
                     { !!state.groupOpen.find(title => title === item.title) ? <ExpandLess /> : <ExpandMore /> }
                   </ListItem>

                   <Collapse
                     in={ !!state.groupOpen.find(title => title === item.title) }
                     timeout="auto"
                     unmountOnExit
                     className={ classes.collapse }
                   >
                     <List component="div" disablePadding>
                       { item.group.map((i, idx) => (
                           <ListItem
                             component="div"
                             className={ classes.nested }
                             key={ `${ item.title }_${ idx }` }
                           >
                             { Row(i) }
                           </ListItem>
                         )
                       ) }
                     </List>
                   </Collapse>
                 </React.Fragment>;
        }) }
      </List>
    </>
  );
}