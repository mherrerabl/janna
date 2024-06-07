import { HttpErrorResponse } from '@angular/common/http';
import { createAction, props } from '@ngrx/store';
import { OrderClass } from '../models/order';

export const getAllOrders = createAction('[Orders list] Get orders list');
export const getAllOrdersSuccess = createAction(
  '[Orders list] Get orders list success',
  props<{ orders: OrderClass[] }>()
);

export const getAllOrdersFailure = createAction(
  '[Orders list] Get orders list fail',
  props<{ payload: HttpErrorResponse }>()
);

export const getOrderByUserId = createAction(
  '[Order detail] Get order detail by user id',
  props<{ userId: string }>()
);
export const getOrderByUserIdSuccess = createAction(
  '[Order detail] Get order detail by user id success',
  props<{ orders: OrderClass[] }>()
);

export const getOrderByUserIdFailure = createAction(
  '[Order detail] Get order detail by user id fail',
  props<{ payload: HttpErrorResponse }>()
);

export const createOrder = createAction(
  '[Order form] Create new order',
  props<{ order: OrderClass }>()
);

export const createOrderSuccess = createAction(
  '[Order form] Create new order success',
  props<{ order: OrderClass }>()
);

export const createOrderFailure = createAction(
  '[Order form] Create new order fail',
  props<{ payload: HttpErrorResponse }>()
);

export const updateOrder = createAction(
  '[Order form] Update order',
  props<{ orderId: string; order: OrderClass }>()
);

export const updateOrderSuccess = createAction(
  '[Order form] Update order success',
  props<{ order: OrderClass }>()
);

export const updateOrderFailure = createAction(
  '[Order form] Update order fail',
  props<{ payload: HttpErrorResponse }>()
);

export const updateOrderState = createAction(
  '[Order form] Update order state',
  props<{ sessionId: string; state: string }>()
);

export const updateOrderStateSuccess = createAction(
  '[Order form] Update order state success',
  props<{ order: OrderClass }>()
);

export const updateOrderStateFailure = createAction(
  '[Order form] Update order state fail',
  props<{ payload: HttpErrorResponse }>()
);

export const deleteOrder = createAction(
  '[Order form] Delete order',
  props<{ orderId: string }>()
);

export const deleteOrderSuccess = createAction(
  '[Order form] Delete order success',
  props<{ orderId: string }>()
);

export const deleteOrderFailure = createAction(
  '[Order form] Delete order fail',
  props<{ payload: HttpErrorResponse }>()
);
