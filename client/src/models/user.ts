import { Plant } from './plant';

export class User {
  name: String;
  email: String;
  password: String;
  phone?: String;
  zone: Number;
  zip: Number;
  garden?: Array<Plant>;
}
