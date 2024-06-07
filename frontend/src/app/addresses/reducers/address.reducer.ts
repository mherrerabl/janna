import { Action, createReducer, on } from '@ngrx/store';
import {
  createAddress,
  createAddressFailure,
  createAddressSuccess,
  deleteAddress,
  deleteAddressFailure,
  deleteAddressSuccess,
  getAddressById,
  getAddressByIdFailure,
  getAddressByIdSuccess,
  getAddressByUserId,
  getAddressByUserIdFailure,
  getAddressByUserIdSuccess,
  getAllAddresses,
  getAllAddressesFailure,
  getAllAddressesSuccess,
  resetState,
  updateAddress,
  updateAddressFailure,
  updateAddressSuccess,
} from '../actions';
import { AddressClass } from '../models/address';

export interface AddressesState {
  addresses: AddressClass[];
  address: AddressClass;
  loading: boolean;
  loaded: boolean;
  error: any;
}

export const initialState: AddressesState = {
  addresses: new Array<AddressClass>(),
  address: new AddressClass('', '', '', 0, '', '', '', false, ''),
  loading: false,
  loaded: false,
  error: null,
};

const _addressesReducer = createReducer(
  initialState,
  on(getAllAddresses, (state) => ({
    ...state,
    loading: true,
    loaded: false,
    error: null,
  })),
  on(getAllAddressesSuccess, (state, action) => ({
    ...state,
    addresses: action.addresses,
    loading: false,
    loaded: true,
    error: null,
  })),
  on(getAllAddressesFailure, (state, { payload }) => ({
    ...state,
    loading: false,
    loaded: false,
    error: { payload },
  })),

  on(getAddressById, (state) => ({
    ...state,
    loading: true,
    loaded: false,
    error: null,
  })),
  on(getAddressByIdSuccess, (state, action) => ({
    ...state,
    address: action.address,
    loading: false,
    loaded: true,
    error: null,
  })),
  on(getAddressByIdFailure, (state, { payload }) => ({
    ...state,
    loading: false,
    loaded: false,
    error: { payload },
  })),

  on(getAddressByUserId, (state) => ({
    ...state,
    loading: true,
    loaded: false,
    error: null,
  })),
  on(getAddressByUserIdSuccess, (state, action) => ({
    ...state,
    addresses: action.addresses,
    loading: false,
    loaded: true,
    error: null,
  })),
  on(getAddressByUserIdFailure, (state, { payload }) => ({
    ...state,
    loading: false,
    loaded: false,
    error: { payload },
  })),

  on(createAddress, (state) => ({
    ...state,
    loading: true,
    loaded: false,
    error: null,
  })),
  on(createAddressSuccess, (state, action) => ({
    ...state,
    address: action.address,
    loading: false,
    loaded: true,
    error: null,
  })),
  on(createAddressFailure, (state, { payload }) => ({
    ...state,
    loading: false,
    loaded: false,
    error: { payload },
  })),

  on(updateAddress, (state) => ({
    ...state,
    loading: true,
    loaded: false,
    error: null,
  })),
  on(updateAddressSuccess, (state, action) => ({
    ...state,
    address: action.address,
    loading: false,
    loaded: true,
    error: null,
  })),
  on(updateAddressFailure, (state, { payload }) => ({
    ...state,
    loading: false,
    loaded: false,
    error: { payload },
  })),

  on(deleteAddress, (state) => ({
    ...state,
    loading: true,
    loaded: false,
    error: null,
  })),
  on(deleteAddressSuccess, (state, { addressId }) => ({
    ...state,
    addresses: [...state.addresses.filter(({ id }) => id !== addressId)],
    loading: false,
    loaded: true,
    error: null,
  })),
  on(deleteAddressFailure, (state, { payload }) => ({
    ...state,
    loading: false,
    loaded: false,
    error: { payload },
  })),
  on(resetState, (state) => ({
    ...state,
    addresses: initialState.addresses,
    address: initialState.address,
    loading: false,
    loaded: true,
    error: null,
  }))
);

export function addressesReducer(
  state: AddressesState | undefined,
  action: Action
): AddressesState {
  return _addressesReducer(state, action);
}
