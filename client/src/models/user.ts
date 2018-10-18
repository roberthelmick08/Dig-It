import { Plant } from './plant';

export class User {
  _id: string;
  name: string;
  email: string;
  password: string;
  isAdmin: boolean;
  phone?: string;
  zone: number;
  zip: number;
  garden?: Array<Plant>;
  exp: number;
  iat: number;
}
