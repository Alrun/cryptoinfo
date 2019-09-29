import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import TablePopover from '../TablePopover/TablePopover';
import Typography from '@material-ui/core/Typography';
import Tooltip from '@material-ui/core/Tooltip';
import CircularProgress from '@material-ui/core/CircularProgress';
import ErrorOutlineIcon from '@material-ui/icons/ErrorOutline';
import { decimalFormat } from '../../utils';

const useStyles = makeStyles(theme => ({
  col: {
    padding: '3px 10px',
    flexShrink: 0
  },
  typo: {
    fontSize: theme.typography.fontSize
  },
  load: {
    transition: theme.transitions.create(['opacity']),
    opacity: 1
  },
  loadActive: {
    opacity: .18
  },
  preloader: {
    top: 0,
    right: -10,
    position: 'absolute',
    bottom: 0,
    marginTop: 5,
    overflow: 'hidden',
  },
  progress: {
    color: '#ccc',
    animationDuration: '.8s'
  },
  error: {
    right: -9,
    position: 'absolute',
    fontSize: '14px',
    top: 0,
    bottom: 0,
    margin: 'auto',
    color: 'red',
    zIndex: 1
  }
}));

export default function TableRow(props) {
  const {title, buyPrice, price, quantity, buyFee, sellFee, wallet, profit, gain, val} = props.data;
  const {isLoading, errorText, fiat, fiatSymbol, colWidth, group} = props;
  const classes = useStyles();

  return (
    <>
      <Box fontWeight={group ? 'fontWeightMedium' : 'fontWeightRegular'} className={ classes.col } style={ {width: colWidth.col1} }>
        { title }
      </Box>

      <Box
        className={ classes.col }
        style={ {width: colWidth.col2, textAlign: 'right'} }>
        { quantity.toFixed(8) }
      </Box>

      <Box
        className={ classes.col }
        style={ {
          width: colWidth.col3,
          textAlign: 'right'
        } }>
        {
          !Number.isNaN(buyPrice)
          ? fiat === 'btc'
            ? `${ buyPrice.toFixed(8) } ₿`
            : `${ decimalFormat(buyPrice, 2) } ${ fiatSymbol }`
          : 'N/A'
        }
      </Box>

      <Box
        className={ classes.col }
        style={ {
          position: 'relative',
          width: colWidth.col4,
          textAlign: 'right'
        } }>

        { errorText
        && <Tooltip title={ errorText } placement="right-end">
          <ErrorOutlineIcon className={ classes.error } />
        </Tooltip> }

        { isLoading
        && <Box className={ classes.preloader }>
          <CircularProgress className={ classes.progress } size={ 16 } disableShrink thickness={5}/>
        </Box> }

        <Box className={ `${ classes.load } ${ isLoading ? classes.loadActive : null }` }>
          {
            !Number.isNaN(price)
            ? fiat === 'btc'
              ? `${ price.toFixed(8) } ₿`
              : `${ decimalFormat(price, 2) } ${ fiatSymbol }`
            : 'N/A'
          }
        </Box>

      </Box>

      <Box
        color={ Number.isNaN(profit) ? 'text.primary' : profit < 0 ? 'red' : 'green' }
        className={ classes.col }
        style={ {
          width: colWidth.col5,
          textAlign: 'right'
        } }>

        {
          !Number.isNaN(profit)
          ? fiat === 'btc'
            ? `${ profit.toFixed(8) } ₿`
            : `${ decimalFormat(profit, 2) } ${ fiatSymbol }`
          : 'N/A'
        }
      </Box>

      <Box
        color={ Number.isNaN(gain) ? 'text.primary' : gain < 0 ? 'red' : 'green' }
        className={ classes.col }
        style={ {width: colWidth.col6, textAlign: 'right'}
        }>
        {
          !Number.isNaN(gain)
          ? `${ gain.toFixed(2) }%`
          : 'N/A'
        }
      </Box>

      <Box
        className={ classes.col }
        style={ {
          width: colWidth.col7,
          textAlign: 'right'
        } }>
        {
          !Number.isNaN(val)
          ? fiat === 'btc'
            ? `${ val.toFixed(8) } ₿`
            : `${ decimalFormat(val, 2) } ${ fiatSymbol }`
          : 'N/A'
        }
      </Box>

      <Box className={ classes.col } style={ {width: colWidth.col8, flexGrow: 1} }>
        <Typography
          component="div"
          noWrap
          className={ classes.typo }
        >
          { wallet }
        </Typography>

      </Box>

      { !group && <TablePopover buyFee={ buyFee } sellFee={ sellFee } /> }
    </>
  );
}

TableRow.propTypes = {
  isLoading: PropTypes.bool,
  errorText: PropTypes.string,
  fiat: PropTypes.string.isRequired,
  fiatSymbol: PropTypes.string.isRequired,
  colWidth: PropTypes.object,
  group: PropTypes.bool
};