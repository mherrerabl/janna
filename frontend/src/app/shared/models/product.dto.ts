import { ImageClass } from '../../images/models/image';
import { PriceClass } from './price';

export interface ProductDTO {
  id: string;
  variation_id: string | null;
  name: string;
  price: PriceClass;
  image: ImageClass;
  quantity: number;
  stock: number;
}
