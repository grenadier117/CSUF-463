/** Duc Nguyen */

import {
  Typography,
  Divider,
  Grid,
  Paper,
  Box,
  Table,
  TableRow,
  TableHead,
  TableCell,
  TableBody,
  TextField,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Checkbox,
} from '@mui/material';
import { defaultGuest, IGuest } from 'app/models/guest';
import React from 'react';
import { useParams } from 'react-router';
import { makeStyles } from '@mui/styles';
import { Theme } from '@mui/system';
import { defaultReservation, IReservation } from 'app/models/reservation';
import moment from 'moment';
import { DetailsPage } from '../layout/detailsPage';
import { useHistory } from 'react-router';
import { calculateBalance, calculateTotalCharge } from 'app/helpers/helpers';
import { useSelector } from 'react-redux';
import { selectGuests, selectReservations, selectRooms } from 'app/redux/hotel.selector';
import DesktopDatePicker from '@mui/lab/DesktopDatePicker';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import { IRoom } from 'app/models/room';
import { addReservation, updateReservation, updateRoom } from 'app/firebase/helpers';
import { FirebaseContext } from 'app/app';

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
  const [guest, setGuest] = React.useState<IGuest>(defaultGuest);
  const [originalReservation, setOriginalReservation] = React.useState<IReservation>(defaultReservation);
  const [reservation, setReservation] = React.useState<IReservation>(defaultReservation);
  const [room, setRoom] = React.useState<IRoom>();
  const allReservations = useSelector(selectReservations);
  const rooms = useSelector(selectRooms);
  const guestList = useSelector(selectGuests);
  const { guestId, roomId, reservationId } = useParams<any>();
  const { firestore } = React.useContext(FirebaseContext);

  React.useEffect(() => {
    // get the room details
    const rid = rooms.map(room => room.roomId).indexOf(roomId);
    setRoom(rooms[rid]);

    // find a guest, if it exists
    const foundGuestId = guestList.map(item => item.guestId).indexOf(guestId);
    if (foundGuestId !== undefined && foundGuestId !== -1) {
      const guestInfo = guestList[foundGuestId];
      setGuest(guestInfo);

      // find reservation for guest
      let reservationToSet: IReservation = defaultReservation;
      if (reservationId !== undefined) {
        const foundReservations = allReservations.filter(item => item.reservationId === reservationId);
        if (foundReservations.length > 0) reservationToSet = foundReservations[0];
      } else {
        const foundReservations = allReservations.filter(
          item => item.guestId === guestInfo.guestId && item.roomId === roomId,
        );
        if (foundReservations.length > 0) reservationToSet = foundReservations[0];
      }
      setReservation({
        ...reservationToSet,
        roomId: roomId,
      });
      setOriginalReservation({
        ...reservationToSet,
        roomId: roomId,
      });
    }
  }, [guestId, guestList, allReservations, roomId]);

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
            history.push(`/guest/${guest.guestId || 0}/profile`);
          }}
        >
          <Typography className={classes.guestName} variant="h5">{`${firstName} ${lastName}`}</Typography>
        </Box>
      </Grid>
    </Grid>
  );

  const _updateReservation = () => {
    if (originalReservation.isCheckedIn && !reservation.isCheckedIn) {
      updateReservation(firestore, reservation.reservationId, {
        ...reservation,
        active: false,
      });
      if (room) {
        updateRoom(firestore, roomId, {
          ...room,
          clean: false,
        });
      }
    } else updateReservation(firestore, reservation.reservationId, reservation);
  };

  const _addReservation = () => {
    addReservation(firestore, {
      ...reservation,
      active: true,
      isCheckedIn: true,
    });
  };

  return (
    <DetailsPage title="Current Stay">
      <Paper style={{ padding: '12px' }}>
        <Box className={classes.box}>
          {guest.guestId ? (
            <GuestName firstName={guest.first || ''} lastName={guest.last || ''} />
          ) : (
            <Grid container style={{ marginBottom: '10px' }} alignItems="center">
              <Grid item>
                <Typography className={classes.guestLabel} variant="h5">
                  {'Guest:'}
                </Typography>
              </Grid>
              <Grid>
                <FormControl size="small" style={{ width: 'auto', minWidth: '170px' }}>
                  <InputLabel id="demo-simple-select-label">Select Guest</InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={guest.guestId}
                    label="Select Guest"
                    size="small"
                    onChange={event => {
                      const foundGuest = guestList[guestList.map(item => item.guestId).indexOf(event.target.value)];
                      setGuest(foundGuest);
                    }}
                  >
                    {guestList.map(item => (
                      <MenuItem value={item.guestId}>{`${item.first} ${item.last}`}</MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
            </Grid>
          )}
          <Divider />
        </Box>
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
              <TableCell>Checked In</TableCell>
              <TableCell></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {room && (
              <TableRow>
                <TableCell>{`${room.roomNumber}`}</TableCell>
                <TableCell>{`${room.roomType}`}</TableCell>
                <TableCell>{`$${room.roomRate}`}</TableCell>
                <TableCell>
                  <LocalizationProvider dateAdapter={AdapterDateFns}>
                    <DesktopDatePicker
                      label="Date desktop"
                      inputFormat="MM/dd/yyyy"
                      value={moment(reservation.checkIn).format('MM/DD/YYYY')}
                      onChange={date => {
                        if (date) {
                          setReservation(prev => ({
                            ...prev,
                            checkIn: moment(date).format('MM/DD/YYYY'),
                          }));
                        }
                      }}
                      renderInput={params => <TextField {...params} />}
                    />
                  </LocalizationProvider>
                </TableCell>
                <TableCell>
                  <LocalizationProvider dateAdapter={AdapterDateFns}>
                    <DesktopDatePicker
                      label="Date desktop"
                      inputFormat="MM/dd/yyyy"
                      value={moment(reservation.checkOut).format('MM/DD/YYYY')}
                      onChange={date => {
                        if (date) {
                          setReservation(prev => ({
                            ...prev,
                            checkOut: moment(date).format('MM/DD/YYYY'),
                          }));
                        }
                      }}
                      renderInput={params => <TextField {...params} />}
                    />
                  </LocalizationProvider>
                </TableCell>
                <TableCell>{`$${calculateTotalCharge(
                  room.roomRate,
                  reservation.checkIn,
                  reservation.checkOut,
                )}`}</TableCell>
                <TableCell>
                  <TextField
                    type="number"
                    value={reservation.payment}
                    onChange={event => {
                      setReservation(prev => ({
                        ...prev,
                        payment: parseInt(event.target.value),
                      }));
                    }}
                  />
                </TableCell>
                <TableCell>
                  {reservation.checkIn && reservation.checkOut
                    ? `$${calculateBalance(
                        room.roomRate,
                        reservation.checkIn,
                        reservation.checkOut,
                        reservation.payment || 0,
                      )}`
                    : 0}
                </TableCell>
                <TableCell>
                  <Checkbox
                    checked={reservation.isCheckedIn}
                    onChange={event => {
                      setReservation(prev => ({
                        ...prev,
                        isCheckedIn: event?.target.checked,
                      }));
                    }}
                  />
                </TableCell>
                <TableCell>
                  {reservation.reservationId !== '' ? (
                    <Button onClick={_updateReservation}>Update</Button>
                  ) : (
                    <Button onClick={_addReservation}>Save</Button>
                  )}
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </Paper>
    </DetailsPage>
  );
};
