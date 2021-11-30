/** Andy Lopez */

import { Paper, Table, TableHead, TableRow, TableCell, Typography, TableBody, Box, Theme } from '@mui/material';
import { makeStyles } from '@mui/styles';
import React from 'react';
import moment from 'moment';
import { DetailsPage } from '../layout/detailsPage';
import { useSelector } from 'react-redux';
import { selectGuests, selectReservations, selectRooms } from 'app/redux/hotel.selector';
import { isTodayInRange } from 'app/helpers/helpers';
import { IRoom } from 'app/models/room';
import { IGuest } from 'app/models/guest';

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
  name: {
    textDecoration: 'underline',
    cursor: 'pointer',
  },
  paymentContainer: {
    textAlign: 'end',
    padding: '10px 0px',
  },
  payment: {
    color: theme.palette.text.secondary,
  },
}));

export const DailyReport = () => {
  const reservations = useSelector(selectReservations);
  const rooms = useSelector(selectRooms);
  const guests = useSelector(selectGuests);

  const classes = useStyles();
  return (
    /** Create a list for each of the rooms.
     * This list is wrapped in a paper component for visual purposes */
    <DetailsPage title="Today's Summary">
      <Paper className={classes.paper}>
        <div style={{ padding: '12px 12px' }}>
          <Typography variant="h5">{`${moment().format('MM/DD/YYYY')}`}</Typography>
        </div>

        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Room #</TableCell>
              <TableCell>Guest Name</TableCell>
              <TableCell>Check-In</TableCell>
              <TableCell>Check-Out</TableCell>
              <TableCell>Amount Paid</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {reservations
              .filter(item => isTodayInRange(item.checkIn, item.checkOut) && item.active)
              .map(reservation => {
                const room: IRoom | undefined = rooms.find(r => r.roomId === reservation.roomId);
                const guest: IGuest | undefined = guests.find(g => g.guestId === reservation.guestId);
                return (
                  <TableRow>
                    <TableCell>{room?.roomNumber}</TableCell>
                    <TableCell>{`${guest?.first || ''} ${guest?.last || ''}`}</TableCell>
                    <TableCell>{reservation.checkIn}</TableCell>
                    <TableCell>{reservation.checkOut}</TableCell>
                    <TableCell>{`$${reservation.payment}`}</TableCell>
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </Paper>
      <Box className={classes.paymentContainer}>
        <Typography variant="h6" className={classes.payment}>
          {`Total Payments Made: $${reservations
            .filter(item => item.active)
            .reduce((total, item) => {
              return (total += item.payment || 0);
            }, 0)}`}
        </Typography>
      </Box>
    </DetailsPage>
  );
};
