import React, { useState } from 'react';
import Container from '@material-ui/core/Container';
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import MenuIcon from '@material-ui/icons/Menu';
import Divider from '@material-ui/core/Divider';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Sidebar from '../Sidebar';
import SelectCurrency from '../SelectCurrency/SelectCurrency';
import TableSum from '../TableSum/TableSum';
import Fab from '@material-ui/core/Fab';

const useStyles = makeStyles(theme => ({
  root: {
    marginBottom: theme.spacing(2),
  },
  logo: {
    ...theme.typography.h4,
    margin: 0,//theme.spacing(1, 0),
    letterSpacing: 3,
  },
  // hide: {
  //   display: 'none',
  // },
  menuButton: {
    // margin: theme.spacing(1, 0),
  },
  row: {
    marginTop: 5,
    marginBottom: 5
  },
  col1: {
    [theme.breakpoints.up('sm')]: {
      order: 1,
    },
  },
  col2: {
    textAlign: 'right',
    [theme.breakpoints.up('sm')]: {
      order: 4,
    },
  },
  col3: {
    [theme.breakpoints.up('sm')]: {
      order: 3,
    },
  },
  col4: {
    [theme.breakpoints.up('sm')]: {
      order: 2,
    },
  },
}));


export default function Header() {
  const classes = useStyles();
  const [sidebar, setSidebar] = useState(false);

  const toggleDrawer = open => event => {
    if (event && event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }

    setSidebar(open);
  };

  return (
    <Box component='header' className={classes.root}>
      <Container fixed maxWidth="xl">
        <Grid container alignItems="center" spacing={3} className={classes.row}>

          <Grid item xs={9} sm className={classes.col1}>
            <h1 className={classes.logo}>Cryptoinfo</h1>
          </Grid>

          <Grid item xs={3} sm="auto" className={classes.col2}>
            <Fab
              color="inherit"
              aria-label="open drawer"
              size="small"
              className={classes.menuButton}
              onClick={ toggleDrawer(true) }
            >
              <MenuIcon />
            </Fab>
          </Grid>

          <Grid item xs sm="auto" className={classes.col3}>
            <SelectCurrency />
          </Grid>

          <Grid item xs="auto" className={classes.col4}>
            <TableSum />
          </Grid>

        </Grid>
      </Container>
      <Divider />

      <SwipeableDrawer
        anchor="right"
        open={ sidebar }
        onClose={ toggleDrawer(false) }
        onOpen={ toggleDrawer(true) }
      >
        <Sidebar toggleDrawer={toggleDrawer} />
      </SwipeableDrawer>
    </Box>
  );
}