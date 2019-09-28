import React, { useContext } from 'react';
import { StoreContext } from '../../context';
import { sortItems } from '../../context/actions';
import Box from '@material-ui/core/Box';
import ArrowRightAltIcon from '@material-ui/icons/ArrowRightAlt';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

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
    alignSelf: 'start',
    width: '100%',
  },
  col: {
    flexShrink: 0,
    padding: '3px 10px',
    textAlign: 'right',
    justifyContent: 'flex-end',
    borderRadius: 0,
    textTransform: 'none',
    '&:hover': {
      backgroundColor: '#ebebeb'
    }
  },
  sort: {
    verticalAlign: 'middle'
  },
  arrow: {
    marginBottom: '-5px'
  },
  arrowTop: {
    transform: 'rotate(-90deg)'
  },
  arrowBottom: {
    transform: 'rotate(90deg)'
  },
  col1: {
    justifyContent: 'flex-start'
  },
  col8: {
    justifyContent: 'flex-start',
    flexGrow: 1
  },

  // toggle: {
  //   // border: '1px solid #999',
  // },
  // nested: {
  //   backgroundColor: '#f9f9f9'
  //   // paddingLeft: theme.spacing(4),
  // }
}));

export default function TableHeader(props) {
  const {state, dispatch} = useContext(StoreContext);
  const {colWidth} = props;
  const classes = useStyles();

  return (
    <Box display="flex" className={ classes.root }>
      { head.map((item, idx) => (
        <Button
          component="div"
          style={ {width: colWidth[Object.keys(colWidth)[idx]], backgroundColor: state.sortBy === item.id ? '#dbdbdb' : ''} }
          key={ item.title }
          onClick={ () => dispatch(sortItems(item.id)) }
          className={ classes[`col${ ++idx }`] ? `${ classes.col } ${ classes[`col${ idx }`] }` : classes.col }
          children={
            <>
              { item.title }
              {
                state.sortBy === item.id
                && <span className={ classes.sort }>
                {
                  state.sortDesc
                  ? <ArrowRightAltIcon
                    fontSize="small"
                    className={ `${ classes.arrow } ${ classes.arrowTop }` }
                  />
                  : <ArrowRightAltIcon
                    fontSize="small"
                    className={ `${ classes.arrow } ${ classes.arrowBottom }` }
                  />
                }
                </span>
              }
            </>
          }
        />
      )) }
    </Box>
  );
}