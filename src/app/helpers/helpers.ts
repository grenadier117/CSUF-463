import { IReservation } from 'app/models/reservation';
import moment from 'moment';

export const roomStatus = (reservations: IReservation[], roomId: string, maintainance: boolean, clean: boolean) => {
  const today = moment();
  let status = '';
  const reservationsFound = reservations.filter(
    res => res.roomId === roomId && moment(res.checkIn) <= today && today <= moment(res.checkOut),
  );
  if (reservationsFound.length > 0 || !clean || maintainance) {
    //found reservation for this room for for today
    status = 'Unavailable';
    if (reservationsFound.length > 0) status += '/Occupied';
    else if (maintainance) status += '/Maintenance';
    else if (!clean) status += '/Dirty';
  } else {
    status = 'Available';
  }
  return status;
};

export const daysBetweenDates = (from: string, to: string): number => {
  const a = moment(to);
  const b = moment(from);
  const days = a.diff(b, 'days');
  return days;
};

export const calculateTotalCharge = (roomRate, checkIn, checkOut) => {
  return roomRate * daysBetweenDates(checkIn, checkOut);
};

export const calculateBalance = (roomRate: number, checkIn: string, checkOut: string, payment: number) => {
  return roomRate * daysBetweenDates(checkIn, checkOut) - payment;
};
