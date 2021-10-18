import { Paper, Table, TableBody, TableCell, TableHead, TableRow } from '@mui/material';
import reservations from 'assets/json/reservations.json';
import rooms from 'assets/json/rooms.json';
import { roomStatus } from 'app/helpers/helpers';
import { DetailsPage } from '../layout/detailsPage';

export const Housekeeping = () => {
  const displayBoolean = value => (value ? 'True' : 'False');

  return (
    <DetailsPage title="Housekeeping">
      <Paper>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Housekeep Name</TableCell>
              <TableCell>Room Number</TableCell>
              <TableCell>Room Type</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Bathroom</TableCell>
              <TableCell>Towels</TableCell>
              <TableCell>Bed Sheets</TableCell>
              <TableCell>Vacuum</TableCell>
              <TableCell>Dusting</TableCell>
              <TableCell>Electronics</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rooms
              .filter(room => !room.clean)
              .map(room => {
                const housekeep = room.housekeeping;
                const foundReservations = reservations.filter(reservation => reservation.roomId === room.roomId);
                return (
                  <TableRow>
                    <TableCell>{housekeep.name}</TableCell>
                    <TableCell>{room.roomNumber}</TableCell>
                    <TableCell>{room.roomType}</TableCell>
                    <TableCell>{roomStatus(foundReservations, room.roomId, room.maintainance, room.clean)}</TableCell>
                    <TableCell>{displayBoolean(housekeep.bathroom)}</TableCell>
                    <TableCell>{displayBoolean(housekeep.towels)}</TableCell>
                    <TableCell>{displayBoolean(housekeep.bedSheets)}</TableCell>
                    <TableCell>{displayBoolean(housekeep.vacuum)}</TableCell>
                    <TableCell>{displayBoolean(housekeep.dustring)}</TableCell>
                    <TableCell>{displayBoolean(housekeep.electronics)}</TableCell>
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </Paper>
    </DetailsPage>
  );
};