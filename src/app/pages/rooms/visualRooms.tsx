import { Grid, Paper } from '@mui/material';
import { makeStyles } from '@mui/styles';
import rooms from 'assets/json/rooms.json';

/**
 * Create styles for this component
 */
const useStyles = makeStyles({
  /** style for the grid container */
  container: {
    height: 'calc(100vh - 64px)',
    justifyContent: 'space-evenly',
    width: '100%',
    display: 'flex',
    padding: '0px 12px',
  },
  room: {
    justifyContent: 'space-evenly',
  },
  /** style for the inner paper component */
  paper: {
    // padding: '50px',
    height: '100px',
    width: '100%',
    alignItems: 'center',
    display: 'flex',
    justifyContent: 'center',
  },
});

export const VisualRooms = () => {
  /**
   * use the custom hook for styles to be able to use them in this component
   * Each style class compiles to a string value that is used with className
   */
  const classes = useStyles();
  return (
    /** Create a grid for each of the rooms.
     * The outer grid is a container for all of the grid items in it */
    <Grid container wrap="nowrap" spacing={2} className={classes.container} alignItems="center">
      {rooms.map((room, index) => (
        /**
         * This is a grid item (used within a Grid container)
         */
        <Grid className={classes.room} key={index} item style={{ width: `${100 / rooms.length }%`}}>
          {/* Paper component to display each room */}
          <Paper className={classes.paper}>{`Room ${room.roomId}`}</Paper>
        </Grid>
      ))}
    </Grid>
  );
};
