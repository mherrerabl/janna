export class AddressClass {
  id: string;
  name: string;
  address: string;
  number: number | string;
  additionalInfo: string;
  zip: string;
  city: string;
  predetermined: boolean;
  user_id: string;

  constructor(
    id: string,
    name: string,
    address: string,
    number: number | string,
    additionalInfo: string,
    zip: string,
    city: string,
    predetermined: boolean,
    user_id: string
  ) {
    this.id = id;
    this.name = name;
    this.address = address;
    this.number = number;
    this.additionalInfo = additionalInfo;
    this.zip = zip;
    this.city = city;
    this.predetermined = predetermined;
    this.user_id = user_id;
  }
}
