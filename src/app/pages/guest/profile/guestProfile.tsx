/** Duc Nguyen */

import { Typography, Paper, Button, Box } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { Theme } from "@mui/system";
import { IGuest } from "app/models/guest";
import { DetailsPage } from "app/pages/layout/detailsPage";
import { selectGuests } from "app/redux/hotel.selector";
import React from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router";
import { useHistory } from "react-router-dom";

const useStyles = makeStyles((theme: Theme) => ({
  label: {
    textAlign: "end",
  },
}));

export const GuestProfile = () => {
  const classes = useStyles();
  const history = useHistory();
  const [guest, setGuest] = React.useState<IGuest | undefined>(undefined);
  const { guestId } = useParams<any>();
  const customerList = useSelector(selectGuests);

  React.useEffect(() => {
    const foundId = customerList.map((item) => item.guestId).indexOf(guestId);
    if (foundId !== undefined && foundId !== -1) {
      const a = customerList[foundId];
      setGuest(a);
    }
  }, [guestId, customerList]);

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
    <DetailsPage title="Guest Profile">
      {guest && (
        <Paper>
          <table cellPadding="6px 12px">
            <Row label="Name" value={`${guest.first} ${guest.last}`} />
            <Row label="Phone Number" value={`${guest.phone}`} />
            <Row label="Email" value={`${guest.email}`} />
            <Row
              label="Address"
              value={`${guest.address} ${guest.city}, ${guest.state} ${guest.zip}`}
            />
            <Row label="License Place" value={`${guest.licensePlate}`} />
          </table>
        </Paper>
      )}
      <Box display="flex" justifyContent="center" alignItems="center" marginTop="15px">
        <Button
          variant="contained"
          color="warning"
          onClick={() => {
            history.push(`/guest/${guestId}/edit`);
          }}
        >
          Edit
        </Button>
      </Box>
    </DetailsPage>
  );
};
