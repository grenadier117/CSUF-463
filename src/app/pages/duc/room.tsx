import {
  Divider,
  Grid,
  List,
  ListItem,
  ListItemText,
  Paper,
  Typography,
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import { room_list } from "../../global/room_list";
import { customers } from "../../global/customer_list";
import React from "react";
import moment from "moment";

/**
 * Create styles for this component
 */
const useStyles = makeStyles({
  room: {
    padding: "12px 24px",
  },
  /** style for the inner paper component */
  paper: {
    margin: "50px",
  },
});

export const Room = () => {
  /**
   * use the custom hook for styles to be able to use them in this component
   * Each style class compiles to a string value that is used with className
   */
  const classes = useStyles();

  function getInformation(index) {
    const room = room_list[index];
    const guest = customers.find((guest) => guest["id"] == room["guestID"]);
    let alertMessage = "Number: " + room["roomNumber"] + "\n";
    alertMessage += "Type: " + room["roomType"] + "\n";
    alertMessage += "Rate: " + room["roomRate"] + "\n";
    alertMessage += "Total: " + room["totalCharge"] + "\n";
    alertMessage += "Payment: " + room["payment"] + "\n";
    alertMessage += "Balance: " + room["balance"] + "\n";
    alertMessage += "Availability: " + room["availability"] + "\n";
    alertMessage += "Maintainance: " + room["maintainance"] + "\n";
    alertMessage += "Check in: " + room["checkin"] + "\n";
    alertMessage += "Check Out: " + room["checkout"] + "\n";
    if (guest != null)
      alertMessage +=
        "Current Guest: " + guest["first"] + " " + guest["last"] + "\n";
    alert(alertMessage);
  }

  function listEachRoom(room, index) {
    return (
      <React.Fragment key={index}>
        {/* Display a list item with the room number, guest name, and reservation dates */}
        <ListItem onClick={() => getInformation(index)}>
          <ListItemText
            primary={
              // Typograhy for displaying text. This compiles to a p tag in html
              <Typography color="text" variant="h4">
                {`Room ${room.roomNumber}`}
              </Typography>
            }
            secondary={
              !room.availability && (
                <Grid container direction="column">
                  <Grid item>
                    <Typography color="text" variant="h6">
                      {`Stay: ${moment(room.checkin).format(
                        "MM/DD/YYYY"
                      )} - ${moment(room.checkout).format("MM/DD/YYYY")}`}
                    </Typography>
                  </Grid>
                </Grid>
              )
            }
          />
        </ListItem>
        {/* Add a divider between the list items */}
        {index !== room_list.length - 1 && <Divider />}
      </React.Fragment>
    );
  }

  return (
    /** Create a list for each of the rooms.
     * This list is wrapped in a paper component for visual purposes */
    <Paper className={classes.paper}>
      <List>
        {/* Map the rooms that exist in the json file */}
        {room_list.map(listEachRoom)}
      </List>
    </Paper>
  );
};
