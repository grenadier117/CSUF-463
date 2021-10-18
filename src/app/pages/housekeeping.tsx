import { Paper, Table, TableBody, TableCell, TableHead, TableRow } from '@mui/material';
import reservations from 'assets/json/reservations.json';
import guests from 'assets/json/customerList.json';
import rooms from 'assets/json/rooms.json';
import moment from 'moment';
import { calculateTotalCharge } from 'app/helpers/helpers';
import { DetailsPage } from '../layout/detailsPage';
import { roomStatus } from 'app/helpers/helpers';


export const Housekeeping = () => {
    return (
      <DetailsPage title="HouseKeeping">
        <Paper>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Housekeep name</TableCell>
                <TableCell>Room</TableCell>
                <TableCell>Type</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Bathroom</TableCell>
                <TableCell>Towels</TableCell>
                <TableCell>Bedsheet</TableCell>
                <TableCell>Dusting</TableCell>
                <TableCell>Dusting</TableCell>
                <TableCell>Electronics</TableCell>
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
                      <TableCell>{rooms[roomIndex].roomNumber}</TableCell>
                      <TableCell>{rooms[roomIndex].roomType}</TableCell>
                      <TableCell>{rooms[roomIndex].roomType}</TableCell>
                      <TableCell>{reservation.website ? 'True' : 'False'}</TableCell>
                      <TableCell>{reservation.website ? 'True' : 'False'}</TableCell>
                      <TableCell>{reservation.website ? 'True' : 'False'}</TableCell>
                      <TableCell>{reservation.website ? 'True' : 'False'}</TableCell>
                      <TableCell>{reservation.website ? 'True' : 'False'}</TableCell>
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