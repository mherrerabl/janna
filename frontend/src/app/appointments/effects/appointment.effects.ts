import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { catchError, exhaustMap, finalize, map, of } from 'rxjs';
import { SharedService } from '../../shared/services/shared.service';
import { isLoading } from '../../spinner/actions/spinner.actions';
import * as AppointmentActions from '../actions';
import { AppointmentService } from '../services/appointment.service';

@Injectable()
export class AppointmentEffects {
  private responseOK: boolean;
  private errorResponse: any;

  constructor(
    private actions$: Actions,
    private appointmentService: AppointmentService,
    private sharedService: SharedService,
    private store: Store
  ) {
    this.responseOK = false;
  }

  getAppointments$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AppointmentActions.getAppointments),
      exhaustMap(() =>
        this.appointmentService.getAppointments().pipe(
          map((appointments) => {
            this.store.dispatch(isLoading({ status: false }));
            return AppointmentActions.getAppointmentsSuccess({
              appointments: appointments,
            });
          }),
          catchError((error) => {
            return of(
              AppointmentActions.getAppointmentsFailure({ payload: error })
            );
          })
        )
      )
    )
  );
  getAppointmentsFailure$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(AppointmentActions.getAppointmentsFailure),
        map((error) => {
          this.store.dispatch(isLoading({ status: false }));
          this.responseOK = false;
          this.errorResponse = error.payload.error;
          this.sharedService.errorLog(error.payload.error);
        })
      ),
    { dispatch: false }
  );

  getAppointmentByUserId$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AppointmentActions.getAppointmentByUserId),
      exhaustMap(({ userId }) =>
        this.appointmentService.getAppointmentByUserId(userId).pipe(
          map((appointments) => {
            this.store.dispatch(isLoading({ status: false }));
            return AppointmentActions.getAppointmentByUserIdSuccess({
              appointments: appointments,
            });
          }),
          catchError((error) => {
            return of(
              AppointmentActions.getAppointmentByUserIdFailure({
                payload: error,
              })
            );
          })
        )
      )
    )
  );

  getAppointmentByUserIdFailure$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(AppointmentActions.getAppointmentByUserIdFailure),
        map((error) => {
          this.store.dispatch(isLoading({ status: false }));
          this.errorResponse = error.payload.error;
          this.sharedService.errorLog(error.payload.error);
        })
      ),
    { dispatch: false }
  );

  getAppointmentById$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AppointmentActions.getAppointmentById),
      exhaustMap(({ appointmentId }) =>
        this.appointmentService.getAppointmentById(appointmentId).pipe(
          map((appointment) => {
            this.store.dispatch(isLoading({ status: false }));
            return AppointmentActions.getAppointmentByIdSuccess({
              appointment: appointment,
            });
          }),
          catchError((error) => {
            return of(
              AppointmentActions.getAppointmentByIdFailure({
                payload: error,
              })
            );
          })
        )
      )
    )
  );

  getAppointmentByIdFailure$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(AppointmentActions.getAppointmentByIdFailure),
        map((error) => {
          this.store.dispatch(isLoading({ status: false }));
          this.errorResponse = error.payload.error;
          this.sharedService.errorLog(error.payload.error);
        })
      ),
    { dispatch: false }
  );

  createAppointment$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AppointmentActions.createAppointment),
      exhaustMap(({ appointment }) =>
        this.appointmentService.createAppointment(appointment).pipe(
          map((appointment) => {
            return AppointmentActions.createAppointmentSuccess({
              appointment: appointment,
            });
          }),
          catchError((error) => {
            return of(
              AppointmentActions.createAppointmentFailure({ payload: error })
            );
          }),
          finalize(async () => {
            setTimeout(() => {
              this.sharedService.notification(
                'appointmentFeedback',
                this.responseOK,
                this.errorResponse,
                'Se ha creado una nueva cita.'
              );
            }, 100);
          })
        )
      )
    )
  );

  createAppointmentSuccess$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(AppointmentActions.createAppointmentSuccess),
        map(() => {
          this.store.dispatch(isLoading({ status: false }));
          this.responseOK = true;
        })
      ),
    { dispatch: false }
  );

  createAppointmentFailure$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(AppointmentActions.createAppointmentFailure),
        map((error) => {
          this.store.dispatch(isLoading({ status: false }));
          this.responseOK = false;
          this.errorResponse = error.payload.error;
          this.sharedService.errorLog(error.payload.error);
        })
      ),
    { dispatch: false }
  );

  updateAppointment$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AppointmentActions.updateAppointment),
      exhaustMap(({ appointmentId, appointment }) =>
        this.appointmentService
          .updateAppointment(appointmentId, appointment)
          .pipe(
            map((appointment) => {
              return AppointmentActions.updateAppointmentSuccess({
                appointment: appointment,
              });
            }),
            catchError((error) => {
              return of(
                AppointmentActions.updateAppointmentFailure({ payload: error })
              );
            }),
            finalize(async () => {
              setTimeout(() => {
                this.sharedService.notification(
                  'appointmentFeedback',
                  this.responseOK,
                  this.errorResponse,
                  'Se ha actualizado la cita.'
                );
              }, 100);
            })
          )
      )
    )
  );

  updateAppointmentSuccess$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(AppointmentActions.updateAppointmentSuccess),
        map(() => {
          this.store.dispatch(isLoading({ status: false }));
          this.responseOK = true;
        })
      ),
    { dispatch: false }
  );

  updateAppointmentFailure$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(AppointmentActions.updateAppointmentFailure),
        map((error) => {
          this.store.dispatch(isLoading({ status: false }));
          this.responseOK = false;
          this.errorResponse = error.payload.error;
          this.sharedService.errorLog(error.payload.error);
        })
      ),
    { dispatch: false }
  );

  deleteAppointment$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AppointmentActions.deleteAppointment),
      exhaustMap(({ appointmentId }) =>
        this.appointmentService.deleteAppointment(appointmentId).pipe(
          map(() => {
            this.store.dispatch(isLoading({ status: false }));
            return AppointmentActions.deleteAppointmentSuccess({
              appointmentId: appointmentId,
            });
          }),
          catchError((error) => {
            return of(
              AppointmentActions.deleteAppointmentFailure({ payload: error })
            );
          })
        )
      )
    )
  );

  deleteAppointmentFailure$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(AppointmentActions.deleteAppointmentFailure),
        map((error) => {
          this.store.dispatch(isLoading({ status: false }));
          this.errorResponse = error.payload.error;
          this.sharedService.errorLog(error.payload.error);
        })
      ),
    { dispatch: false }
  );
}
