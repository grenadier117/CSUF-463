/** Arqum Ahmed */

import { Paper, Table, TableBody, TableCell, TableHead, TableRow } from '@mui/material';
import moment from 'moment';
import { calculateTotalCharge } from 'app/helpers/helpers';
import { Theme } from '@mui/system';
import { DetailsPage } from '../layout/detailsPage';
import { selectReservations, selectRooms, selectGuests } from 'app/redux/hotel.selector';
import { useSelector } from 'react-redux';
import { makeStyles } from '@mui/styles';
import { IRoom } from 'app/models/room';
import { useHistory } from 'react-router-dom';

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

export const Reservations = () => {
  const classes = useStyles();
  const reservations = useSelector(selectReservations);
  const rooms = useSelector(selectRooms);
  const guests = useSelector(selectGuests);
  const history = useHistory();

  const onNavigate = (guestIndex, roomIndex) => () => {
    history.push(`/guest/${guests[guestIndex].guestId}/${rooms[roomIndex].roomId}/currentStay`);
  };

  return (
    <DetailsPage title="Reservations">
      <Paper>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>First Name</TableCell>
              <TableCell>Last Name</TableCell>
              <TableCell>Date Made</TableCell>
              <TableCell>Check-In</TableCell>
              <TableCell>Check-Out</TableCell>
              <TableCell>Room Type</TableCell>
              <TableCell>Room Number</TableCell>
              <TableCell>Website Reservation</TableCell>
              <TableCell>Rate</TableCell>
              <TableCell>Total Charge</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {reservations.map(reservation => {
              const guestIndex = guests.map(g => g.guestId).indexOf(reservation.guestId);
              const roomIndex = rooms.map(r => r.roomId).indexOf(reservation.roomId);
              return (
                guestIndex !== -1 &&
                roomIndex !== -1 && (
                  <TableRow className={classes.tableRow} onClick={onNavigate(guestIndex, roomIndex)}>
                    <TableCell>{guests[guestIndex].first}</TableCell>
                    <TableCell>{guests[guestIndex].last}</TableCell>
                    <TableCell>{reservation.dateMade}</TableCell>
                    <TableCell>{moment(reservation.checkIn).format('MM/DD/YYYY')}</TableCell>
                    <TableCell>{moment(reservation.checkOut).format('MM/DD/YYYY')}</TableCell>
                    <TableCell>{rooms[roomIndex].roomType}</TableCell>
                    <TableCell>{rooms[roomIndex].roomNumber}</TableCell>
                    <TableCell>{reservation.website ? 'True' : 'False'}</TableCell>
                    <TableCell>{`$${rooms[roomIndex].roomRate}`}</TableCell>
                    <TableCell>{`$${calculateTotalCharge(
                      rooms[roomIndex].roomRate,
                      reservation.checkIn,
                      reservation.checkOut,
                    )}`}</TableCell>
                  </TableRow>
                )
              );
            })}
          </TableBody>
        </Table>
      </Paper>
    </DetailsPage>
  );
};