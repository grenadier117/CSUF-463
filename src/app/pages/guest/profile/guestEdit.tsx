/** Duc Nguyen */

import { Typography, Paper, Button, Box, TextField, FormControl } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { Theme } from '@mui/system';
import { FirebaseContext } from 'app/app';
import { addGuestWithID, updateGuest } from 'app/firebase/helpers';
import { globalActions } from 'app/global/global.redux';
import { defaultGuest, IGuest } from 'app/models/guest';
import { DetailsPage } from 'app/pages/layout/detailsPage';
import { selectGuests } from 'app/redux/hotel.selector';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router';
import { useHistory } from 'react-router-dom';

const useStyles = makeStyles((theme: Theme) => ({
  label: {
    textAlign: 'end',
  },
}));

export const GuestEdit = () => {
  const classes = useStyles();
  const history = useHistory();
  const [guest, setGuest] = React.useState<IGuest>(defaultGuest);
  const { guestId, roomId } = useParams<any>();
  const customerList = useSelector(selectGuests);
  const { firestore } = React.useContext(FirebaseContext);
  const dispatch = useDispatch();

  React.useEffect(() => {
    const foundId = customerList.map(item => item.guestId).indexOf(guestId);
    if (foundId !== undefined && foundId !== -1) {
      const a = customerList[foundId];
      setGuest(a);
    }
  }, [guestId, customerList]);

  const valueChangeHandler = field => event => {
    setGuest(prev => ({
      ...prev,
      [field]: event.target.value,
    }));
  };

  return (
    <DetailsPage title="Guest Profile">
      {guest && (
        <Paper>
          <Box justifyContent="center" display="flex">
            <FormControl component="fieldset" variant="outlined" sx={{ width: '50ch' }}>
              <Box marginTop="15px"></Box>
              <TextField id="first" label="First Name" value={guest.first} onChange={valueChangeHandler('first')} />
              <Box marginTop="15px"></Box>
              <TextField id="last" label="Last Name" value={guest.last} onChange={valueChangeHandler('last')} />
              <Box marginTop="15px"></Box>
              <TextField id="email" label="Email" value={guest.email} onChange={valueChangeHandler('email')} />
              <Box marginTop="15px"></Box>
              <TextField id="phone" label="Phone" value={guest.phone} onChange={valueChangeHandler('phone')} />
              <Box marginTop="15px"></Box>
              <TextField
                id="licensePlate"
                label="License Plate"
                value={guest.licensePlate}
                onChange={valueChangeHandler('licensePlate')}
              />
              <Box marginTop="15px"></Box>
              <TextField id="address" label="Address" value={guest.address} onChange={valueChangeHandler('address')} />
              <Box marginTop="15px"></Box>
              <TextField id="state" label="State" value={guest.state} onChange={valueChangeHandler('state')} />
              <Box marginTop="15px"></Box>
              <TextField id="zip" label="Zip" value={guest.zip} onChange={valueChangeHandler('zip')} />
              <Box marginTop="15px"></Box>
            </FormControl>
          </Box>
        </Paper>
      )}
      <Box display="flex" justifyContent="center" alignItems="center" marginTop="15px">
        <Button
          variant="contained"
          onClick={() => {
            if (roomId) history.goBack();
            else history.push(`/guest/${guestId}/profile`);
          }}
        >
          Cancel
        </Button>
        <Box marginLeft="15px"></Box>
        <Button
          variant="contained"
          color="success"
          onClick={() => {
            if (roomId) {
              const newGuest = { ...guest };
              delete newGuest.guestId;
              addGuestWithID(firestore, guestId, newGuest)
                .then(() => {
                  history.push(`/guest/${guestId}/${roomId}/currentStay`);
                })
                .catch(() => {
                  dispatch(globalActions.setSnackBar({ message: 'Error creating profile', severity: 'error' }));
                });
            } else {
              updateGuest(firestore, guest.guestId || '', guest)
                .then(() => {
                  history.push(`/guest/${guestId}/profile`);
                  dispatch(globalActions.setSnackBar({ message: 'Profile updated', severity: 'success' }));
                })
                .catch(() => {
                  dispatch(globalActions.setSnackBar({ message: 'Error updating profile', severity: 'error' }));
                });
            }
          }}
        >
          Confirm
        </Button>
      </Box>
    </DetailsPage>
  );
};
