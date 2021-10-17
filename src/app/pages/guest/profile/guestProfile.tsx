import { Typography, Grid, Divider, Paper } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { Theme } from '@mui/system';
import { IGuest } from 'app/models/guest';
import customerList from 'assets/json/customerList.json';
import React from 'react';
import { useParams } from 'react-router';

const useStyles = makeStyles((theme: Theme) => ({
  label: {
    textAlign: 'end',
  },
}));

export const GuestProfile = () => {
  const classes = useStyles();
  const [guest, setGuest] = React.useState<IGuest | undefined>(undefined);
  const { guestId } = useParams<any>();

  console.info('@JAKE - guest', guestId);

  React.useEffect(() => {
    const foundId = customerList.map(item => item.guestId).indexOf(parseInt(guestId));
    debugger;
    if (foundId !== undefined && foundId !== -1) {
      const a = customerList[foundId];
      console.info('@JAKE - guest info', a);
      setGuest(a);
    }
  }, [guestId]);

  const Row = ({ label, value }) => (
    <tr>
      <td className={classes.label}>
        <Typography color="text">{label}:</Typography>
      </td>
      <td>
        <Typography color="text">{value}</Typography>
      </td>
    </tr>
  );

  return (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <Typography color="primary" variant="h5">
          {`Guest Profile`}
        </Typography>
      </Grid>
      <Grid item xs={12}>
        <Divider />
      </Grid>
      <Grid item xs={12}>
        {guest && (
          <Paper>
            <table cellPadding="6px 12px">
              <Row label="Name" value={`${guest.first} ${guest.last}`} />
              <Row label="Phone Number" value={`${guest.phone}`} />
              <Row label="Email" value={`${guest.email}`} />
              <Row label="Address" value={`${guest.address}`} />
              <Row label="License Place" value={`${guest.licensePlate}`} />
            </table>
          </Paper>
        )}
      </Grid>
    </Grid>
  );
};
