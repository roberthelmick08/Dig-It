import { GardenPlant } from './gardenPlant';

export class User {
  _id: string;
  name: string;
  email: string;
  password: string;
  isAdmin: boolean;
  phone?: string;
  zone: number;
  zip: number;
  garden?: Array<GardenPlant>;
  exp?: number;
  iat?: number;
}
