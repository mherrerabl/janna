import { HttpErrorResponse } from '@angular/common/http';
import { createAction, props } from '@ngrx/store';
import { AddressClass } from '../models/address';

export const getAllAddresses = createAction(
  '[Addresses list] Get addresses list'
);
export const getAllAddressesSuccess = createAction(
  '[Addresses list] Get addresses list success',
  props<{ addresses: AddressClass[] }>()
);

export const getAllAddressesFailure = createAction(
  '[Addresses list] Get addresses list fail',
  props<{ payload: HttpErrorResponse }>()
);

export const getAddressById = createAction(
  '[Address detail] Get address detail by user id',
  props<{ addressId: string }>()
);
export const getAddressByIdSuccess = createAction(
  '[Address detail] Get address detail by user id success',
  props<{ address: AddressClass }>()
);

export const getAddressByIdFailure = createAction(
  '[Address detail] Get address detail by user id fail',
  props<{ payload: HttpErrorResponse }>()
);

export const getAddressByUserId = createAction(
  '[Addresses detail] Get addresses detail by user id',
  props<{ userId: string }>()
);
export const getAddressByUserIdSuccess = createAction(
  '[Addresses detail] Get addresses detail by user id success',
  props<{ addresses: AddressClass[] }>()
);

export const getAddressByUserIdFailure = createAction(
  '[Addresses detail] Get addresses detail by user id fail',
  props<{ payload: HttpErrorResponse }>()
);

export const createAddress = createAction(
  '[Address form] Create new address',
  props<{ address: AddressClass }>()
);

export const createAddressSuccess = createAction(
  '[Address form] Create new address success',
  props<{ address: AddressClass }>()
);

export const createAddressFailure = createAction(
  '[Address form] Create new address fail',
  props<{ payload: HttpErrorResponse }>()
);

export const updateAddress = createAction(
  '[Address form] Update address',
  props<{ addressId: string; address: AddressClass }>()
);

export const updateAddressSuccess = createAction(
  '[Address form] Update address success',
  props<{ address: AddressClass }>()
);

export const updateAddressFailure = createAction(
  '[Address form] Update address fail',
  props<{ payload: HttpErrorResponse }>()
);

export const deleteAddress = createAction(
  '[Address form] Delete address',
  props<{ addressId: string }>()
);

export const deleteAddressSuccess = createAction(
  '[Address form] Delete address success',
  props<{ addressId: string }>()
);

export const deleteAddressFailure = createAction(
  '[Address form] Delete address fail',
  props<{ payload: HttpErrorResponse }>()
);

export const resetState = createAction('[Addresses] Reset Addresses');
