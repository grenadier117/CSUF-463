/** Arqum Ahmed */

import { Button, Paper, Box, Table, TableBody, TableCell, TableHead, TableRow, Grid } from '@mui/material';
import moment from 'moment';
import { calculateTotalCharge, isTodayInRange } from 'app/helpers/helpers';
import { Theme } from '@mui/system';
import { DetailsPage } from '../layout/detailsPage';
import { selectReservations, selectRooms, selectGuests } from 'app/redux/hotel.selector';
import { useDispatch, useSelector } from 'react-redux';
import { makeStyles } from '@mui/styles';
import { useHistory } from 'react-router-dom';
import { FirebaseContext } from 'app/app';
import { deleteReservation, updateReservation } from 'app/firebase/helpers';
import { IReservation } from 'app/models/reservation';
import React from 'react';
import { AlertDialog } from 'app/components/dialog';
import { IGuest } from 'app/models/guest';
import { globalActions } from 'app/global/global.redux';
import clsx from 'clsx';

const useStyles = makeStyles((theme: Theme) => ({
  room: {
    padding: '12px 24px',
  },
  tableRow: {
    '&:hover': {
      background: theme.palette.mode === 'light' ? '#e6e6e6' : '#595959',
      cursor: 'pointer',
    },
  },
  inactiveReservation: {
    background: theme.palette.mode === 'light' ? '#e1b7b7' : '#634040',
  },
}));

export const Reservations = () => {
  const classes = useStyles();
  const reservations = useSelector(selectReservations);
  const rooms = useSelector(selectRooms);
  const guests = useSelector(selectGuests);
  const history = useHistory();
  const { firestore } = React.useContext(FirebaseContext);
  const [confirmDeleteOpen, setConfirmDeleteOpen] = React.useState<boolean>(false);
  const [reservationToDelete, setReservationToDelete] = React.useState<{ reservation: IReservation; guest: IGuest }>();
  const dispatch = useDispatch();

  const onNavigate = (guestIndex, roomIndex) => () => {
    history.push(`/guest/${guests[guestIndex].guestId}/${rooms[roomIndex].roomId}/currentStay`);
  };

  const onDeleteReservation = (reservation: IReservation) => event => {
    setConfirmDeleteOpen(true);
    const foundGuest = guests.find(item => item.guestId === reservation.guestId);
    if (foundGuest)
      setReservationToDelete({
        reservation: reservation,
        guest: foundGuest,
      });
    event.preventDefault();
    event.stopPropagation();
  };

  const _deleteReservation = () => {
    if (reservationToDelete?.reservation) {
      updateReservation(firestore, reservationToDelete?.reservation?.reservationId || '-1', {
        ...reservationToDelete?.reservation,
        active: false,
      })
        .then(() => {
          dispatch(globalActions.setSnackBar({ message: 'Reservation Deleted', severity: 'success' }));
        })
        .catch(() => {
          dispatch(
            globalActions.setSnackBar({
              message: 'Reservation was unable to be deleted. Please try again.',
              severity: 'error',
            }),
          );
        });
      cancelDeleteReservation();
    }
  };

  const cancelDeleteReservation = () => {
    setConfirmDeleteOpen(false);
    setReservationToDelete(undefined);
  };

  const reservationStatus = (reservation?: IReservation) => {
    if (reservation && reservation.active) {
      if (!isTodayInRange(reservation.checkIn, reservation.checkOut)) return 'Expired';
      return 'Active';
    } else return 'Inactive';
  };

  return (
    <DetailsPage title="Reservations">
      <Grid container>
        <Grid item xs={12}>
          <Box display="flex" justifyContent="flex-end" alignItems="center" marginTop="15px" marginBottom="15px">
            <Button
              variant="contained"
              color="success"
              onClick={() => {
                history.push(`/reservations/rooms`);
              }}
            >
              Add Reservation
            </Button>
          </Box>
        </Grid>
        <Grid item xs={12}>
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
                  <TableCell />
                </TableRow>
              </TableHead>
              <TableBody>
                {reservations
                  .filter(item => item.active)
                  .map(reservation => {
                    const guestIndex = guests.map(g => g.guestId).indexOf(reservation.guestId);
                    const roomIndex = rooms.map(r => r.roomId).indexOf(reservation.roomId);
                    return (
                      guestIndex !== -1 &&
                      roomIndex !== -1 && (
                        <TableRow
                          className={clsx(classes.tableRow, {
                            [classes.inactiveReservation]:
                              !reservation.active || !isTodayInRange(reservation.checkIn, reservation.checkOut),
                          })}
                          onClick={onNavigate(guestIndex, roomIndex)}
                        >
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
                          <TableCell>
                            <Button color="warning" onClick={onDeleteReservation(reservation)}>
                              Delete
                            </Button>
                          </TableCell>
                        </TableRow>
                      )
                    );
                  })}
              </TableBody>
            </Table>
          </Paper>
        </Grid>
      </Grid>
      <AlertDialog
        open={confirmDeleteOpen}
        title={`Are you sure you want to delete ${reservationToDelete?.guest.first ?? ''} ${
          reservationToDelete?.guest.last || ''
        }'s reservation?`}
        handleYes={_deleteReservation}
        handleNo={cancelDeleteReservation}
        content={`Reservation status: ${reservationStatus(reservationToDelete?.reservation)}`}
      />
    </DetailsPage>
  );
};
