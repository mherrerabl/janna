import { ActionReducerMap } from '@ngrx/store';
import { AddressEffects } from './addresses/effects';
import * as AddressReducer from './addresses/reducers';
import { CategoryEffects } from './categories/effects';
import * as CategoryReducer from './categories/reducers';
import { ImageEffects } from './images/effects';
import * as ImageReducer from './images/reducers';
import { MailEffects } from './mail/effects';
import * as MailReducer from './mail/reducers';
import { ProductEffects } from './products/effects';
import * as ProductReducer from './products/reducers';
import * as SpinnerReducer from './spinner/reducer';
import { TreatmentEffects } from './treatments/effects';
import * as TreatmentReducer from './treatments/reducers';
import { UserEffects } from './users/effects';
import * as UserReducer from './users/reducers';

import { OrderEffects } from './orders/effects';
import * as OrderReducer from './orders/reducers';

import { AppointmentEffects } from './appointments/effects';
import * as AppointmentReducer from './appointments/reducers';

import { UserTreatmentEffects } from './user-treatments/effects';
import * as UserTreatmentReducer from './user-treatments/reducers';

import { CartEffects } from './carts/effects';
import * as CartstReducer from './carts/reducers';

export interface AppState {
  mail: MailReducer.MailState;
  images: ImageReducer.ImagesState;
  user: UserReducer.UserState;
  address: AddressReducer.AddressesState;
  order: OrderReducer.OrdersState;
  appointment: AppointmentReducer.AppointmentsState;
  userTreatment: UserTreatmentReducer.UserTreatmentsState;
  categories: CategoryReducer.CategoriesState;
  treatments: TreatmentReducer.TreatmentsState;
  products: ProductReducer.ProductsState;
  carts: CartstReducer.CartsState;
  spinner: SpinnerReducer.SpinnerState;
}

export const appReducers: ActionReducerMap<AppState> = {
  mail: MailReducer.mailReducer,
  images: ImageReducer.imagesReducer,
  user: UserReducer.userReducer,
  address: AddressReducer.addressesReducer,
  order: OrderReducer.ordersReducer,
  userTreatment: UserTreatmentReducer.userTreatmentsReducer,
  appointment: AppointmentReducer.appointmentsReducer,
  categories: CategoryReducer.categoriesReducer,
  treatments: TreatmentReducer.treatmentsReducer,
  products: ProductReducer.productsReducer,
  carts: CartstReducer.cartsReducer,
  spinner: SpinnerReducer.spinnerReducer,
};

export const EffectsArray: any[] = [
  MailEffects,
  ImageEffects,
  UserEffects,
  AddressEffects,
  OrderEffects,
  AppointmentEffects,
  UserTreatmentEffects,
  UserEffects,
  CategoryEffects,
  TreatmentEffects,
  ProductEffects,
  CartEffects,
];
