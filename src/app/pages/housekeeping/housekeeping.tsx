/** Arqum Ahmed */

import { Button, Paper, Table, TableBody, TableCell, TableHead, TableRow } from '@mui/material';
import { roomStatus } from 'app/helpers/helpers';
import { DetailsPage } from '../layout/detailsPage';
import { useSelector } from 'react-redux';
import { selectReservations, selectRooms } from 'app/redux/hotel.selector';
import Checkbox from '@mui/material/Checkbox';
import React from 'react';
import _ from 'lodash';
import { IRoom } from 'app/models/room';
import { updateRoom } from 'app/firebase/helpers';
import { FirebaseContext } from 'app/app';

export const Housekeeping = () => {
  const reservations = useSelector(selectReservations);
  const rooms = useSelector(selectRooms);
  const [editingRowID, setEditingRowID] = React.useState<number | undefined>(undefined);
  const [editHousekeep, setEditHousekeep] = React.useState<{ [key: string]: any }>({});
  const { firestore } = React.useContext(FirebaseContext);

  const isEditing = index => editingRowID !== undefined && editingRowID === index;

  const updateValue = key => event => {
    setEditHousekeep(prev =>
      _.cloneDeep({
        ...prev,
        [key]: event.target.checked,
      }),
    );
  };

  const onSave = room => {
    const r: Omit<IRoom, 'roomId'> = {
      ...room,
      maintenance: editHousekeep.maintenance,
      clean:
        !editHousekeep.bathroom &&
        !editHousekeep.towels &&
        !editHousekeep.bedsheets &&
        !editHousekeep.vacuum &&
        !editHousekeep.dusting &&
        !editHousekeep.electronics,
      housekeeping: {
        ...editHousekeep,
      },
    };
    updateRoom(firestore, room.roomId, r);
  };

  return (
    <DetailsPage title="Housekeeping">
      <Paper>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Housekeep Name</TableCell>
              <TableCell>Room Number</TableCell>
              <TableCell>Room Type</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Bathroom</TableCell>
              <TableCell>Towels</TableCell>
              <TableCell>Bed Sheets</TableCell>
              <TableCell>Vacuum</TableCell>
              <TableCell>Dusting</TableCell>
              <TableCell>Electronics</TableCell>
              <TableCell>Maintenance</TableCell>
              <TableCell />
            </TableRow>
          </TableHead>
          <TableBody>
            {rooms
              // .filter(room => !room.clean)
              .map((room, index) => {
                const housekeep = room.housekeeping;
                const foundReservations = reservations.filter(reservation => reservation.roomId === room.roomId);
                return (
                  <TableRow key={index}>
                    <TableCell>{housekeep.name}</TableCell>
                    <TableCell>{room.roomNumber}</TableCell>
                    <TableCell>{room.roomType}</TableCell>
                    <TableCell>{roomStatus(foundReservations, room.roomId, room.maintenance, room.clean)}</TableCell>
                    <TableCell>
                      <Checkbox
                        onChange={updateValue('bathroom')}
                        checked={isEditing(index) ? editHousekeep.bathroom : housekeep.bathroom}
                        disabled={isEditing(index) ? false : true}
                      />
                    </TableCell>
                    <TableCell>
                      <Checkbox
                        onChange={updateValue('towels')}
                        checked={isEditing(index) ? editHousekeep.towels : housekeep.towels}
                        disabled={isEditing(index) ? false : true}
                      />
                    </TableCell>
                    <TableCell>
                      <Checkbox
                        onChange={updateValue('bedsheets')}
                        checked={isEditing(index) ? editHousekeep.bedsheets : housekeep.bedsheets}
                        disabled={isEditing(index) ? false : true}
                      />
                    </TableCell>
                    <TableCell>
                      <Checkbox
                        onChange={updateValue('vacuum')}
                        checked={isEditing(index) ? editHousekeep.vacuum : housekeep.vacuum}
                        disabled={isEditing(index) ? false : true}
                      />
                    </TableCell>
                    <TableCell>
                      <Checkbox
                        onChange={updateValue('dusting')}
                        checked={isEditing(index) ? editHousekeep.dusting : housekeep.dusting}
                        disabled={isEditing(index) ? false : true}
                      />
                    </TableCell>
                    <TableCell>
                      <Checkbox
                        onChange={updateValue('electronics')}
                        checked={isEditing(index) ? editHousekeep.electronics : housekeep.electronics}
                        disabled={isEditing(index) ? false : true}
                      />
                    </TableCell>
                    <TableCell>
                      <Checkbox
                        onChange={updateValue('maintenance')}
                        checked={isEditing(index) ? editHousekeep.maintenance : room.maintenance}
                        disabled={isEditing(index) ? false : true}
                      />
                    </TableCell>
                    {editingRowID === undefined && (
                      <TableCell>
                        <Button
                          onClick={() => {
                            setEditingRowID(index);
                            setEditHousekeep({ ...room.housekeeping, maintenance: room.maintenance });
                            /** */
                          }}
                        >
                          Edit
                        </Button>
                      </TableCell>
                    )}
                    {editingRowID !== undefined && index === editingRowID && (
                      <TableCell>
                        <Button
                          onClick={() => {
                            setEditingRowID(undefined);
                            setEditHousekeep({});
                            onSave(room);
                            /** */
                          }}
                        >
                          Save
                        </Button>
                      </TableCell>
                    )}
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </Paper>
    </DetailsPage>
  );
};
