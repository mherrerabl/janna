import { Offer } from './price';

export interface PriceDTO {
  id: string;
  price: number;
  offer: Offer | null;
  discount: number | null;
}
