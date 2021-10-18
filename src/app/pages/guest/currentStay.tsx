/** Duc Nguyen */

import { Typography, Divider, Grid, Paper, Box, Table, TableRow, TableHead, TableCell, TableBody } from '@mui/material';
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
import { DetailsPage } from '../layout/detailsPage';
import { useHistory } from 'react-router';
import { calculateBalance, calculateTotalCharge } from 'app/helpers/helpers';

const useStyles = makeStyles((theme: Theme) => ({
  label: {
    textAlign: 'end',
  },
  guestLabel: {
    paddingRight: '8px',
  },
  guestName: {
    textDecoration: 'underline',
    cursor: 'pointer',
  },
  box: {
    paddingBottom: '12px',
  },
}));

export const CurrentStay = () => {
  const classes = useStyles();
  const history = useHistory();
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

  const daysBetweenDates = (from: string, to: string): number => {
    const a = moment(to);
    const b = moment(from);
    const days = a.diff(b, 'days');
    return days;
  };

  const GuestName = ({ firstName, lastName }) => (
    <Grid container>
      <Grid item>
        <Typography className={classes.guestLabel} variant="h5">
          {'Guest:'}
        </Typography>
      </Grid>
      <Grid item>
        <Box
          className={classes.box}
          onClick={() => {
            history.push(`/guest/${guestId}/profile`);
          }}
        >
          <Typography className={classes.guestName} variant="h5">{`${firstName} ${lastName}`}</Typography>
        </Box>
      </Grid>
    </Grid>
  );

  return (
    <DetailsPage title="Current Stay">
      {guest && (
        <Paper style={{ padding: '12px' }}>
          <Box className={classes.box}>
            <GuestName firstName={guest.first} lastName={guest.last} />
            <Divider />
          </Box>
          {reservations.length > 0 ? (
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Room Number</TableCell>
                  <TableCell>Room Type</TableCell>
                  <TableCell>Room Rate ($/Day</TableCell>
                  <TableCell>Check In Date</TableCell>
                  <TableCell>Expected Check Out</TableCell>
                  <TableCell>Total Charge</TableCell>
                  <TableCell>Payments Made</TableCell>
                  <TableCell>Balance</TableCell>
                  <TableCell></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
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
                      <TableCell>{`$${calculateTotalCharge(
                        room.roomRate,
                        reservation.checkIn,
                        reservation.checkOut,
                      )}`}</TableCell>
                      <TableCell>{`$${reservation.payment}`}</TableCell>
                      <TableCell>{`$${calculateBalance(
                        room.roomRate,
                        reservation.checkIn,
                        reservation.checkOut,
                        reservation.payment,
                      )}`}</TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          ) : (
            <Typography color="primary" variant="h6">
              No Reservations
            </Typography>
          )}
        </Paper>
      )}
    </DetailsPage>
  );
};
