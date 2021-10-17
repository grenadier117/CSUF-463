export interface IReservation {
  roomId: number;
  guestId: number;
  checkIn: string;
  checkOut: string;
  active: boolean;
  payment: number;
  balance: number;
}
