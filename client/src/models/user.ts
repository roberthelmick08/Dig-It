import { Plant } from './plant';

export class User {
  name: string;
  email: string;
  password: string;
  isAdmin: boolean;
  phone?: string;
  zone: number;
  zip: number;
  garden?: Array<Plant>;
}
