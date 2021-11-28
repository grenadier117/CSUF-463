/** Jake Hamo */

import { Paper, Table, TableHead, TableRow, TableCell, Typography, TableBody, Box } from '@mui/material';
import { makeStyles } from '@mui/styles';
import React from 'react';
import moment from 'moment';
import { DetailsPage } from '../layout/detailsPage';
import { addDays } from 'date-fns';
import { useHistory } from 'react-router';
import { useSelector } from 'react-redux';
import { selectGuests, selectReservations, selectRooms } from 'app/redux/hotel.selector';

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
  empty: {
    textDecoration: 'underline',
    cursor: 'pointer',
    opacity: 0.5,
  },
});

export const SevenDayOutlook = () => {
  const [today] = React.useState<Date>(new Date());
  const history = useHistory();
  const reservations = useSelector(selectReservations);
  const rooms = useSelector(selectRooms);
  const guests = useSelector(selectGuests);
  /**
   * use the custom hook for styles to be able to use them in this component
   * Each style class compiles to a string value that is used with className
   */

  const isRoomReserved = (roomId, day) => {
    const lookingAtDay = moment(moment(addDays(today, day)).format('MM/DD/YYYY'));
    const foundReservations = reservations.filter(
      item => item.roomId === roomId && moment(item.checkIn) <= lookingAtDay && lookingAtDay <= moment(item.checkOut),
    );
    if (foundReservations.length > 0) {
      const reservation = foundReservations[0];
      const guestIndex = guests.map(guest => guest.guestId).indexOf(reservation.guestId);
      if (guestIndex !== undefined && guestIndex !== -1) {
        const guest = guests[guestIndex];
        return {
          name: `${guest.first} ${guest.last}`,
          guestId: guest.guestId,
          reservationId: reservation.reservationId,
        };
      }
    }
    return { name: '', guestId: -1, reservationId: -1 };
  };

  const navigate = (guestId, roomId, reservationId, date?) => event => {
    if (guestId !== -1)
      history.push(
        `/guest/${guestId}/${roomId}/currentstay/${reservationId !== null ? reservationId : `?date=${date}`}`,
      );
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
            {[...rooms]
              ?.sort((a, b) => (a.roomNumber > b.roomNumber ? 1 : -1))
              .map(room => (
                <TableRow>
                  <TableCell>{room.roomNumber}</TableCell>
                  {days.map(day => {
                    const { name, guestId, reservationId } = isRoomReserved(room.roomId, day);
                    return (
                      <TableCell>
                        {guestId !== -1 && (
                          <Box className={classes.name} onClick={navigate(guestId, room.roomId, reservationId)}>
                            <Typography variant="body2">{name}</Typography>
                          </Box>
                        )}
                        {guestId === -1 && (
                          <Box
                            className={classes.empty}
                            onClick={navigate(
                              0,
                              room.roomId,
                              null,
                              `${moment(addDays(today, day)).format('MM/DD/YYYY')}`,
                            )}
                          >
                            <Typography variant="body2">{'Empty'}</Typography>
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
