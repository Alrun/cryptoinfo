import React, { useContext } from 'react';
import { StoreContext } from '../../context';
import { sortItems } from '../../context/actions';
import Box from '@material-ui/core/Box';
import ArrowRightAltIcon from '@material-ui/icons/ArrowRightAlt';
import { makeStyles } from '@material-ui/core/styles';

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

const useStyles = makeStyles(theme => ({
  root: {
    borderBottom: '1px solid #ccc',
    // marginBottom: '-1px'
    // width: '100%',
    // maxWidth: 360,
    // backgroundColor: theme.palette.background.paper,
  },
  row: {
    display: 'flex',
    padding: theme.spacing(1),
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2),
  },
  sort: {

  },
  arrowTop: {
    transform: 'rotate(-90deg)'
  },
  arrowBottom: {
    transform: 'rotate(90deg)'
  },
  // toggle: {
  //   // border: '1px solid #999',
  // },
  // nested: {
  //   backgroundColor: '#f9f9f9'
  //   // paddingLeft: theme.spacing(4),
  // }
}));

export default function TableHead(props) {
  const {state, dispatch} = useContext(StoreContext);
  const {colWidth} = props;
  const classes = useStyles();

  return (
    <Box display="flex" className={ classes.root }>
      { head.map((item, idx) => (
        <Box
          style={ {width: colWidth[Object.keys(colWidth)[idx]], textAlign: !!idx && idx !== 7 ? 'right' : ''} }
          key={ item.title }
          onClick={ () => dispatch(sortItems(item.id)) }
          className={ classes.row }
        >
          { item.title }
          { state.sortBy === item.id
          && <div className={ classes.sort }>
            { state.sortDesc
              ? <ArrowRightAltIcon className={ classes.arrowTop }/>
              : <ArrowRightAltIcon className={ classes.arrowBottom }/> }
          </div> }

        </Box>
      )) }
    </Box>
  );
}