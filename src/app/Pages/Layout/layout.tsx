import { Grid } from '@mui/material';
import { makeStyles } from '@mui/styles';
import React from 'react';
import { Route } from 'react-router-dom';

const useStyles = makeStyles({
  root: {
    backgroundColor: '#f2e6d9',
    minHeight: '100vh',
  },
});

export const Layout = ({ Component, ...rest }) => {
  const classes = useStyles();
  return (
    <Route
      {...rest}
      render={matchProps => (
        <Grid container className={classes.root}>
          <Grid item xs={12}>
            <Component {...matchProps} />
          </Grid>
        </Grid>
      )}
    />
  );
};
