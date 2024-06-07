import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { catchError, exhaustMap, finalize, map, of } from 'rxjs';
import { SharedService } from '../../shared/services/shared.service';
import { isLoading } from '../../spinner/actions/spinner.actions';
import * as OrderActions from '../actions';
import { OrderService } from '../services/order.service';

@Injectable()
export class OrderEffects {
  private responseOK: boolean;
  private errorResponse: any;

  constructor(
    private actions$: Actions,
    private orderService: OrderService,
    private sharedService: SharedService,
    private store: Store
  ) {
    this.responseOK = false;
  }

  getOrders$ = createEffect(() =>
    this.actions$.pipe(
      ofType(OrderActions.getAllOrders),
      exhaustMap(() =>
        this.orderService.getOrders().pipe(
          map((orders) => {
            this.store.dispatch(isLoading({ status: false }));
            return OrderActions.getAllOrdersSuccess({
              orders: orders,
            });
          }),
          catchError((error) => {
            return of(OrderActions.getAllOrdersFailure({ payload: error }));
          })
        )
      )
    )
  );
  getOrdersFailure$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(OrderActions.getAllOrdersFailure),
        map((error) => {
          this.store.dispatch(isLoading({ status: false }));
          this.responseOK = false;
          this.errorResponse = error.payload.error;
          this.sharedService.errorLog(error.payload.error);
        })
      ),
    { dispatch: false }
  );

  getOrderByUserId$ = createEffect(() =>
    this.actions$.pipe(
      ofType(OrderActions.getOrderByUserId),
      exhaustMap(({ userId }) =>
        this.orderService.getOrderByUserId(userId).pipe(
          map((orders) => {
            this.store.dispatch(isLoading({ status: false }));
            return OrderActions.getOrderByUserIdSuccess({
              orders: orders,
            });
          }),
          catchError((error) => {
            return of(OrderActions.getOrderByUserIdFailure({ payload: error }));
          })
        )
      )
    )
  );

  getOrderByUserIdFailure$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(OrderActions.getOrderByUserIdFailure),
        map((error) => {
          this.store.dispatch(isLoading({ status: false }));
          this.errorResponse = error.payload.error;
          this.sharedService.errorLog(error.payload.error);
        })
      ),
    { dispatch: false }
  );

  createOrder$ = createEffect(() =>
    this.actions$.pipe(
      ofType(OrderActions.createOrder),
      exhaustMap(({ order }) =>
        this.orderService.createOrder(order).pipe(
          map((order) => {
            return OrderActions.createOrderSuccess({
              order: order,
            });
          }),
          catchError((error) => {
            return of(OrderActions.createOrderFailure({ payload: error }));
          }),
          finalize(async () => {
            setTimeout(() => {
              this.sharedService.notification(
                'orderFeedback',
                this.responseOK,
                this.errorResponse,
                'Se ha creado un nuevo pedido.'
              );
            }, 100);
          })
        )
      )
    )
  );

  createOrderSuccess$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(OrderActions.createOrderSuccess),
        map(() => {
          this.store.dispatch(isLoading({ status: false }));
          this.responseOK = true;
        })
      ),
    { dispatch: false }
  );

  createOrderFailure$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(OrderActions.createOrderFailure),
        map((error) => {
          this.store.dispatch(isLoading({ status: false }));
          this.responseOK = false;
          this.errorResponse = error.payload.error;
          this.sharedService.errorLog(error.payload.error);
        })
      ),
    { dispatch: false }
  );

  updateOrder$ = createEffect(() =>
    this.actions$.pipe(
      ofType(OrderActions.updateOrder),
      exhaustMap(({ orderId, order }) =>
        this.orderService.updateOrder(orderId, order).pipe(
          map((order) => {
            return OrderActions.updateOrderSuccess({
              order: order,
            });
          }),
          catchError((error) => {
            return of(OrderActions.updateOrderFailure({ payload: error }));
          }),
          finalize(async () => {
            setTimeout(() => {
              this.sharedService.notification(
                'orderFeedback',
                this.responseOK,
                this.errorResponse,
                'Se ha actualizado el pedido.'
              );
            }, 100);
          })
        )
      )
    )
  );

  updateOrderSuccess$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(OrderActions.updateOrderSuccess),
        map(() => {
          this.store.dispatch(isLoading({ status: false }));
          this.responseOK = true;
        })
      ),
    { dispatch: false }
  );

  updateOrderFailure$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(OrderActions.updateOrderFailure),
        map((error) => {
          this.store.dispatch(isLoading({ status: false }));
          this.responseOK = false;
          this.errorResponse = error.payload.error;
          this.sharedService.errorLog(error.payload.error);
        })
      ),
    { dispatch: false }
  );

  updateOrderState$ = createEffect(() =>
    this.actions$.pipe(
      ofType(OrderActions.updateOrderState),
      exhaustMap(({ sessionId, state }) =>
        this.orderService.updateOrderState(sessionId, state).pipe(
          map((order) => {
            return OrderActions.updateOrderStateSuccess({
              order: order,
            });
          }),
          catchError((error) => {
            return of(OrderActions.updateOrderStateFailure({ payload: error }));
          }),
          finalize(async () => {
            setTimeout(() => {
              this.sharedService.notification(
                'orderFeedback',
                this.responseOK,
                this.errorResponse,
                'Se ha actualizado el pedido.'
              );
            }, 100);
          })
        )
      )
    )
  );

  updateOrderStateSuccess$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(OrderActions.updateOrderStateSuccess),
        map(() => {
          this.store.dispatch(isLoading({ status: false }));
          this.responseOK = true;
        })
      ),
    { dispatch: false }
  );

  updateOrderStateFailure$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(OrderActions.updateOrderStateFailure),
        map((error) => {
          this.store.dispatch(isLoading({ status: false }));
          this.responseOK = false;
          this.errorResponse = error.payload.error;
          this.sharedService.errorLog(error.payload.error);
        })
      ),
    { dispatch: false }
  );
  deleteOrder$ = createEffect(() =>
    this.actions$.pipe(
      ofType(OrderActions.deleteOrder),
      exhaustMap(({ orderId }) =>
        this.orderService.deleteOrder(orderId).pipe(
          map(() => {
            this.store.dispatch(isLoading({ status: false }));
            return OrderActions.deleteOrderSuccess({
              orderId: orderId,
            });
          }),
          catchError((error) => {
            return of(OrderActions.deleteOrderFailure({ payload: error }));
          })
        )
      )
    )
  );

  deleteOrderFailure$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(OrderActions.deleteOrderFailure),
        map((error) => {
          this.store.dispatch(isLoading({ status: false }));
          this.errorResponse = error.payload.error;
          this.sharedService.errorLog(error.payload.error);
        })
      ),
    { dispatch: false }
  );
}
