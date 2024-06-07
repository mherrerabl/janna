import { StateProductOrder } from '../../orders/models/product-order';

export interface ListProductsDTO {
  quantity: number;
  name: string;
  price: number;
  state: StateProductOrder;
}
