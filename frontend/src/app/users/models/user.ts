export enum TypeUser {
  'user' = 'user',
  'admin' = 'admin',
}

export class UserClass {
  id: string;
  name: string;
  surname: string;
  password: string;
  email: string;
  phone: number | null;
  type: TypeUser;
  token: string;
  _token?: any;

  constructor(
    id: string,
    name: string,
    surname: string,
    password: string,
    email: string,
    phone: number | null,
    type: TypeUser,
    token: string
  ) {
    this.id = id;
    this.name = name;
    this.surname = surname;
    this.password = password;
    this.email = email;
    this.phone = phone;
    this.type = type;
    this.token = token;
  }
}
