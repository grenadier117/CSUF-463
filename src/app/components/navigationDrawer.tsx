import React from 'react';
import { Drawer, MenuItem, MenuList, Typography, Link, ClickAwayListener, Theme } from '@mui/material';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    minWidth: '200px',
  },
  link: {
    color: theme.palette.text.primary,
  },
}));

export const NavigationDrawer = ({ open, onClose }) => {
  const classes = useStyles();
  return (
    <ClickAwayListener mouseEvent="onMouseUp" onClickAway={onClose}>
      <Drawer variant="persistent" open={open}>
        <MenuList classes={{ root: classes.root }}>
          <MenuItem>
            <Link href="/">
              <Typography variant="h5" className={classes.link}>
                {'Next 7 Days'}
              </Typography>
            </Link>
          </MenuItem>
          <MenuItem>
            <Link href="/roomList">
              <Typography variant="h5" className={classes.link}>
                {'Room List'}
              </Typography>
            </Link>
          </MenuItem>
          <MenuItem>
            <Link href="/search">
              <Typography variant="h5" className={classes.link}>
                {'Search'}
              </Typography>
            </Link>
          </MenuItem>
          <MenuItem>
            <Link href="/dailyReport">
              <Typography variant="h5" className={classes.link}>
                {'Daily Report'}
              </Typography>
            </Link>
          </MenuItem>
          <MenuItem>
            <Link href="/reservations">
              <Typography variant="h5" className={classes.link}>
                {'Reservations'}
              </Typography>
            </Link>
          </MenuItem>
          <MenuItem>
              <Link href="/housekeeping">
              <Typography variant="h5" className={classes.link}>
                {'House keeping'}
              </Typography>
            </Link>
          </MenuItem>
        </MenuList>
      </Drawer>
    </ClickAwayListener>
  );
};
