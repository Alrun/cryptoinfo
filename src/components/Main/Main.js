import React from 'react';
import Container from '@material-ui/core/Container';

import TableContainer from '../TableContainer';
// import Switcher from '../Switcher';

export default function Main() {

  return (
    <Container maxWidth="xl">
      {/*<Switcher/>*/}
      <TableContainer/>
    </Container>
  );
}