/** Duc Nguyen */

import {
  Typography,
  Paper,
  Button,
  Box,
  TextField,
  FormControl,
} from "@mui/material";
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

export const GuestEdit = () => {
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

  const getDefaultValue = (field) => {
    switch (field) {
      case "first":
        return guest?.first;
      case "last":
        return guest?.last;
      case "email":
        return guest?.email;
      case "phone":
        return guest?.phone;
      case "licensePlate":
        return guest?.licensePlate;
      case "address":
        return guest?.address;
      case "state":
        return guest?.state;
      case "zip":
        return guest?.zip;
      default:
        return "";
    }
  };

  const valueChangeHandler = (field, event) => {
    switch (field) {
      case "first":
        // setGuest({...guest, first: event?.target?.value});
        break;
      case "last":
        return guest?.last;
      case "email":
        return guest?.email;
      case "phone":
        return guest?.phone;
      case "licensePlate":
        return guest?.licensePlate;
      case "address":
        return guest?.address;
      case "state":
        return guest?.state;
      case "zip":
        return guest?.zip;
      default:
        return "";
    }
  }

  return (
    <DetailsPage title="Guest Profile">
      {guest && (
        <Paper>
          <Box justifyContent="center" display="flex">
            <FormControl
              component="fieldset"
              variant="outlined"
              sx={{ width: "50ch" }}
            >
              <Box marginTop="15px"></Box>
              <TextField
                id="first"
                label="First Name"
                defaultValue={getDefaultValue("first")}
                onChange={(event) => valueChangeHandler("first", event)}
              />
              <Box marginTop="15px"></Box>
              <TextField
                id="last"
                label="Last Name"
                defaultValue={getDefaultValue("last")}
              />
              <Box marginTop="15px"></Box>
              <TextField
                id="email"
                label="Email"
                defaultValue={getDefaultValue("email")}
              />
              <Box marginTop="15px"></Box>
              <TextField
                id="phone"
                label="Phone"
                defaultValue={getDefaultValue("phone")}
              />
              <Box marginTop="15px"></Box>
              <TextField
                id="licensePlate"
                label="License Plate"
                defaultValue={getDefaultValue("licensePlate")}
              />
              <Box marginTop="15px"></Box>
              <TextField
                id="address"
                label="Address"
                defaultValue={getDefaultValue("address")}
              />
              <Box marginTop="15px"></Box>
              <TextField
                id="state"
                label="State"
                defaultValue={getDefaultValue("state")}
              />
              <Box marginTop="15px"></Box>
              <TextField
                id="zip"
                label="Zip"
                defaultValue={getDefaultValue("zip")}
              />
              <Box marginTop="15px"></Box>
            </FormControl>
          </Box>
        </Paper>
      )}
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        marginTop="15px"
      >
        <Button
          variant="contained"
          onClick={() => {
            history.push(`/guest/${guestId}/profile`);
          }}
        >
          Cancel
        </Button>
        <Box marginLeft="15px"></Box>
        <Button
          variant="contained"
          color="success"
          onClick={() => {
            // history.push(`/guest/${guestId}/profile`);
          }}
        >
          Confirm
        </Button>
      </Box>
    </DetailsPage>
  );
};
