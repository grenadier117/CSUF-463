import { AppBar, FormControlLabel, FormGroup, Grid, Switch, Toolbar, Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { ColorMode } from 'app/app';
import { NavigationDrawer } from 'app/components/navigationDrawer';
import { globalSliceKey, globalReducer } from 'app/global/global.redux';
import { GlobalDisplay } from 'app/global/globalDisplay';
import React, { useState } from 'react';
import { useCookies } from 'react-cookie';
import { Route, useHistory } from 'react-router-dom';
import { useInjectReducer } from 'utils/redux-injectors';
import MenuIcon from '@mui/icons-material/Menu';

const useStyles = makeStyles({
  root: {
    backgroundColor: '#262626',
    minHeight: '100vh',
    width: '100%',
  },
  menu: {
    height: '30px !important',
    width: '30px !important',
    marginRight: '20px',
  },
  content: {
    padding: '24px',
    overflowY: 'auto',
    minHeight: '100vh',
    paddingTop: '88px',
  },
  title: {
    cursor: 'pointer',
  },
});

export const Layout = ({ Component, ...rest }) => {
  const classes = useStyles();
  useInjectReducer({ key: globalSliceKey, reducer: globalReducer });
  const [cookies, setCookie] = useCookies(['colorMode']);
  const [checked, setChecked] = useState<boolean>(false);
  const [menuOpen, setMenuOpen] = useState<boolean>(false);
  const history = useHistory();

  const toggleMenu = () => {
    setMenuOpen(prev => !prev);
  };

  const closeMenu = () => {
    if (menuOpen) setMenuOpen(false);
  };

  React.useEffect(() => {
    if (cookies.colorMode === ColorMode.light) setChecked(true);
  }, [cookies.colorMode]);

  const onChange = event => {
    if (event.target.checked) setCookie('colorMode', ColorMode.light);
    else setCookie('colorMode', ColorMode.dark);
  };

  return (
    <Route
      {...rest}
      render={matchProps => (
        <GlobalDisplay>
          <Grid container className={classes.root}>
            <Grid item xs={12}>
              <AppBar position="fixed">
                <Toolbar>
                  <MenuIcon className={classes.menu} onClick={toggleMenu} />
                  <Typography
                    className={classes.title}
                    onClick={() => history.push('/')}
                    variant="h5"
                    component="div"
                    sx={{ flexGrow: 1 }}
                  >
                    CS 463
                  </Typography>
                  <FormGroup>
                    <FormControlLabel
                      control={<Switch color="secondary" checked={checked} onChange={onChange} />}
                      label="Light Mode"
                    />
                  </FormGroup>
                </Toolbar>
              </AppBar>
            </Grid>
            <Grid item xs={12} className={classes.content}>
              <Component {...matchProps} />
            </Grid>
          </Grid>
          <NavigationDrawer open={menuOpen} onClose={closeMenu} />
        </GlobalDisplay>
      )}
    />
  );
};
