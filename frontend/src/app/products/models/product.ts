import { ImageClass } from '../../images/models/image';
import { PriceClass } from '../../shared/models/price';
import { ProductVariationClass } from './product-variation';

export enum Routine {
  'init',
  'Desmaquillante',
  'Limpiador',
  'Exfoliante',
  'Tónico',
  'Mascarilla',
  'Esencia',
  'Sérum',
  'Contorno de ojos',
  'Hidratante',
  'Protector solar',
}

export class ProductClass {
  id: string;
  name: string;
  brand: string;
  category_id: string;
  description: string;
  routine: Routine;
  use: string;
  benefits: string;
  saleperson_id: string;
  stock: number;
  price_id: string;
  purchasePrice: number;
  trend: boolean;
  forSale: boolean;
  treatment_id: string;
  creation_date: Date;
  price?: PriceClass;
  images?: ImageClass[];
  variations?: ProductVariationClass[];

  constructor(
    id: string,
    name: string,
    brand: string,
    category_id: string,
    description: string,
    routine: Routine,
    use: string,
    benefits: string,
    saleperson_id: string,
    stock: number,
    price_id: string,
    purchasePrice: number,
    trend: boolean,
    forSale: boolean,
    treatment_id: string,
    creation_date: Date
  ) {
    this.id = id;
    this.name = name;
    this.brand = brand;
    this.category_id = category_id;
    this.description = description;
    this.routine = routine;
    this.use = use;
    this.benefits = benefits;
    this.saleperson_id = saleperson_id;
    this.stock = stock;
    this.price_id = price_id;
    this.purchasePrice = purchasePrice;
    this.trend = trend;
    this.forSale = forSale;
    this.treatment_id = treatment_id;
    this.creation_date = creation_date;
  }
}
