import { Typography, Grid, Divider, Paper, Box, Table, TableRow, TableHead, TableCell } from '@mui/material';
import { IGuest } from 'app/models/guest';
import React from 'react';
import { useParams } from 'react-router';
import { makeStyles } from '@mui/styles';
import { Theme } from '@mui/system';
import customerList from 'assets/json/customerList.json';
import allReservations from 'assets/json/reservations.json';
import rooms from 'assets/json/rooms.json';
import { IReservation } from 'app/models/reservation';
import moment from 'moment';

const useStyles = makeStyles((theme: Theme) => ({
  label: {
    textAlign: 'end',
  },
  guestName: {
    paddingBottom: '12px',
  },
  box: {
    paddingBottom: '12px',
  },
}));

export const CurrentStay = () => {
  const classes = useStyles();
  const [guest, setGuest] = React.useState<IGuest | undefined>(undefined);
  const [reservations, setReservations] = React.useState<IReservation[]>([]);
  const { guestId } = useParams<any>();

  console.info('@JAKE - guest', guestId);

  React.useEffect(() => {
    const foundId = customerList.map(item => item.guestId).indexOf(parseInt(guestId));
    if (foundId !== undefined && foundId !== -1) {
      const guestInfo = customerList[foundId];
      setGuest(guestInfo);
      console.info('@JAKE - all reservations', allReservations);
      debugger;
      const foundReservations = allReservations.filter(item => item.guestId === guestInfo.guestId && item.active);
      debugger;
      setReservations(foundReservations);
    }
  }, [guestId]);

  const Row = ({ label, value }) => (
    <tr>
      <td className={classes.label}>
        <Typography color="text">{label}:</Typography>
      </td>
      <td>
        <Typography color="text">{value}</Typography>
      </td>
    </tr>
  );

  const daysBetweenDates = (from: string, to: string): number => {
    const a = moment(to);
    const b = moment(from);
    const days = a.diff(b, 'days');
    return days;
  };

  return (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <Typography color="primary" variant="h5">
          {`Current Stay`}
        </Typography>
      </Grid>
      <Grid item xs={12}>
        <Divider />
      </Grid>
      <Grid item xs={12}>
        {guest && (
          <Paper style={{ padding: '12px' }}>
            <Box className={classes.box}>
              <Typography
                className={classes.guestName}
                color="text"
                variant="h5"
              >{`Guest: ${guest.first} ${guest.last}`}</Typography>
              <Divider />
            </Box>
            {reservations.length > 0 ? (
              <Table>
                <TableHead>
                  <TableCell>Room Number</TableCell>
                  <TableCell>Room Type</TableCell>
                  <TableCell>Room Rate ($/Day</TableCell>
                  <TableCell>Check In Date</TableCell>
                  <TableCell>Expected Check Out</TableCell>
                  <TableCell>Total Charge</TableCell>
                  <TableCell>Payments Made</TableCell>
                  <TableCell>Balance</TableCell>
                  <TableCell></TableCell>
                </TableHead>
                {reservations.map(reservation => {
                  const roomId = rooms.map(room => room.roomId).indexOf(reservation.roomId);
                  const room = rooms[roomId];
                  return (
                    <TableRow>
                      <TableCell>{`${room.roomNumber}`}</TableCell>
                      <TableCell>{`${room.roomType}`}</TableCell>
                      <TableCell>{`$${room.roomRate}`}</TableCell>
                      <TableCell>{`${moment(reservation.checkIn).format('MM/DD/YYYY')}`}</TableCell>
                      <TableCell>{`${moment(reservation.checkOut).format('MM/DD/YYYY')}`}</TableCell>
                      <TableCell>{`$${
                        room.roomRate * daysBetweenDates(reservation.checkIn, reservation.checkOut)
                      }`}</TableCell>
                      <TableCell>{`$${reservation.payment}`}</TableCell>
                      <TableCell>{`$${reservation.balance}`}</TableCell>
                    </TableRow>
                  );
                })}
              </Table>
            ) : (
              <Typography color="primary" variant="h6">
                No Reservations
              </Typography>
            )}
          </Paper>
        )}
      </Grid>
    </Grid>
  );
};
