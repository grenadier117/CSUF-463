export interface IGuest {
  guestId?: string;
  first: string;
  last: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  zip: string;
  licensePlate: string;
  email: string;
}

export const defaultGuest: IGuest = {
  guestId: undefined,
  first: '',
  last: '',
  phone: '',
  address: '',
  city: '',
  state: '',
  zip: '',
  licensePlate: '',
  email: '',
};
