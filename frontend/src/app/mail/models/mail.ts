export class MailClass {
  name: string;
  surname: string;
  email: string;
  query: string;
  confirmPrivacity: boolean;

  constructor(
    name: string,
    surname: string,
    email: string,
    query: string,
    confirmPrivacity: boolean
  ) {
    this.name = name;
    this.surname = surname;
    this.email = email;
    this.query = query;
    this.confirmPrivacity = confirmPrivacity;
  }
}
