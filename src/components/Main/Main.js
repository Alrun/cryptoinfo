import React from 'react';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';

import Switch from '../Switch';
import TableContainer from '../TableContainer';
import SelectCurrency from '../SelectCurrency';
import PieChartContainer from '../PieChartContainer';

const useStyles = makeStyles({
  wrapper: {
    display: 'flex',
    flexDirection: 'column',
    minHeight: '100%'
  },
  main: {
    flex: '1 0 auto',
    overflow: 'hidden'
  }
});

const Header = () => (
  <Container maxWidth="xl">
    <h1>Cryptoinfo</h1>
  </Container>
);

const Footer = () => (
  <Container maxWidth="xl">
    <div>Footer</div>
  </Container>
);

export default function Main() {
  const classes = useStyles();

  return (
    <div className={ classes.wrapper }>
      <Header />

      <div className={ classes.main }>
        <Container maxWidth="xl">
          <Grid container alignItems="flex-start">

            <Grid container item xs={ 12 } lg={ 7 }>

              <Grid container alignItems="flex-end">
                <Grid item xs>
                  <Switch />
                </Grid>

                <Grid item xs="auto">
                  <SelectCurrency />
                </Grid>
              </Grid>
              <Grid item xs={ 12 }>

                <TableContainer />

              </Grid>
            </Grid>

            <Grid container item xs={ 12 } lg={ 5 } justify="center">
              <PieChartContainer />
            </Grid>

          </Grid>
        </Container>
      </div>

      <Footer />
    </div>
  );
}