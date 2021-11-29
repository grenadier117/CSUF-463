/** Andy Lopez */

import { Box, Button, FormControl, FormControlLabel, FormLabel, Radio, RadioGroup } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { useState } from 'react';
import { TextField as TextBox } from '@mui/material';
import { useSelector } from 'react-redux';
//import { selectGuests } from 'app/redux/hotel.selector';
//import guests from '../../../assets/json/customerList.json';
//import reservations from '../../../assets/json/reservations.json';
import { selectReservations, selectRooms, selectGuests } from 'app/redux/hotel.selector';


const useStyles = makeStyles({
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
});


export const Customer = () => {
  const classes = useStyles();
  const [search, setSearch] = useState('');
  const [parameter, setParameter] = useState('first');
  //const customers = useSelector(selectGuests);
  const [results, setResults] = useState('User Info');
  const [reservationsResults, setReservations] = useState('User Reservations');
  const reservations = useSelector(selectReservations);
  const guests = useSelector(selectGuests);

  function searchCustomer() {
    for (let i = 0; i < guests.length; i++) {
      if (guests[i][parameter] == search) {
        const customer = guests[i];
        let alertMessage = 'Name: ' + customer['first'] + ' ' + customer['last'] + '\n';
        alertMessage += 'ID#: ' + customer['guestId'] + '\n';
        alertMessage += 'Phone: ' + customer['phone'] + '\n';
        alertMessage += 'Email: ' + customer['email'] + '\n';
        alertMessage += 'Address: ' + customer['address'] + ' ' + customer['state'] + '\n';
        alertMessage += 'License plate: ' + customer['licensePlate'] + '\n';
        alert(alertMessage);
        updateResults(alertMessage)
        findReservationsbyID(customer['guestId']);
        //ReactDOM.render(element, document.getElementById('id'));
      }
    }
    
  }

  function findReservationsbyID(id) {
    let resInfo = "";
    for (let i = 0; i < reservations.length; i++) {
      if (reservations[i]['guestId'] == id) {
        const reservationDates = reservations[i];

        resInfo += 'Check in: ' + reservationDates['checkIn'] + ' Checkout: ' + reservationDates['checkOut'] + '\n';
        resInfo += 'Room #: ' + reservationDates['roomId'] + '\n';
        updateReservations(resInfo)
        //ReactDOM.render(element, document.getElementById('id'));
      }
    }
    
  }

  function onSelectParameter(event) {

    setParameter(event.target.value);
    
  }
  function onUpdateText(event) {
    setSearch(event.target.value);
    //setParameter(event.target.value);
    
  }

  function updateResults(par) {
    setResults(par);
  }

  function updateReservations(par) {
    setReservations(par);
  }

  return (
    <Box className={classes.box}>
      
      <Box className={classes.box} display="flex">
        <FormControl component="fieldset">
          <FormLabel component="legend">Provide guest information</FormLabel>
          <TextBox id="searchbox" placeholder="..." onChange={onUpdateText}>   </TextBox>


          <Button variant="outlined" onClick={searchCustomer}>
            Search By
          </Button>
          <RadioGroup row aria-label="search" name="row-radio-buttons-group" defaultValue={parameter}>
                        <FormControlLabel value="first" control={<Radio />} onChange={onSelectParameter} label="First Name" />
            <FormControlLabel value="last" control={<Radio />} onChange={onSelectParameter} label="Last Name" />
            <FormControlLabel value="phone" control={<Radio />} onChange={onSelectParameter} label="Phone" />
            <FormControlLabel value="guestId" control={<Radio />} onChange={onSelectParameter} label="ID #" />
          </RadioGroup>
        </FormControl>
      </Box>
      {results}
      <br></br>
      {reservationsResults}
    </Box>
    
  );
};
