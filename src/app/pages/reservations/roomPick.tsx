/** Jake Hamo */

import { Paper, Table, TableHead, TableRow, TableCell, TableBody } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { DetailsPage } from '../layout/detailsPage';
import { daysBetweenDates, roomStatus } from 'app/helpers/helpers';
import React from 'react';
import { FirebaseContext } from 'app/app';
import { collection } from '@firebase/firestore';
import { useSelector } from 'react-redux';
import { selectReservations, selectRooms } from 'app/redux/hotel.selector';
import { Theme } from '@mui/system';
import { useHistory } from 'react-router';
import moment from 'moment';
import { IRoom } from 'app/models/room';
import { AlertDialog } from 'app/components/dialog';
import { updateRoom } from 'app/firebase/helpers';
import _ from 'lodash';

/**
 * Create styles for this component
 */
const useStyles = makeStyles((theme: Theme) => ({
  room: {
    padding: '12px 24px',
  },
  /** style for the inner paper component */
  paper: {
    // margin: '50px',
  },
  tableRow: {
    '&:hover': {
      background: theme.palette.mode === 'light' ? '#e6e6e6' : '#595959',
      cursor: 'pointer',
    },
  },
}));

export const RoomPick = () => {
  const classes = useStyles();
  const rooms = useSelector(selectRooms);
  const history = useHistory();

  const onNavigate = (room: IRoom) => () => {
    history.push(`/guest/0/${room.roomId}/currentStay`);
  };

  return (
    /** Create a list for each of the rooms.
     * This list is wrapped in a paper component for visual purposes */
    <DetailsPage title="Rooms">
      <Paper className={classes.paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Room Number</TableCell>
              <TableCell>Room Type</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rooms.map(room => (
              <TableRow className={classes.tableRow} onClick={onNavigate(room)}>
                <TableCell>{room.roomNumber}</TableCell>
                <TableCell>{room.roomType}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Paper>
    </DetailsPage>
  );
};
