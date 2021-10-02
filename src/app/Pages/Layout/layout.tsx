import { AppBar, Button, Grid, IconButton, Toolbar, Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { globalSliceKey, globalReducer } from 'app/global/global.redux';
import { GlobalDisplay } from 'app/global/GlobalDisplay';
import React from 'react';
import { Route } from 'react-router-dom';
import { useInjectReducer } from 'utils/redux-injectors';
import MenuIcon from '@mui/icons-material/Menu';

const useStyles = makeStyles({
  root: {
    backgroundColor: '#262626',
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
          <Grid container direction={'column'} className={classes.root}>
            <Grid item xs={12}>
              <AppBar position="static">
                <Toolbar>
                  <Typography variant="h4" component="div" sx={{ flexGrow: 1 }}>
                    CS 463
                  </Typography>
                </Toolbar>
              </AppBar>
            </Grid>
            <Grid item xs={12}>
              <Component {...matchProps} />
            </Grid>
          </Grid>
        </GlobalDisplay>
      )}
    />
  );
};
