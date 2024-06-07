export enum Offer {
  offer1 = '3x2',
  offer2 = '2n 50%',
}
export class PriceClass {
  id: string;
  price: number;
  offer: Offer | null;
  discount: number | null;

  constructor(
    id: string,
    price: number,
    offer: Offer | null,
    discount: number | null
  ) {
    this.id = id;
    this.price = price;
    this.offer = offer;
    this.discount = discount;
  }
}
