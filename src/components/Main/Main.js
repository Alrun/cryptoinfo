import React from 'react';
import Container from '@material-ui/core/Container';

import Table from '../Table';
import Switcher from '../Switcher';

export default function Main() {

  return (
    <Container maxWidth="xl">
      {/*<Switcher/>*/}
      <Table/>
    </Container>
  );
}