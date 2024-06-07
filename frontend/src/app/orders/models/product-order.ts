export enum StateProductOrder {
  'En preparación' = 'En preparación',
  'Listo para envío' = 'Listo para envío',
  'Pedido al proveedor' = 'Pedido al proveedor',
}

export class ProductOrderClass {
  id: string;
  name: string;
  price: number;
  quantity: number;
  state: StateProductOrder;
  order_id: string;

  constructor(
    id: string,
    name: string,
    price: number,
    quantity: number,
    state: StateProductOrder,
    order_id: string
  ) {
    this.id = id;
    this.name = name;
    this.price = price;
    this.quantity = quantity;
    this.state = state;
    this.order_id = order_id;
  }
}
