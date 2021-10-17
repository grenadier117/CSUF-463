import {
  Divider,
  Grid,
  List,
  ListItem,
  ListItemText,
  Paper,
  Table,
  TableHead,
  TableRow,
  TableCell,
  Typography,
  TableBody,
} from '@mui/material';
import { makeStyles } from '@mui/styles';
import rooms from 'assets/json/rooms.json';
import reservations from 'assets/json/reservations.json';
import React from 'react';
import moment from 'moment';
import { DetailsPage } from '../layout/detailsPage';

/**
 * Create styles for this component
 */
const useStyles = makeStyles({
  room: {
    padding: '12px 24px',
  },
  /** style for the inner paper component */
  paper: {
    // margin: '50px',
  },
});

export const RoomList = () => {
  /**
   * use the custom hook for styles to be able to use them in this component
   * Each style class compiles to a string value that is used with className
   */

  const roomStatus = (roomId, maintainance, clean) => {
    const today = moment();
    let status = '';
    const reservationsFound = reservations.filter(
      res => res.roomId === roomId && moment(res.checkIn) <= today && today <= moment(res.checkOut),
    );
    if (reservationsFound.length > 0 || !clean || maintainance) {
      //found reservation for this room for for today
      status = 'Unavailable';
      if (reservationsFound.length > 0) status += '/Occupied';
      else if (maintainance) status += '/Maintenance';
      else if (!clean) status += '/Dirty';
    } else {
      status = 'Available';
    }
    return status;
  };

  const classes = useStyles();
  return (
    /** Create a list for each of the rooms.
     * This list is wrapped in a paper component for visual purposes */
    <DetailsPage title="Rooms">
      <Paper className={classes.paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Room Number</TableCell>
              <TableCell>Room Tyoe</TableCell>
              <TableCell>Status</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rooms.map(room => (
              <TableRow>
                <TableCell>{room.roomNumber}</TableCell>
                <TableCell>{room.roomType}</TableCell>
                <TableCell>{roomStatus(room.roomId, room.maintainance, room.clean)}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Paper>
    </DetailsPage>
  );
};
