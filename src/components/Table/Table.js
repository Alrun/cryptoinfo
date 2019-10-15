import React, { useContext, useEffect } from 'react';
import { StoreContext } from '../../context';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Collapse from '@material-ui/core/Collapse';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import CircularProgress from '@material-ui/core/CircularProgress';
import TableHeader from '../TableHeader';
import TableRow from '../TableRow';
import { groupOpenToggle } from '../../context/actions';
import Box from '@material-ui/core/Box';

const colWidth = {
  col1: 85,
  col2: 145,
  col3: 130,
  col4: 130,
  col5: 130,
  col6: 100,
  col7: 130,
  col8: 130,
  col9: 50
};

const useStyles = makeStyles(theme => ({
  wrap: {
    display: 'flex',
    overflow: 'auto',
    border: '1px solid #ccc',
  },
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    flexGrow: 1,
    minHeight: 59.5
  },
  initRow: {
    borderTop: '1px solid #eee',
    padding: 0,
    overflow: 'hidden',
    justifyContent: 'center'
  },
  row: {
    borderTop: '1px solid #eee',
    padding: 0,
    '&:hover': {
      backgroundColor: '#fafafa',
    },
  },
  toggle: {
    borderTop: '1px solid #eee',
    cursor: 'pointer',
    padding: 0,
    transition: 'background-color 0.12s',
    '&:hover': {
      backgroundColor: '#ebebeb',
    },
  },
  toggleActive: {
    backgroundColor: '#dbdbdb',
    '&:hover': {
      backgroundColor: '#dbdbdb',
    },
  },
  nested: {
    backgroundColor: '#f5f5f5',
    borderTop: '1px solid #eee',
    padding: 0,
    '&:hover': {
      backgroundColor: '#f0f0f0',
    },
  },
  collapse: {
    width: '100%'
  },
  progress: {
    margin: theme.spacing(2),
    color: '#ccc'
  },
}));

export default function Table() {
  const {state, dispatch} = useContext(StoreContext);
  const classes = useStyles();

  const Row = (item, group) => {
    return (
      <TableRow
        data={ item }
        fiat={ state.fiat }
        fiatSymbol={ state.fiatSymbol }
        isLoading={ state.market.isLoading }
        errorText={ state.market.error }
        colWidth={ colWidth }
        group={ group }
        showPercent={state.showPercent}
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
      <Box className={ classes.wrap }>
        <List component="div" className={ classes.root } disablePadding>

          <TableHeader colWidth={ colWidth } />

          { state.spreadsheet.isLoading
            ? <ListItem
              component="div"
              key="init"
              className={ classes.initRow }
            >
              <CircularProgress
                className={ classes.progress }
                size={ 30 }
              />
            </ListItem>
            : state.spreadsheet.error
              ? <Box m={ 1 } color="red">{ state.spreadsheet.error }</Box>
              : state.tableData.map(item => (
                !item.group
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
                    className={
                      !state.groupOpen.find(title => title === item.title)
                      ? classes.toggle
                      : `${ classes.toggle } ${ classes.toggleActive }`
                    }
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
                </React.Fragment>
              )) }

        </List>
      </Box>
    </>
  );
}