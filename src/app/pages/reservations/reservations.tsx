import { Paper, Table, TableBody, TableCell, TableHead, TableRow } from '@mui/material';
import reservations from 'assets/json/reservations.json';
import guests from 'assets/json/customerList.json';
import rooms from 'assets/json/rooms.json';
import moment from 'moment';
import { calculateTotalCharge } from 'app/helpers/helpers';
import { DetailsPage } from '../layout/detailsPage';

export const Reservations = () => {
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
              debugger;
              return (
                guestIndex !== -1 &&
                roomIndex !== -1 && (
                  <TableRow>
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