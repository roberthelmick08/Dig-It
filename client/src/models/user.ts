import { GardenPlant } from './gardenPlant';

export class User {
  _id: string;
  email: string;
  password: string;
  isAdmin: boolean;
  phone?: number;
  zone: number;
  lastFrostDate: Date;
  firstFrostDate: Date;
  zip: number;
  garden?: Array<GardenPlant>;
  exp?: number;
  iat?: number;
}
