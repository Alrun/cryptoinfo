import React from 'react';
import PropTypes from 'prop-types';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Popper from '@material-ui/core/Popper';
import Fade from '@material-ui/core/Fade';
import Paper from '@material-ui/core/Paper';

const useStyles = makeStyles(theme => ({
  root: {
    lineHeight: '1rem',
    paddingRight: 2.5
  },
  icon: {
    fontSize: '1.2rem',
    color: '#ccc',
    transition: 'color .12s',
    '&:hover': {
      color: '#999'
    }
  },
  popover: {
    pointerEvents: 'none',
  },
  paper: {
    padding: theme.spacing(1),
  },
}));

export default function TablePopover(props) {
  const classes = useStyles();
  const {buyFee, sellFee} = props;
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleOpen = e => {
    setAnchorEl(anchorEl ? null : e.currentTarget);
  };

  const handleClickAway = () => {
    setAnchorEl(null);
  };

  return (
    <>
        <Box
          className={classes.root}
          aria-owns={!!anchorEl ? 'mouse-over-popper' : undefined}
          aria-haspopup="true"
          onMouseEnter={handleOpen}
          onMouseLeave={handleClickAway}
        >
          <MoreVertIcon className={classes.icon} />
        </Box>
      <div>
        <Popper
          open={ !!anchorEl }
          anchorEl={ anchorEl }
          transition
          placement="right-end"
        >
          { ({TransitionProps}) => (
            <Fade { ...TransitionProps } timeout={ 150 }>
              <Paper elevation={8}>
                <Box p={1}>
                  <div>{`Buy fee: ${buyFee}%`}</div>
                 <div>{`Sell fee: ${sellFee}%`}</div>
                 </Box>
              </Paper>

            </Fade>
          ) }
        </Popper>
      </div>
    </>
  )
}

TablePopover.propTypes = {
  buyFee: PropTypes.number,
  sellFee: PropTypes.number
};