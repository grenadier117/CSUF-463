export interface IRoom {
  roomId: string;
  roomType: string;
  roomNumber: number;
  roomRate: number;
  available: boolean;
  maintenance: boolean;
  clean: boolean;
  housekeeping: {
    name: string;
    bathroom: boolean;
    towels: boolean;
    bedsheets: boolean;
    vacuum: boolean;
    dusting: boolean;
    electronics: boolean;
  };
}
