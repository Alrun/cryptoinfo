import React from 'react';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import Switch from '../Switch';
import TableContainer from '../TableContainer';
import PieChartContainer from '../PieChartContainer';
import Header from '../Header';
import Box from '@material-ui/core/Box';
import Footer from '../Footer';
import Price from '../Price';

const useStyles = makeStyles(theme => ({
  wrapper: {
    display: 'flex',
    flexDirection: 'column',
    minHeight: '100%'
  },
  main: {
    flex: '1 0 auto',
    overflow: 'hidden'
  },
  price: {
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'block',
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      margin: 'auto',
      height: '1.8rem',
      textAlign: 'center'
    }
  },
  col1: {
    marginRight: 'auto',
    textAlign: 'right',
    [theme.breakpoints.up('lg')]: {
      order: 2,
    },
    [theme.breakpoints.up('xl')]: {
      display: 'none'
    },
  },
  col2: {
    [theme.breakpoints.up('lg')]: {
      order: 1,
    },
  },
  col3: {
    position: 'relative',
    [theme.breakpoints.up('lg')]: {
      order: 3,
    },
  },
}));

export default function Main() {
  const classes = useStyles();

  return (
    <Box className={ classes.wrapper }>
      <Header />

      <Box component="main" className={ classes.main }>
        <Container fixed maxWidth="xl">
          <Grid container spacing={ 3 } alignItems="flex-start">

            <Grid item sm="auto" lg={ 2 } className={ classes.col1 }>
              <Price />
            </Grid>

            <Grid container item xs={ 12 } lg={ 10 } xl={ 7 } className={ classes.col2 }>
              <Grid container alignItems="flex-end">
                <Grid item xs>
                  <Switch />
                </Grid>
              </Grid>
              <Grid item xs={ 12 }>
                <TableContainer />
              </Grid>
            </Grid>

            <Grid item xs={ 12 } sm xl={ 5 } className={ classes.col3 }>
              <div className={ classes.price }>
                <Price />
              </div>
              <PieChartContainer />
            </Grid>
          </Grid>

        </Container>
      </Box>

      <Footer />
    </Box>
  );
}