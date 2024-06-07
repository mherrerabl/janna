import { Action, createReducer, on } from '@ngrx/store';
import {
  createOrder,
  createOrderFailure,
  createOrderSuccess,
  deleteOrder,
  deleteOrderFailure,
  deleteOrderSuccess,
  getAllOrders,
  getAllOrdersFailure,
  getAllOrdersSuccess,
  getOrderByUserId,
  getOrderByUserIdFailure,
  getOrderByUserIdSuccess,
  updateOrder,
  updateOrderFailure,
  updateOrderState,
  updateOrderStateFailure,
  updateOrderStateSuccess,
  updateOrderSuccess,
} from '../actions';
import { OrderClass, StateOrder } from '../models/order';

export interface OrdersState {
  orders: OrderClass[];
  order: OrderClass;
  loading: boolean;
  loaded: boolean;
  error: any;
}

export const initialState: OrdersState = {
  orders: new Array<OrderClass>(),
  order: new OrderClass(
    '',
    '',
    0,
    '',
    StateOrder['Pago realizado'],
    new Date(),
    new Date()
  ),
  loading: false,
  loaded: false,
  error: null,
};

const _ordersReducer = createReducer(
  initialState,
  on(getAllOrders, (state) => ({
    ...state,
    loading: true,
    loaded: false,
    error: null,
  })),
  on(getAllOrdersSuccess, (state, action) => ({
    ...state,
    orders: action.orders,
    loading: false,
    loaded: true,
    error: null,
  })),
  on(getAllOrdersFailure, (state, { payload }) => ({
    ...state,
    loading: false,
    loaded: false,
    error: { payload },
  })),

  on(getOrderByUserId, (state) => ({
    ...state,
    loading: true,
    loaded: false,
    error: null,
  })),
  on(getOrderByUserIdSuccess, (state, action) => ({
    ...state,
    orders: action.orders,
    loading: false,
    loaded: true,
    error: null,
  })),
  on(getOrderByUserIdFailure, (state, { payload }) => ({
    ...state,
    loading: false,
    loaded: false,
    error: { payload },
  })),

  on(createOrder, (state) => ({
    ...state,
    loading: true,
    loaded: false,
    error: null,
  })),
  on(createOrderSuccess, (state, action) => ({
    ...state,
    order: action.order,
    loading: false,
    loaded: true,
    error: null,
  })),
  on(createOrderFailure, (state, { payload }) => ({
    ...state,
    loading: false,
    loaded: false,
    error: { payload },
  })),

  on(updateOrder, (state) => ({
    ...state,
    loading: true,
    loaded: false,
    error: null,
  })),
  on(updateOrderSuccess, (state, action) => ({
    ...state,
    order: action.order,
    loading: false,
    loaded: true,
    error: null,
  })),
  on(updateOrderFailure, (state, { payload }) => ({
    ...state,
    loading: false,
    loaded: false,
    error: { payload },
  })),

  on(updateOrderState, (state) => ({
    ...state,
    loading: true,
    loaded: false,
    error: null,
  })),
  on(updateOrderStateSuccess, (state, action) => ({
    ...state,
    order: action.order,
    loading: false,
    loaded: true,
    error: null,
  })),
  on(updateOrderStateFailure, (state, { payload }) => ({
    ...state,
    loading: false,
    loaded: false,
    error: { payload },
  })),

  on(deleteOrder, (state) => ({
    ...state,
    loading: true,
    loaded: false,
    error: null,
  })),
  on(deleteOrderSuccess, (state, { orderId }) => ({
    ...state,
    orders: [...state.orders.filter(({ id }) => id !== orderId)],
    loading: false,
    loaded: true,
    error: null,
  })),
  on(deleteOrderFailure, (state, { payload }) => ({
    ...state,
    loading: false,
    loaded: false,
    error: { payload },
  }))
);

export function ordersReducer(
  state: OrdersState | undefined,
  action: Action
): OrdersState {
  return _ordersReducer(state, action);
}
