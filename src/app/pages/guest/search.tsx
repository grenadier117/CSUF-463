/** Andy Lopez */

import {
  Box,
  Button,
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
  TableHead,
  Theme,
  Typography,
} from '@mui/material';
import { makeStyles } from '@mui/styles';
import { useState } from 'react';
import { TextField as TextBox } from '@mui/material';
import { useSelector } from 'react-redux';
//import { selectGuests } from 'app/redux/hotel.selector';
//import guests from '../../../assets/json/customerList.json';
//import reservations from '../../../assets/json/reservations.json';
import { selectReservations, selectRooms, selectGuests } from 'app/redux/hotel.selector';
import { Paper, Table, TableBody, TableCell, TableRow } from '@mui/material';
import { DetailsPage } from '../layout/detailsPage';
import { IGuest } from 'app/models/guest';
import { IReservation } from 'app/models/reservation';
import { IRoom } from 'app/models/room';

const useStyles = makeStyles((theme: Theme) => ({
  paper: {
    minHeight: '100px',
    width: '100%',
    textAlign: 'center',
    '&.small': {
      minHeight: '30px',
    },
  },
  box: {
    margin: '40px',
    justifyContent: 'center',
  },
  radioControl: {
    color: theme.palette.text.secondary,
  },
  searchButton: {
    marginTop: '12px !important',
  },
}));

export const Customer = () => {
  const classes = useStyles();
  const [search, setSearch] = useState('');
  const [parameter, setParameter] = useState('first');
  const reservations = useSelector(selectReservations);
  const rooms = useSelector(selectRooms);
  const guests = useSelector(selectGuests);
  const [foundGuests, setFoundGuests] = useState<{ guest: IGuest; reservation: IReservation; room: IRoom }[] | null>(
    null,
  );

  function searchCustomer() {
    const found = guests.filter(item =>
      `${item[parameter]}`.trim().toLowerCase().includes(search.trim().toLowerCase()),
    );
    const results: { guest: IGuest; reservation: IReservation; room: IRoom }[] = [];
    reservations.forEach(reservation => {
      found.forEach(guest => {
        if (reservation.guestId === guest.guestId) {
          results.push({
            guest: guest,
            reservation: reservation,
            room: rooms.find(item => item.roomId === reservation.roomId)!,
          });
        }
      });
    });
    setFoundGuests(results);
  }

  function onSelectParameter(event) {
    setParameter(event.target.value);
  }

  function onUpdateText(event) {
    setSearch(event.target.value);
  }

  return (
    <DetailsPage title="Guest Search">
      <Box className={classes.box}>
        <Box className={classes.box} display="flex">
          <FormControl component="fieldset">
            <FormLabel component="legend">Provide guest information</FormLabel>
            <RadioGroup row aria-label="search" name="row-radio-buttons-group" defaultValue={parameter}>
              <FormControlLabel
                className={classes.radioControl}
                value="first"
                control={<Radio />}
                onChange={onSelectParameter}
                label="First Name"
              />
              <FormControlLabel
                className={classes.radioControl}
                value="last"
                control={<Radio />}
                onChange={onSelectParameter}
                label="Last Name"
              />
              <FormControlLabel
                className={classes.radioControl}
                value="phone"
                control={<Radio />}
                onChange={onSelectParameter}
                label="Phone"
              />
              <FormControlLabel
                className={classes.radioControl}
                value="guestId"
                control={<Radio />}
                onChange={onSelectParameter}
                label="ID #"
              />
            </RadioGroup>
            <TextBox id="searchbox" placeholder="Enter keyword" onChange={onUpdateText} />
            <Button className={classes.searchButton} variant="outlined" onClick={searchCustomer}>
              Search
            </Button>
          </FormControl>
        </Box>
        {foundGuests && foundGuests.length > 0 && (
          <Paper>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>First Name</TableCell>
                  <TableCell>Last Name</TableCell>
                  <TableCell>Room #</TableCell>
                  <TableCell>Phone</TableCell>
                  <TableCell>Address</TableCell>
                  <TableCell>Check-In</TableCell>
                  <TableCell>Check-Out</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {foundGuests.map(item => (
                  <TableRow>
                    <TableCell>{item.guest.first}</TableCell>
                    <TableCell>{item.guest.last}</TableCell>
                    <TableCell>{item.room.roomNumber}</TableCell>
                    <TableCell>{item.guest.phone}</TableCell>
                    <TableCell>{`${item.guest.address} ${item.guest.city}, ${item.guest.state} ${item.guest.zip}`}</TableCell>
                    <TableCell>{item.reservation.checkIn}</TableCell>
                    <TableCell>{item.reservation.checkOut}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Paper>
        )}
        {foundGuests && foundGuests.length === 0 && (
          <Box style={{ textAlign: 'center' }}>
            <Typography color="primary" variant="h5">
              No guests found
            </Typography>
          </Box>
        )}
      </Box>
    </DetailsPage>
  );
};
