import moment from 'moment';

export interface IReservation {
  reservationId: string;
  roomId: string;
  guestId: string;
  checkIn?: string;
  checkOut?: string;
  active: boolean;
  payment: number;
  balance: number;
  dateMade?: string;
  website: boolean;
  isCheckedIn: boolean;
}

export const defaultReservation: IReservation = {
  reservationId: '',
  roomId: '',
  guestId: '',
  checkIn: moment().format('MM/DD/YYYY'),
  checkOut: moment().format('MM/DD/YYYY'),
  active: false,
  payment: 0,
  balance: 0,
  dateMade: moment().format('MM/DD/YYYY'),
  website: false,
  isCheckedIn: false,
};
