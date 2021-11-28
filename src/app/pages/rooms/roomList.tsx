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

export const RoomList = () => {
  const classes = useStyles();
  const reservations = useSelector(selectReservations);
  const rooms = useSelector(selectRooms);
  const history = useHistory();
  const [updateDirty, setUpdateDirty] = React.useState<boolean>(false);
  const [updateMaintenance, setUpdateMaintenance] = React.useState<boolean>(false);
  const { firestore } = React.useContext(FirebaseContext);
  const [alertRoom, setAlertRoom] = React.useState<IRoom>();

  const onNavigate = (room: IRoom) => () => {
    const today = moment();
    const r = reservations.filter(
      res => res.roomId === room.roomId && moment(res.checkIn) <= today && today <= moment(res.checkOut),
    );
    if (r.length > 0) {
      history.push(`/guest/${r[0].guestId}/${room.roomId}/currentStay`);
    } else if (!room.clean) {
      setUpdateDirty(true);
      setAlertRoom(room);
    } else if (room.maintenance) {
      setUpdateMaintenance(true);
      setAlertRoom(room);
    } else {
      history.push(`/guest/0/${room.roomId}/currentStay`);
    }
  };

  const _handleNo = () => {
    setUpdateDirty(false);
    setUpdateMaintenance(false);
    setAlertRoom(undefined);
  };

  const _handleUpdateDirty = () => {
    if (alertRoom) {
      const r = _.cloneDeep(alertRoom);
      delete r.roomId;
      updateRoom(firestore, alertRoom.roomId, {
        ...r,
        clean: true,
        housekeeping: {
          bathroom: false,
          bedsheets: false,
          dusting: false,
          electronics: false,
          name: r.housekeeping.name,
          towels: false,
          vacuum: false,
        },
      });
      _handleNo();
    }
  };

  const _handleUpdateMaintenance = () => {
    if (alertRoom) {
      const r = _.cloneDeep(alertRoom);
      delete r.roomId;
      updateRoom(firestore, alertRoom.roomId, {
        ...r,
        maintenance: false,
      });
      _handleNo();
    }
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
              <TableCell>Status</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rooms.map(room => (
              <TableRow className={classes.tableRow} onClick={onNavigate(room)}>
                <TableCell>{room.roomNumber}</TableCell>
                <TableCell>{room.roomType}</TableCell>
                <TableCell>{roomStatus(reservations, room.roomId, room.maintenance, room.clean)}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Paper>
      <AlertDialog
        open={updateDirty}
        title={'Reset Dirty Status?'}
        content={'This will reset the dirty status of the room and make the room available again.'}
        handleYes={_handleUpdateDirty}
        handleNo={_handleNo}
      />
      <AlertDialog
        open={updateMaintenance}
        title={'Reset Maintenance Status?'}
        content={'This will reset the maintenance status of the room and make the room available again.'}
        handleYes={_handleUpdateMaintenance}
        handleNo={_handleNo}
      />
    </DetailsPage>
  );
};
