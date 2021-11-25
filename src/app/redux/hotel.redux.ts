import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IGuest } from 'app/models/guest';
import { IHotel } from 'app/models/hotel';
import { IReservation } from 'app/models/reservation';
import { IRoom } from 'app/models/room';

export const initialState: IHotel = {
  guests: [],
  rooms: [],
  reservations: [],
};

const hotelSlice = createSlice({
  name: 'hotel',
  initialState: initialState,
  reducers: {
    setGuests(state, action: PayloadAction<IGuest[]>) {
      return {
        ...state,
        guests: [...(action.payload || [])],
      };
    },
    setReservations(state, action: PayloadAction<IReservation[]>) {
      return {
        ...state,
        reservations: [...(action.payload || [])],
      };
    },
    setRooms(state, action: PayloadAction<IRoom[]>) {
      return {
        ...state,
        rooms: [...(action.payload || [])],
      };
    },
  },
});

const { actions } = hotelSlice;

export const { reducer: hotelReducer, name: hotelSliceKey } = hotelSlice;
export const hotelActions = {
  ...actions,
};
