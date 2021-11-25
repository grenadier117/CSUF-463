/** Jake Hamo */

import { Paper, Table, TableHead, TableRow, TableCell, TableBody } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { DetailsPage } from '../layout/detailsPage';
import { roomStatus } from 'app/helpers/helpers';
import React from 'react';
import { FirebaseContext } from 'app/app';
import { collection } from '@firebase/firestore';
import { useSelector } from 'react-redux';
import { selectReservations, selectRooms } from 'app/redux/hotel.selector';

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
  const reservations = useSelector(selectReservations);
  const rooms = useSelector(selectRooms);

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
              <TableCell>Room Type</TableCell>
              <TableCell>Status</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rooms.map(room => (
              <TableRow>
                <TableCell>{room.roomNumber}</TableCell>
                <TableCell>{room.roomType}</TableCell>
                <TableCell>{roomStatus(reservations, room.roomId, room.maintenance, room.clean)}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Paper>
    </DetailsPage>
  );
};
