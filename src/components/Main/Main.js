import React from 'react';
import Container from '@material-ui/core/Container';

import TableContainer from '../TableContainer';
import SelectCurrency from '../SelectCurrency';
import Switch from '../Switch';
// import Switcher from '../Switcher';

export default function Main() {

  return (
    <Container maxWidth="xl">
      <Switch/>
      <TableContainer/>
      <SelectCurrency />
    </Container>
  );
}