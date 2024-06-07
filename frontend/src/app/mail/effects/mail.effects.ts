import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { of } from 'rxjs';
import { catchError, exhaustMap, finalize, map } from 'rxjs/operators';
import { SharedService } from '../../shared/services/shared.service';
import { isLoading } from '../../spinner/actions/spinner.actions';
import * as MailActions from '../actions';
import { MailService } from '../services/mail.service';

@Injectable()
export class MailEffects {
  private responseOK: boolean;
  private errorResponse: any;

  constructor(
    private actions$: Actions,
    private mailService: MailService,
    private sharedService: SharedService,
    private store: Store
  ) {
    this.responseOK = false;
  }

  sendMail$ = createEffect(() =>
    this.actions$.pipe(
      ofType(MailActions.sendMail),
      exhaustMap(({ mail }) =>
        this.mailService.sendEmail(mail).pipe(
          map((mail) => {
            return MailActions.sendMailSuccess({
              mail: mail,
            });
          }),
          catchError((error) => {
            return of(MailActions.sendMailFailure({ payload: error }));
          }),
          finalize(() => {
            setTimeout(() => {
              this.sharedService.notification(
                'mailFeedback',
                this.responseOK,
                this.errorResponse,
                'La consulta se ha enviado correctamente.'
              );
            }, 100);
          })
        )
      )
    )
  );

  sendMailSuccess$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(MailActions.sendMailSuccess),
        map(() => {
          this.store.dispatch(isLoading({ status: false }));
          this.responseOK = true;
        })
      ),
    { dispatch: false }
  );

  sendMailFailure$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(MailActions.sendMailFailure),
        map((error) => {
          this.store.dispatch(isLoading({ status: false }));
          this.responseOK = false;
          this.errorResponse = error.payload.error;
          this.sharedService.errorLog(error.payload.error);
        })
      ),
    { dispatch: false }
  );
}
