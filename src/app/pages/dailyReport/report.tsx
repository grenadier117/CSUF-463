/** Andy Lopez */

import { Paper, Table, TableHead, TableRow, TableCell, Typography, TableBody, Box } from '@mui/material';
import { makeStyles } from '@mui/styles';
import React from 'react';
import moment from 'moment';
import { DetailsPage } from '../layout/detailsPage';
import { addDays } from 'date-fns';
import { useHistory } from 'react-router';
import { useSelector } from 'react-redux';
import { selectGuests, selectReservations, selectRooms } from 'app/redux/hotel.selector';
import { calculateTotalCharge } from 'app/helpers/helpers';

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

export const DailyReport = () => {
  const [today] = React.useState<Date>(new Date());
  const history = useHistory();
  const reservations = useSelector(selectReservations);
  const rooms = useSelector(selectRooms);
  const guests = useSelector(selectGuests);
  let guID;
  let totalsum = 0;
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
        return { name: `${guest.first} ${guest.last}`, guestId: guest.guestId };
      }
    }
    return { name: '', guestId: -1 };
  };

  const navigate = guestId => event => {
    if (guestId !== -1) history.push(`/guest/${guestId}/currentstay`);
  };

  const days = [0];

  const classes = useStyles();
  return (
    /** Create a list for each of the rooms.
     * This list is wrapped in a paper component for visual purposes */
    <DetailsPage title="Today's Summary">
      <Paper className={classes.paper}>

      {days.map(day => (
                <h1>{`${moment(addDays(today, day)).format('MM/DD/YYYY')}`}</h1>
              ))}

        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Room Number</TableCell>
              {days.map(day => (
                <TableCell> Room occupied by</TableCell>
              ))}
              <TableCell>Date In / Date Out</TableCell>
              
            </TableRow>
          </TableHead>
          <TableBody>
            {[...rooms]
              ?.sort((a, b) => (a.roomNumber > b.roomNumber ? 1 : -1))
              .map(room => (
                <TableRow>
                      <TableCell>{room.roomNumber}</TableCell>
                  
                
                  {days.map(day => {
                    const { name, guestId } = isRoomReserved(room.roomId, day);
                    
                    guID = guestId;
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
                                {reservations.map(reservation => {
                                
                                const guestIndex = guests.map(g => guID).indexOf(reservation.guestId);
                                const roomIndex = rooms.map(r => r.roomId).indexOf(reservation.roomId);
                                
                                totalsum += calculateTotalCharge(
                                  rooms[roomIndex].roomRate,
                                  reservation.checkIn,
                                  reservation.checkOut,
                                );
                                
                                return (
                                  guestIndex !== -1 &&
                                  roomIndex !== -1 && (
                                    <TableRow>
                                      <TableCell>{moment(reservation.checkIn).format('MM/DD/YYYY')}</TableCell>
                                      <TableCell>{moment(reservation.checkOut).format('MM/DD/YYYY')}</TableCell>
                                      <TableCell>{`$${calculateTotalCharge(
                                        rooms[roomIndex].roomRate,
                                        reservation.checkIn,
                                        reservation.checkOut,
                                      )}`}</TableCell>
                                    </TableRow>
                                  )
                                );
                              })}



                </TableRow>
                
              ))}
          <TableRow>
            <TableCell>
            Grand Total: ${totalsum}
            </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </Paper>
      
    </DetailsPage>
  );
};
