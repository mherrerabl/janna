import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { catchError, exhaustMap, finalize, map, of } from 'rxjs';
import { SharedService } from '../../shared/services/shared.service';
import { isLoading } from '../../spinner/actions/spinner.actions';
import * as UserTreatmentActions from '../actions';
import { UserTreatmentService } from '../services/user-treatments.service';

@Injectable()
export class UserTreatmentEffects {
  private responseOK: boolean;
  private errorResponse: any;

  constructor(
    private actions$: Actions,
    private userTreatmentService: UserTreatmentService,
    private sharedService: SharedService,
    private store: Store
  ) {
    this.responseOK = false;
  }

  getUserTreatments$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UserTreatmentActions.getAllUserTreatments),
      exhaustMap(() =>
        this.userTreatmentService.getUserTreatments().pipe(
          map((userTreatments) => {
            this.store.dispatch(isLoading({ status: false }));
            return UserTreatmentActions.getAllUserTreatmentsSuccess({
              userTreatments: userTreatments,
            });
          }),
          catchError((error) => {
            return of(
              UserTreatmentActions.getAllUserTreatmentsFailure({
                payload: error,
              })
            );
          })
        )
      )
    )
  );
  getUserTreatmentsFailure$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(UserTreatmentActions.getAllUserTreatmentsFailure),
        map((error) => {
          this.store.dispatch(isLoading({ status: false }));
          this.responseOK = false;
          this.errorResponse = error.payload.error;
          this.sharedService.errorLog(error.payload.error);
        })
      ),
    { dispatch: false }
  );

  getUserTreatmentByUserId$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UserTreatmentActions.getUserTreatmentByUserId),
      exhaustMap(({ userId }) =>
        this.userTreatmentService.getUserTreatmentByUserId(userId).pipe(
          map((userTreatments) => {
            this.store.dispatch(isLoading({ status: false }));
            return UserTreatmentActions.getUserTreatmentByUserIdSuccess({
              userTreatments: userTreatments,
            });
          }),
          catchError((error) => {
            return of(
              UserTreatmentActions.getUserTreatmentByUserIdFailure({
                payload: error,
              })
            );
          })
        )
      )
    )
  );

  getUserTreatmentByUserIdFailure$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(UserTreatmentActions.getUserTreatmentByUserIdFailure),
        map((error) => {
          this.store.dispatch(isLoading({ status: false }));
          this.errorResponse = error.payload.error;
          this.sharedService.errorLog(error.payload.error);
        })
      ),
    { dispatch: false }
  );

  createUserTreatment$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UserTreatmentActions.createUserTreatment),
      exhaustMap(({ userTreatment }) =>
        this.userTreatmentService.createUserTreatment(userTreatment).pipe(
          map((userTreatment) => {
            return UserTreatmentActions.createUserTreatmentSuccess({
              userTreatment: userTreatment,
            });
          }),
          catchError((error) => {
            return of(
              UserTreatmentActions.createUserTreatmentFailure({
                payload: error,
              })
            );
          }),
          finalize(async () => {
            setTimeout(() => {
              this.sharedService.notification(
                'userTreatmentFeedback',
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

  createUserTreatmentSuccess$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(UserTreatmentActions.createUserTreatmentSuccess),
        map(() => {
          this.store.dispatch(isLoading({ status: false }));
          this.responseOK = true;
        })
      ),
    { dispatch: false }
  );

  createUserTreatmentFailure$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(UserTreatmentActions.createUserTreatmentFailure),
        map((error) => {
          this.store.dispatch(isLoading({ status: false }));
          this.responseOK = false;
          this.errorResponse = error.payload.error;
          this.sharedService.errorLog(error.payload.error);
        })
      ),
    { dispatch: false }
  );

  updateUserTreatment$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UserTreatmentActions.updateUserTreatment),
      exhaustMap(({ userTreatmentId, userTreatment }) =>
        this.userTreatmentService
          .updateUserTreatment(userTreatmentId, userTreatment)
          .pipe(
            map((userTreatment) => {
              return UserTreatmentActions.updateUserTreatmentSuccess({
                userTreatment: userTreatment,
              });
            }),
            catchError((error) => {
              return of(
                UserTreatmentActions.updateUserTreatmentFailure({
                  payload: error,
                })
              );
            }),
            finalize(async () => {
              setTimeout(() => {
                this.sharedService.notification(
                  'userTreatmentFeedback',
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

  updateUserTreatmentSuccess$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(UserTreatmentActions.updateUserTreatmentSuccess),
        map(() => {
          this.store.dispatch(isLoading({ status: false }));
          this.responseOK = true;
        })
      ),
    { dispatch: false }
  );

  updateUserTreatmentFailure$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(UserTreatmentActions.updateUserTreatmentFailure),
        map((error) => {
          this.store.dispatch(isLoading({ status: false }));
          this.responseOK = false;
          this.errorResponse = error.payload.error;
          this.sharedService.errorLog(error.payload.error);
        })
      ),
    { dispatch: false }
  );

  deleteUserTreatment$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UserTreatmentActions.deleteUserTreatment),
      exhaustMap(({ userTreatmentId }) =>
        this.userTreatmentService.deleteUserTreatment(userTreatmentId).pipe(
          map(() => {
            this.store.dispatch(isLoading({ status: false }));
            return UserTreatmentActions.deleteUserTreatmentSuccess({
              userTreatmentId: userTreatmentId,
            });
          }),
          catchError((error) => {
            return of(
              UserTreatmentActions.deleteUserTreatmentFailure({
                payload: error,
              })
            );
          })
        )
      )
    )
  );

  deleteUserTreatmentFailure$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(UserTreatmentActions.deleteUserTreatmentFailure),
        map((error) => {
          this.store.dispatch(isLoading({ status: false }));
          this.errorResponse = error.payload.error;
          this.sharedService.errorLog(error.payload.error);
        })
      ),
    { dispatch: false }
  );
}
