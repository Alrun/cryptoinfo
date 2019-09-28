import React from 'react';
import Container from '@material-ui/core/Container';
// import { makeStyles } from '@material-ui/core/styles';

import Box from '@material-ui/core/Box';
import Divider from '@material-ui/core/Divider';
import Grid from '@material-ui/core/Grid';

// const useStyles = makeStyles({
  // wrapper: {
  //   display: 'flex',
  //   flexDirection: 'column',
  //   minHeight: '100%'
  // },
  // main: {
  //   flex: '1 0 auto',
  //   overflow: 'hidden'
  // }
// });


export default function Footer() {
  // const classes = useStyles();

  return (
    <Box component="footer" mt={3}>
      <Divider />
      <Container fixed maxWidth="xl">
        <Grid container alignItems="center">
          <Grid item xs>
            <Box my={1}>
              GitHub
            </Box>
          </Grid>
          <Grid item xs="auto">
            <Box my={1}>
              {`© 2019 - ${new Date().getFullYear()} Cryptoinfo`}
            </Box>
          </Grid>
        </Grid>

      </Container>
    </Box>
  );
}