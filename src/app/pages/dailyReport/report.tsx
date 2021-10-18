/** Andy Lopez */

import { Paper, Table, TableHead, TableRow, TableCell, Typography, TableBody, Box } from '@mui/material';
import { makeStyles } from '@mui/styles';
import rooms from 'assets/json/rooms.json';
import reservations from 'assets/json/reservations.json';
import guests from 'assets/json/customerList.json';
import React from 'react';
import moment from 'moment';
import { DetailsPage } from '../layout/detailsPage';
import { addDays } from 'date-fns';
import { useHistory } from 'react-router';

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
  name: {
    textDecoration: 'underline',
    cursor: 'pointer',
  },
  h1: {
    color: 'white',
  },
});

export const DailyReport = () => {
  const [today] = React.useState<Date>(new Date());
  const history = useHistory();
  /**
   * use the custom hook for styles to be able to use them in this component
   * Each style class compiles to a string value that is used with className
   */

  const isRoomReserved = (roomId, day) => {
    const lookingAtDay = moment(moment(addDays(today, day)).format('MM/DD/YYYY'));
    debugger;
    const foundReservations = reservations.filter(
      item => item.roomId === roomId && moment(item.checkIn) <= lookingAtDay && lookingAtDay <= moment(item.checkOut),
    );
    if (foundReservations.length > 0) {
      const reservation = foundReservations[0];
      const guestIndex = guests.map(guest => guest.guestId).indexOf(reservation.guestId);
      if (guestIndex !== undefined && guestIndex !== -1) {
        const guest = guests[guestIndex];
        return { name: `${guest.first} ${guest.last}`, guestId: guest.guestId };
      }
    }
    return { name: '', guestId: -1 };
  };

  const navigate = guestId => event => {
    if (guestId !== -1) history.push(`/guest/${guestId}/currentstay`);
  };

  const days = [0, 1, 2, 3, 4, 5, 6];

  const classes = useStyles();
  return (
    /** Create a list for each of the rooms.
     * This list is wrapped in a paper component for visual purposes */
    <DetailsPage title="Today's Summary">
      <Paper className={classes.paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Room Number</TableCell>
              <TableCell>Guest Name</TableCell>
              <TableCell>Date In/Out</TableCell>
              <TableCell>Amount Paid</TableCell>
              
            </TableRow>
          </TableHead>
          <TableBody>
              <TableRow>
          <TableCell>5</TableCell>
          <TableCell>Andy L</TableCell>
          <TableCell>10/22 | 10/23</TableCell>
          <TableCell>$124.35</TableCell>
          </TableRow>

          <TableRow>
          <TableCell>8</TableCell>
          <TableCell>Bob</TableCell>
          <TableCell>10/22 | 10/23</TableCell>
          <TableCell>$724.35</TableCell>
          </TableRow>

          <TableRow>
          <TableCell>8</TableCell>
          <TableCell>Bob</TableCell>
          <TableCell>10/22 | 10/23</TableCell>
          <TableCell>$724.35</TableCell>
          </TableRow>

          <TableRow>
          <TableCell>8</TableCell>
          <TableCell>Bob</TableCell>
          <TableCell>10/22 | 10/23</TableCell>
          <TableCell>$724.35</TableCell>
          </TableRow>

          <TableRow>
              <TableCell></TableCell>
              <TableCell></TableCell>
              <TableCell></TableCell>
              <TableCell>Daily Total: $1020</TableCell>
            </TableRow>

          </TableBody>

        </Table>
      </Paper>
      
    </DetailsPage>
  );
};
