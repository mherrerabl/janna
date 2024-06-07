import { Action, createReducer, on } from '@ngrx/store';
import { ShipmentDTO } from '../../shared/models/shipment.dto';
import {
  addProduct,
  addProductFailure,
  addProductSuccess,
  addQuantity,
  addQuantityFailure,
  addQuantitySuccess,
  createCart,
  createCartFailure,
  createCartSuccess,
  deleteCart,
  deleteCartFailure,
  deleteCartSuccess,
  deleteProductsCart,
  deleteProductsCartFailure,
  deleteProductsCartSuccess,
  getCartById,
  getCartByIdFailure,
  getCartByIdSuccess,
  getCartByUserId,
  getCartByUserIdFailure,
  getCartByUserIdSuccess,
  getCarts,
  getCartsFailure,
  getCartsSuccess,
  removeProduct,
  removeProductFailure,
  removeProductSuccess,
  removeQuantity,
  removeQuantityFailure,
  removeQuantitySuccess,
  resetState,
  saveShipment,
  updateCart,
  updateCartFailure,
  updateCartSuccess,
} from '../actions';
import { CartClass } from '../models/cart';
import { ProductCartClass } from '../models/product-cart';

export interface CartsState {
  carts: CartClass[];
  cart: CartClass;
  shipment: ShipmentDTO;
  loading: boolean;
  loaded: boolean;
  error: any;
}

export const initialState: CartsState = {
  carts: new Array<CartClass>(),
  cart: new CartClass('', '', 0, new Array<ProductCartClass>()),
  shipment: {
    method: '',
    address: null,
  },
  loading: false,
  loaded: false,
  error: null,
};

const _cartsReducer = createReducer(
  initialState,
  on(getCarts, (state) => ({
    ...state,
    loading: true,
    loaded: false,
    error: null,
  })),
  on(getCartsSuccess, (state, action) => ({
    ...state,
    carts: action.carts,
    loading: false,
    loaded: true,
    error: null,
  })),
  on(getCartsFailure, (state, { payload }) => ({
    ...state,
    loading: false,
    loaded: false,
    error: { payload },
  })),

  on(getCartById, (state) => ({
    ...state,
    loading: true,
    loaded: false,
    error: null,
  })),
  on(getCartByIdSuccess, (state, action) => ({
    ...state,
    cart: action.cart,
    loading: false,
    loaded: true,
    error: null,
  })),
  on(getCartByIdFailure, (state, { payload }) => ({
    ...state,
    loading: false,
    loaded: false,
    error: { payload },
  })),

  on(getCartByUserId, (state) => ({
    ...state,
    loading: true,
    loaded: false,
    error: null,
  })),
  on(getCartByUserIdSuccess, (state, action) => ({
    ...state,
    cart: action.cart,
    loading: false,
    loaded: true,
    error: null,
  })),
  on(getCartByUserIdFailure, (state, { payload }) => ({
    ...state,
    loading: false,
    loaded: false,
    error: { payload },
  })),
  on(addProduct, (state) => ({
    ...state,
    loading: true,
    loaded: false,
    error: null,
  })),
  on(addProductSuccess, (state, action) => ({
    ...state,
    cart: action.cart,
    loading: false,
    loaded: true,
    error: null,
  })),
  on(addProductFailure, (state, { payload }) => ({
    ...state,
    loading: false,
    loaded: false,
    error: { payload },
  })),

  on(removeProduct, (state) => ({
    ...state,
    loading: true,
    loaded: false,
    error: null,
  })),
  on(removeProductSuccess, (state, action) => ({
    ...state,
    cart: action.cart,
    loading: false,
    loaded: true,
    error: null,
  })),
  on(removeProductFailure, (state, { payload }) => ({
    ...state,
    loading: false,
    loaded: false,
    error: { payload },
  })),

  on(addQuantity, (state) => ({
    ...state,
    loading: true,
    loaded: false,
    error: null,
  })),
  on(addQuantitySuccess, (state, action) => ({
    ...state,
    cart: action.cart,
    loading: false,
    loaded: true,
    error: null,
  })),
  on(addQuantityFailure, (state, { payload }) => ({
    ...state,
    loading: false,
    loaded: false,
    error: { payload },
  })),

  on(removeQuantity, (state) => ({
    ...state,
    loading: true,
    loaded: false,
    error: null,
  })),
  on(removeQuantitySuccess, (state, action) => ({
    ...state,
    cart: action.cart,
    loading: false,
    loaded: true,
    error: null,
  })),
  on(removeQuantityFailure, (state, { payload }) => ({
    ...state,
    loading: false,
    loaded: false,
    error: { payload },
  })),

  on(createCart, (state) => ({
    ...state,
    loading: true,
    loaded: false,
    error: null,
  })),
  on(createCartSuccess, (state, action) => ({
    ...state,
    cart: action.cart,
    loading: false,
    loaded: true,
    error: null,
  })),
  on(createCartFailure, (state, { payload }) => ({
    ...state,
    loading: false,
    loaded: false,
    error: { payload },
  })),

  on(updateCart, (state) => ({
    ...state,
    loading: true,
    loaded: false,
    error: null,
  })),
  on(updateCartSuccess, (state, action) => ({
    ...state,
    cart: action.cart,
    loading: false,
    loaded: true,
    error: null,
  })),
  on(updateCartFailure, (state, { payload }) => ({
    ...state,
    loading: false,
    loaded: false,
    error: { payload },
  })),

  on(deleteCart, (state) => ({
    ...state,
    loading: true,
    loaded: false,
    error: null,
  })),
  on(deleteCartSuccess, (state, { cartId }) => ({
    ...state,
    carts: [...state.carts.filter(({ id }) => id !== cartId)],
    loading: false,
    loaded: true,
    error: null,
  })),
  on(deleteCartFailure, (state, { payload }) => ({
    ...state,
    loading: false,
    loaded: false,
    error: { payload },
  })),

  on(deleteProductsCart, (state) => ({
    ...state,
    loading: true,
    loaded: false,
    error: null,
  })),
  on(deleteProductsCartSuccess, (state, action) => ({
    ...state,
    cart: action.cart,
    loading: false,
    loaded: true,
    error: null,
  })),
  on(deleteProductsCartFailure, (state, { payload }) => ({
    ...state,
    loading: false,
    loaded: false,
    error: { payload },
  })),
  on(saveShipment, (state, action) => ({
    ...state,
    shipment: action.shipment,
    loading: false,
    loaded: true,
    error: null,
  })),
  on(resetState, (state) => ({
    ...state,
    cart: initialState.cart,
    loading: false,
    loaded: true,
    error: null,
  }))
);

export function cartsReducer(
  state: CartsState | undefined,
  action: Action
): CartsState {
  return _cartsReducer(state, action);
}
