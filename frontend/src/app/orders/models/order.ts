import { AddressClass } from '../../addresses/models/address';
import { ProductOrderClass } from './product-order';

export enum StateOrder {
  'Pago realizado' = 'Pago realizado',
  'En preparación' = 'En preparación',
  'Pendiente de envío' = 'Pendiente de envío',
  'Enviado' = 'Enviado',
  'Pendiente de recoger en tienda' = 'Pendiente de recoger en tienda',
  'Entregado' = 'Entregado',
}

export class OrderClass {
  id: string;
  user_id: string;
  total_price: number;
  address_id: string;
  state: StateOrder;
  creation_date: Date;
  modification_date: Date;
  products?: ProductOrderClass[];
  address?: AddressClass;

  constructor(
    id: string,
    user_id: string,
    total_price: number,
    address_id: string,
    state: StateOrder,
    creation_date: Date,
    modification_date: Date
  ) {
    this.id = id;
    this.user_id = user_id;
    this.total_price = total_price;
    this.address_id = address_id;
    this.state = state;
    this.creation_date = creation_date;
    this.modification_date = modification_date;
  }
}
