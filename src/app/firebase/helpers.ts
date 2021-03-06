import { IGuest } from 'app/models/guest';
import { IReservation } from 'app/models/reservation';
import { IRoom } from 'app/models/room';
import { Firestore, doc, updateDoc, setDoc, collection, deleteDoc } from 'firebase/firestore';
import _ from 'lodash';

// # REGION Rooms
/**
 * Update a room that already exists in firebase
 * @param firestore firestire instance
 * @param id Firebase document ID
 * @param room full room data to be updated
 */
export const updateRoom = (firestore: Firestore, id: string, room: Omit<IRoom, 'roomId'>) => {
  return updateDoc(doc(collection(firestore, 'rooms'), `/${id}`), {
    ...room,
  });
};
// #ENDREGION

// #REGION GUESTS
export const updateGuest = (firestore: Firestore, id: string | undefined, guest: Omit<IGuest, 'guestId'>) => {
  const newGuest = _.cloneDeep(guest);
  delete newGuest.guestId;
  return updateDoc(doc(collection(firestore, 'guests'), `/${id}`), {
    ...newGuest,
  });
};

export const addGuest = (firestore: Firestore, guest: Omit<IGuest, 'guestId'>) => {
  const promise = new Promise((resolve, reject) => {
    const id = makeDocHash(20);
    setDoc(doc(firestore, 'guests', id), guest)
      .then(() => {
        resolve(id);
      })
      .catch(error => {
        reject(error);
      });
  });
  return promise;
};

export const addGuestWithID = (firestore: Firestore, id: string, guest: Omit<IGuest, 'guestId'>) => {
  return setDoc(doc(firestore, 'guests', id), guest);
};

export const deleteGuest = (firestore: Firestore, id: string) => {
  return deleteDoc(doc(collection(firestore, 'guests'), `/${id}`));
};
// #ENDREGION

// #REGION RESERVATIONS
export const updateReservation = (
  firestore: Firestore,
  id: string,
  reservation: Omit<IReservation, 'reservationId'>,
) => {
  return updateDoc(doc(collection(firestore, 'reservations'), `/${id}`), {
    ...reservation,
  });
};

export const addReservation = (firestore: Firestore, reservation: Omit<IReservation, 'reservationId'>) => {
  return setDoc(doc(firestore, 'reservations', makeDocHash(20)), reservation);
};

export const deleteReservation = (firestore: Firestore, id: string) => {
  return deleteDoc(doc(collection(firestore, 'reservations'), `/${id}`));
};
// #ENDREGION

export const makeDocHash = len => {
  let result = '';
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  const charactersLength = characters.length;
  for (let i = 0; i < len; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
};
