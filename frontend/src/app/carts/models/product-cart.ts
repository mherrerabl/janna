import { ProductDTO } from '../../shared/models/product.dto';

export class ProductCartClass {
  id: string;
  product_id: string;
  quantity: number;
  cart_id: string;
  product?: ProductDTO;

  constructor(
    id: string,
    product_id: string,
    quantity: number,
    cart_id: string
  ) {
    this.id = id;
    this.product_id = product_id;
    this.quantity = quantity;
    this.cart_id = cart_id;
  }
}
