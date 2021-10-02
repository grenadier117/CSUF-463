import { Grid } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { globalSliceKey, globalReducer } from 'app/global/global.redux';
import { GlobalDisplay } from 'app/global/GlobalDisplay';
import React from 'react';
import { Route } from 'react-router-dom';
import { useInjectReducer } from 'utils/redux-injectors';

const useStyles = makeStyles({
  root: {
    backgroundColor: '#f2e6d9',
    minHeight: '100vh',
  },
});

export const Layout = ({ Component, ...rest }) => {
  const classes = useStyles();
  useInjectReducer({ key: globalSliceKey, reducer: globalReducer });

  return (
    <Route
      {...rest}
      render={matchProps => (
        <GlobalDisplay>
          <Grid container className={classes.root}>
            <Grid item xs={12}>
              <Component {...matchProps} />
            </Grid>
          </Grid>
        </GlobalDisplay>
      )}
    />
  );
};
