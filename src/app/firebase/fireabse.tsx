import { FirebaseContext } from 'app/app';
import React from 'react';
import { onSnapshot, collection } from 'firebase/firestore';
import { useInjectReducer } from 'utils/redux-injectors';
import { useDispatch } from 'react-redux';
import { IGuest } from 'app/models/guest';
import { IReservation } from 'app/models/reservation';
import { IRoom } from 'app/models/room';
import { hotelActions, hotelReducer, hotelSliceKey } from 'app/redux/hotel.redux';

export const Firebase = props => {
  useInjectReducer({ key: hotelSliceKey, reducer: hotelReducer });
  const dispatch = useDispatch();
  const { firestore } = React.useContext(FirebaseContext);

  React.useEffect(() => {
    const roomsUnsubscribe = onSnapshot(collection(firestore, 'rooms'), querySnapshot => {
      const rooms: IRoom[] = [];
      querySnapshot.forEach(doc => {
        const data = doc.data();
        rooms.push({ ...(data as IRoom), roomId: doc.id });
      });
      dispatch(hotelActions.setRooms(rooms));
    });

    const guestsUnsubscribe = onSnapshot(collection(firestore, 'guests'), querySnapshot => {
      const guests: IGuest[] = [];
      querySnapshot.forEach(doc => {
        const data = doc.data();
        guests.push({ ...(data as IGuest), guestId: doc.id });
      });
      dispatch(hotelActions.setGuests(guests));
    });

    const reservationsUnsubscribe = onSnapshot(collection(firestore, 'reservations'), querySnapshot => {
      const reservations: IReservation[] = [];
      querySnapshot.forEach(doc => {
        const data = doc.data();
        reservations.push({ ...(data as IReservation), reservationId: doc.id });
      });
      dispatch(hotelActions.setReservations(reservations));
    });

    return () => {
      roomsUnsubscribe();
      guestsUnsubscribe();
      reservationsUnsubscribe();
    };
  }, []);

  return props.children;
};
