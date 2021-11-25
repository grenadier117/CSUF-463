import { IGuest } from './guest';
import { IReservation } from './reservation';
import { IRoom } from './room';

export interface IHotel {
  guests?: IGuest[];
  rooms?: IRoom[];
  reservations?: IReservation[];
}
