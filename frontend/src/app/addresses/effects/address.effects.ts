import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { catchError, exhaustMap, finalize, map, of } from 'rxjs';
import { SharedService } from '../../shared/services/shared.service';
import { isLoading } from '../../spinner/actions/spinner.actions';
import * as AddressActions from '../actions';
import { AddressService } from '../services/address.service';

@Injectable()
export class AddressEffects {
  private responseOK: boolean;
  private errorResponse: any;

  constructor(
    private actions$: Actions,
    private addressService: AddressService,
    private sharedService: SharedService,
    private store: Store
  ) {
    this.responseOK = false;
  }

  getAddresses$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AddressActions.getAllAddresses),
      exhaustMap(() =>
        this.addressService.getAddresses().pipe(
          map((addresses) => {
            this.store.dispatch(isLoading({ status: false }));
            return AddressActions.getAllAddressesSuccess({
              addresses: addresses,
            });
          }),
          catchError((error) => {
            return of(
              AddressActions.getAllAddressesFailure({ payload: error })
            );
          })
        )
      )
    )
  );
  getAddressesFailure$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(AddressActions.getAllAddressesFailure),
        map((error) => {
          this.store.dispatch(isLoading({ status: false }));
          this.responseOK = false;
          this.errorResponse = error.payload.error;
          this.sharedService.errorLog(error.payload.error);
        })
      ),
    { dispatch: false }
  );

  getAddressById$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AddressActions.getAddressById),
      exhaustMap(({ addressId }) =>
        this.addressService.getAddressById(addressId).pipe(
          map((address) => {
            this.store.dispatch(isLoading({ status: false }));
            return AddressActions.getAddressByIdSuccess({
              address: address,
            });
          }),
          catchError((error) => {
            return of(AddressActions.getAddressByIdFailure({ payload: error }));
          })
        )
      )
    )
  );

  getAddressByIdFailure$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(AddressActions.getAddressByIdFailure),
        map((error) => {
          this.store.dispatch(isLoading({ status: false }));
          this.errorResponse = error.payload.error;
          this.sharedService.errorLog(error.payload.error);
        })
      ),
    { dispatch: false }
  );

  getAddressByUserId$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AddressActions.getAddressByUserId),
      exhaustMap(({ userId }) =>
        this.addressService.getAddressByUserId(userId).pipe(
          map((addresses) => {
            this.store.dispatch(isLoading({ status: false }));
            return AddressActions.getAddressByUserIdSuccess({
              addresses: addresses,
            });
          }),
          catchError((error) => {
            return of(
              AddressActions.getAddressByUserIdFailure({ payload: error })
            );
          })
        )
      )
    )
  );

  getAddressByUserIdFailure$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(AddressActions.getAddressByUserIdFailure),
        map((error) => {
          this.store.dispatch(isLoading({ status: false }));
          this.errorResponse = error.payload.error;
          this.sharedService.errorLog(error.payload.error);
        })
      ),
    { dispatch: false }
  );

  createAddress$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AddressActions.createAddress),
      exhaustMap(({ address }) =>
        this.addressService.createAddress(address).pipe(
          map((address) => {
            return AddressActions.createAddressSuccess({
              address: address,
            });
          }),
          catchError((error) => {
            return of(AddressActions.createAddressFailure({ payload: error }));
          }),
          finalize(async () => {
            setTimeout(() => {
              this.sharedService.notification(
                'addressFeedback',
                this.responseOK,
                this.errorResponse,
                'Se ha creado una nueva dirección.'
              );
            }, 100);
          })
        )
      )
    )
  );

  createAddressSuccess$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(AddressActions.createAddressSuccess),
        map(() => {
          this.store.dispatch(isLoading({ status: false }));
          this.responseOK = true;
        })
      ),
    { dispatch: false }
  );

  createAddressFailure$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(AddressActions.createAddressFailure),
        map((error) => {
          this.store.dispatch(isLoading({ status: false }));
          this.responseOK = false;
          this.errorResponse = error.payload.error;
          this.sharedService.errorLog(error.payload.error);
        })
      ),
    { dispatch: false }
  );

  updateAddress$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AddressActions.updateAddress),
      exhaustMap(({ addressId, address }) =>
        this.addressService.updateAddress(addressId, address).pipe(
          map((address) => {
            return AddressActions.updateAddressSuccess({
              address: address,
            });
          }),
          catchError((error) => {
            return of(AddressActions.updateAddressFailure({ payload: error }));
          }),
          finalize(async () => {
            setTimeout(() => {
              this.sharedService.notification(
                'addressFeedback',
                this.responseOK,
                this.errorResponse,
                'Se ha actualizado la dirección.'
              );
            }, 100);
          })
        )
      )
    )
  );

  updateAddressSuccess$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(AddressActions.updateAddressSuccess),
        map(() => {
          this.store.dispatch(isLoading({ status: false }));
          this.responseOK = true;
        })
      ),
    { dispatch: false }
  );

  updateAddressFailure$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(AddressActions.updateAddressFailure),
        map((error) => {
          this.store.dispatch(isLoading({ status: false }));
          this.responseOK = false;
          this.errorResponse = error.payload.error;
          this.sharedService.errorLog(error.payload.error);
        })
      ),
    { dispatch: false }
  );

  deleteAddress$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AddressActions.deleteAddress),
      exhaustMap(({ addressId }) =>
        this.addressService.deleteAddress(addressId).pipe(
          map(() => {
            this.store.dispatch(isLoading({ status: false }));
            return AddressActions.deleteAddressSuccess({
              addressId: addressId,
            });
          }),
          catchError((error) => {
            return of(AddressActions.deleteAddressFailure({ payload: error }));
          })
        )
      )
    )
  );

  deleteAddressFailure$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(AddressActions.deleteAddressFailure),
        map((error) => {
          this.store.dispatch(isLoading({ status: false }));
          this.errorResponse = error.payload.error;
          this.sharedService.errorLog(error.payload.error);
        })
      ),
    { dispatch: false }
  );
}
