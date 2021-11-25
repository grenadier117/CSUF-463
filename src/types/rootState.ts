import { IGlobal } from 'app/global/global.redux';
import { IHotel } from 'app/models/hotel';

export interface RootState {
  global?: IGlobal;
  hotel?: IHotel;
}
