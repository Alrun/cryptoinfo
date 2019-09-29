import React from 'react';
import PropTypes from 'prop-types';
import IconButton from '@material-ui/core/IconButton';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import NoteAddOutlinedIcon from '@material-ui/icons/NoteAddOutlined';
// import VpnKeyOutlinedIcon from '@material-ui/icons/VpnKeyOutlined';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import { makeStyles } from '@material-ui/core/styles';
import SSModal from '../SSModal';

const useStyles = makeStyles(theme => ({
  drawerHeader: {
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    ...theme.mixins.toolbar
  },
  icon: {
    minWidth: 40
  }
}));

export default function Sidebar(props) {
  const [ssModal, setSsModal] = React.useState(false);
  const classes = useStyles();

  const handleClickOpen = () => {
    setSsModal(true);
  };

  const handleClose = () => {
    setSsModal(false);
  };

  return (
    <div role="presentation">
      <div className={ classes.drawerHeader }>
        <IconButton
          onClick={ props.toggleDrawer(false) }
          onKeyDown={ props.toggleDrawer(false) }
        >
          <ChevronRightIcon />
        </IconButton>
      </div>

      <Divider />
      <List>
        <ListItem button onClick={ handleClickOpen }>
          <ListItemIcon className={classes.icon}>
            <NoteAddOutlinedIcon />
          </ListItemIcon>
          <ListItemText primary="Add Spreadsheet" />
        </ListItem>
        {/*<ListItem button>*/}
        {/*  <ListItemIcon className={classes.icon}>*/}
        {/*    <VpnKeyOutlinedIcon />*/}
        {/*  </ListItemIcon>*/}
        {/*  <ListItemText primary="Add Key" />*/}
        {/*</ListItem>*/}
      </List>
      <Divider />

      <SSModal open={ ssModal } handleClose={ handleClose } />

    </div>
  );
}

Sidebar.propTypes = {
  toggleDrawer: PropTypes.func
};