import { HttpErrorResponse } from '@angular/common/http';
import { createAction, props } from '@ngrx/store';
import { ShipmentDTO } from '../../shared/models/shipment.dto';
import { CartClass } from '../models/cart';
import { ProductCartClass } from '../models/product-cart';

export const getCarts = createAction('[Carts list] Get carts list');
export const getCartsSuccess = createAction(
  '[Carts list] Get carts list success',
  props<{ carts: CartClass[] }>()
);

export const getCartsFailure = createAction(
  '[Carts list] Get carts list fail',
  props<{ payload: HttpErrorResponse }>()
);

export const getCartById = createAction(
  '[Cart detail] Get cart detail by user id',
  props<{ cartId: string }>()
);
export const getCartByIdSuccess = createAction(
  '[Cart detail] Get cart detail by user id success',
  props<{ cart: CartClass }>()
);

export const getCartByIdFailure = createAction(
  '[Cart detail] Get cart detail by user id fail',
  props<{ payload: HttpErrorResponse }>()
);

export const getCartByUserId = createAction(
  '[Cart detail] Get cart detail by user id',
  props<{ userId: string }>()
);
export const getCartByUserIdSuccess = createAction(
  '[Cart detail] Get cart detail by user id success',
  props<{ cart: CartClass }>()
);

export const getCartByUserIdFailure = createAction(
  '[Cart detail] Get cart detail by user id fail',
  props<{ payload: HttpErrorResponse }>()
);

export const addProduct = createAction(
  '[Cart] Add product',
  props<{ userId: string; product: ProductCartClass }>()
);

export const addProductSuccess = createAction(
  '[Cart] Add product success',
  props<{ cart: CartClass }>()
);

export const addProductFailure = createAction(
  '[Cart] Add product fail',
  props<{ payload: HttpErrorResponse }>()
);

export const removeProduct = createAction(
  '[Cart] Remove product',
  props<{ userId: string; productId: string }>()
);

export const removeProductSuccess = createAction(
  '[Cart] Remove product success',
  props<{ cart: CartClass }>()
);

export const removeProductFailure = createAction(
  '[Cart] Remove product fail',
  props<{ payload: HttpErrorResponse }>()
);
export const addQuantity = createAction(
  '[Cart] Add quantity',
  props<{ userId: string; productId: string }>()
);

export const addQuantitySuccess = createAction(
  '[Cart] Add quantity success',
  props<{ cart: CartClass }>()
);

export const addQuantityFailure = createAction(
  '[Cart] Add quantity fail',
  props<{ payload: HttpErrorResponse }>()
);

export const removeQuantity = createAction(
  '[Cart] Remove quantity',
  props<{ userId: string; productId: string }>()
);

export const removeQuantitySuccess = createAction(
  '[Cart] Remove quantity success',
  props<{ cart: CartClass }>()
);

export const removeQuantityFailure = createAction(
  '[Cart] Remove quantity fail',
  props<{ payload: HttpErrorResponse }>()
);
export const createCart = createAction(
  '[Cart form] Create new cart',
  props<{ cart: CartClass }>()
);

export const createCartSuccess = createAction(
  '[Cart form] Create new cart success',
  props<{ cart: CartClass }>()
);

export const createCartFailure = createAction(
  '[Cart form] Create new cart fail',
  props<{ payload: HttpErrorResponse }>()
);

export const updateCart = createAction(
  '[Cart form] Update cart',
  props<{ cartId: string; cart: CartClass }>()
);

export const updateCartSuccess = createAction(
  '[Cart form] Update cart success',
  props<{ cart: CartClass }>()
);

export const updateCartFailure = createAction(
  '[Cart form] Update cart fail',
  props<{ payload: HttpErrorResponse }>()
);

export const deleteCart = createAction(
  '[Cart form] Delete cart',
  props<{ cartId: string }>()
);

export const deleteCartSuccess = createAction(
  '[Cart form] Delete cart success',
  props<{ cartId: string }>()
);

export const deleteCartFailure = createAction(
  '[Cart form] Delete cart fail',
  props<{ payload: HttpErrorResponse }>()
);

export const deleteProductsCart = createAction(
  '[Cart form] Delete products cart',
  props<{ cartId: string }>()
);

export const deleteProductsCartSuccess = createAction(
  '[Cart form] Delete products cart success',
  props<{ cart: CartClass }>()
);

export const deleteProductsCartFailure = createAction(
  '[Cart form] Delete products cart fail',
  props<{ payload: HttpErrorResponse }>()
);

export const saveShipment = createAction(
  '[Checkout shipment form] Address shipment order',
  props<{ shipment: ShipmentDTO }>()
);

export const resetState = createAction('[Cart] Reset Cart');
