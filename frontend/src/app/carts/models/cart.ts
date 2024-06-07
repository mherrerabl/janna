import { ProductCartClass } from './product-cart';

export class CartClass {
  id: string;
  user_id: string;
  total_price: number;
  products_cart: ProductCartClass[];

  constructor(
    id: string,
    user_id: string,
    total_price: number,
    products_cart: ProductCartClass[]
  ) {
    this.id = id;
    this.user_id = user_id;
    this.total_price = total_price;
    this.products_cart = products_cart;
  }
}
