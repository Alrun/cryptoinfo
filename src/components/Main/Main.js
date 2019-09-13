import React from 'react';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';

import Switch from '../Switch';
import TableContainer from '../TableContainer';
import SelectCurrency from '../SelectCurrency';
import { makeStyles } from '@material-ui/core/styles';

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

const Footer = () => (
  <div>Footer</div>
);

export default function Main() {
  const classes = useStyles();

  return (
    <div className={ classes.wrapper }>
      <div className={ classes.main }>
        <Container maxWidth="xl">
          <Grid container spacing={ 3 }>
            <Grid item xs>
              <Switch />
            </Grid>
            <Grid item xs="auto">
              <SelectCurrency />
            </Grid>
          </Grid>

          <TableContainer />

        </Container>
      </div>

      <Footer />
    </div>
  );
}