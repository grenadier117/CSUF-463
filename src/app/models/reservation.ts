export interface IReservation {
  reservationId: string;
  roomId: string;
  guestId: string;
  checkIn: string;
  checkOut: string;
  active: boolean;
  payment: number;
  balance: number;
  dateMade: string;
  website: boolean;
}
