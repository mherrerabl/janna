import { PriceClass } from '../../shared/models/price';

export class ProductVariationClass {
  id: string;
  name: string;
  stock: number;
  price_id: string;
  purchasePrice: number;
  color: string;
  product_id: string;
  product_variation_id: string;
  creation_date: Date;
  price?: PriceClass;
  variations?: ProductVariationClass[];

  constructor(
    id: string,
    name: string,
    stock: number,
    price_id: string,
    purchasePrice: number,
    color: string,
    product_id: string,
    product_variation_id: string,
    creation_date: Date
  ) {
    this.id = id;
    this.name = name;
    this.stock = stock;
    this.price_id = price_id;
    this.purchasePrice = purchasePrice;
    this.color = color;
    this.product_id = product_id;
    this.product_variation_id = product_variation_id;
    this.creation_date = creation_date;
  }
}
