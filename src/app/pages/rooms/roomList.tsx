/** Jake Hamo */

import { Paper, Table, TableHead, TableRow, TableCell, TableBody } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { DetailsPage } from '../layout/detailsPage';
import { daysBetweenDates, roomStatus } from 'app/helpers/helpers';
import React from 'react';
import { FirebaseContext } from 'app/app';
import { collection } from '@firebase/firestore';
import { useSelector } from 'react-redux';
import { selectReservations, selectRooms } from 'app/redux/hotel.selector';
import { Theme } from '@mui/system';
import { useHistory } from 'react-router';
import moment from 'moment';

/**
 * Create styles for this component
 */
const useStyles = makeStyles((theme: Theme) => ({
  room: {
    padding: '12px 24px',
  },
  /** style for the inner paper component */
  paper: {
    // margin: '50px',
  },
  tableRow: {
    '&:hover': {
      background: theme.palette.mode === 'light' ? '#e6e6e6' : '#595959',
      cursor: 'pointer',
    },
  },
}));

export const RoomList = () => {
  const reservations = useSelector(selectReservations);
  const rooms = useSelector(selectRooms);
  const history = useHistory();

  const onNavigate = roomId => () => {
    const today = moment();
    const r = reservations.filter(
      res => res.roomId === roomId && moment(res.checkIn) <= today && today <= moment(res.checkOut),
    );
    if (r.length > 0) {
      history.push(`/guest/${r[0].guestId}/${roomId}/currentStay`);
    } else {
      history.push(`/guest/0/${roomId}/currentStay`);
    }
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
              <TableCell>Room Type</TableCell>
              <TableCell>Status</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rooms.map(room => (
              <TableRow className={classes.tableRow} onClick={onNavigate(room.roomId)}>
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
