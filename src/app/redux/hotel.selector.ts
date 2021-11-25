import { createSelector } from '@reduxjs/toolkit';
import { IHotel } from 'app/models/hotel';
import { RootState } from 'types';
import { initialState } from './hotel.redux';

const selectDomain = (state: RootState) => state?.hotel || initialState;

export const selectRooms = createSelector([selectDomain], (hotelState: IHotel) => hotelState.rooms || []);

export const selectGuests = createSelector([selectDomain], (hotelState: IHotel) => hotelState.guests || []);

export const selectReservations = createSelector([selectDomain], (hotelState: IHotel) => hotelState.reservations || []);
