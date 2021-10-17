import { Divider, Grid, List, ListItem, ListItemText, Paper, Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';
import rooms from 'assets/json/rooms.json';
import reservations from 'assets/json/reservations.json';
import React from 'react';
import moment from 'moment';

/**
 * Create styles for this component
 */
const useStyles = makeStyles({
  room: {
    padding: '12px 24px',
  },
  /** style for the inner paper component */
  paper: {
    margin: '50px',
  },
});

export const RoomList = () => {
  /**
   * use the custom hook for styles to be able to use them in this component
   * Each style class compiles to a string value that is used with className
   */
  const classes = useStyles();
  return (
    /** Create a list for each of the rooms.
     * This list is wrapped in a paper component for visual purposes */
    <Paper className={classes.paper}>
      <List>
        {/* Map the rooms that exist in the json file */}
        {rooms.map((room, index) => {
          /** find any reservation the corresponds to the given room */
          const reservation = reservations.find(item => item.roomId === room.roomId);
          return (
            <React.Fragment key={index}>
              {/* Display a list item with the room number, guest name, and reservation dates */}
              <ListItem>
                <ListItemText
                  primary={
                    // Typograhy for displaying text. This compiles to a p tag in html
                    <Typography color="text" variant="h4">
                      {`Room ${room.roomId}`}
                    </Typography>
                  }
                  // secondary={
                  //   reservation && (
                  //     <Grid container direction="column">
                  //       <Grid item>
                  //         {/* Typograhy for displaying text. This compiles to a p tag in html */}
                  //         <Typography color="text" variant="h5">
                  //           {`Guest: ${reservation?.firstName} ${reservation?.lastName}`}
                  //         </Typography>
                  //       </Grid>
                  //       <Grid item>
                  //         <Typography color="text" variant="h6">
                  //           {`Stay: ${moment(reservation.fromDate).format('MM/DD/YYYY')} - ${moment(
                  //             reservation.toDate,
                  //           ).format('MM/DD/YYYY')}`}
                  //         </Typography>
                  //       </Grid>
                  //     </Grid>
                  //   )
                  // }
                />
              </ListItem>
              {/* Add a divider between the list items */}
              {index !== rooms.length - 1 && <Divider />}
            </React.Fragment>
          );
        })}
      </List>
    </Paper>
  );
};
