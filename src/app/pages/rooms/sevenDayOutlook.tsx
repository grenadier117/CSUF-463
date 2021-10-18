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
});

export const SevenDayOutlook = () => {
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
    <DetailsPage title="Next 7 Days">
      <Paper className={classes.paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Room Number</TableCell>
              {days.map(day => (
                <TableCell>{`${moment(addDays(today, day)).format('MM/DD/YYYY')}`}</TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {rooms.map(room => (
              <TableRow>
                <TableCell>{room.roomNumber}</TableCell>
                {days.map(day => {
                  const { name, guestId } = isRoomReserved(room.roomId, day);
                  return (
                    <TableCell>
                      {guestId !== -1 && (
                        <Box className={classes.name} onClick={navigate(guestId)}>
                          <Typography variant="body2">{name}</Typography>
                        </Box>
                      )}
                    </TableCell>
                  );
                })}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Paper>
    </DetailsPage>
  );
};
