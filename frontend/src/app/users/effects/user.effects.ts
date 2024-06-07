import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { of } from 'rxjs';
import { catchError, exhaustMap, finalize, map } from 'rxjs/operators';
import { SharedService } from '../../shared/services/shared.service';
import { isLoading } from '../../spinner/actions/spinner.actions';
import * as UserActions from '../actions';
import { UserService } from '../services/user.service';

@Injectable()
export class UserEffects {
  private responseOK: boolean;
  private errorResponse: any;

  constructor(
    private actions$: Actions,
    private userService: UserService,
    private sharedService: SharedService,
    private store: Store
  ) {
    this.responseOK = false;
  }

  getUsers$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UserActions.getUsers),
      exhaustMap(() =>
        this.userService.getUsers().pipe(
          map((users) => {
            this.store.dispatch(isLoading({ status: false }));
            return UserActions.getUsersSuccess({
              users: users,
            });
          }),
          catchError((error) => {
            return of(UserActions.getUsersFailure({ payload: error }));
          })
        )
      )
    )
  );
  getUsersFailure$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(UserActions.getUsersFailure),
        map((error) => {
          this.store.dispatch(isLoading({ status: false }));
          this.responseOK = false;
          this.errorResponse = error.payload.error;
          this.sharedService.errorLog(error.payload.error);
        })
      ),
    { dispatch: false }
  );

  getUserById$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UserActions.getUserById),
      exhaustMap(({ userId }) =>
        this.userService.getUserById(userId).pipe(
          map((user) => {
            this.store.dispatch(isLoading({ status: false }));
            return UserActions.getUserByIdSuccess({
              user: user,
            });
          }),
          catchError((error) => {
            return of(UserActions.getUserByIdFailure({ payload: error }));
          })
        )
      )
    )
  );

  getUserByIdFailure$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(UserActions.getUserByIdFailure),
        map((error) => {
          this.store.dispatch(isLoading({ status: false }));
          this.errorResponse = error.payload.error;
          this.sharedService.errorLog(error.payload.error);
        })
      ),
    { dispatch: false }
  );

  getUserLogin$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UserActions.getUserLogin),
      exhaustMap(({ user }) =>
        this.userService.getUserLogin(user).pipe(
          map((user) => {
            return UserActions.getUserLoginSuccess({
              user: user,
            });
          }),
          catchError((error) => {
            return of(UserActions.getUserLoginFailure({ payload: error }));
          }),
          finalize(async () => {
            setTimeout(() => {
              this.sharedService.notification(
                'loginFeedback',
                this.responseOK,
                this.errorResponse,
                'Ha iniciado sesión correctamente.'
              );
            }, 100);
          })
        )
      )
    )
  );

  getUserLoginSuccess$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(UserActions.getUserLoginSuccess),
        map(() => {
          this.store.dispatch(isLoading({ status: false }));
          this.responseOK = true;
        })
      ),
    { dispatch: false }
  );

  getUserLoginFailure$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(UserActions.getUserLoginFailure),
        map((error) => {
          this.store.dispatch(isLoading({ status: false }));
          this.responseOK = false;
          this.errorResponse = error.payload.error;
          this.sharedService.errorLog(error.payload.error);
        })
      ),
    { dispatch: false }
  );

  createUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UserActions.createUser),
      exhaustMap(({ user }) =>
        this.userService.createUser(user).pipe(
          map((user) => {
            return UserActions.createUserSuccess({
              user: user,
            });
          }),
          catchError((error) => {
            return of(UserActions.createUserFailure({ payload: error }));
          }),
          finalize(async () => {
            setTimeout(() => {
              this.sharedService.notification(
                'registerFeedback',
                this.responseOK,
                this.errorResponse,
                'Se ha registrado correctamente.'
              );
            }, 100);
          })
        )
      )
    )
  );

  createUserSuccess$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(UserActions.createUserSuccess),
        map(() => {
          this.store.dispatch(isLoading({ status: false }));
          this.responseOK = true;
        })
      ),
    { dispatch: false }
  );

  createUserFailure$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(UserActions.createUserFailure),
        map((error) => {
          this.store.dispatch(isLoading({ status: false }));
          this.responseOK = false;
          this.errorResponse = error.payload.error;
          this.sharedService.errorLog(error.payload.error);
        })
      ),
    { dispatch: false }
  );

  updateUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UserActions.updateUser),
      exhaustMap(({ userId, user }) =>
        this.userService.updateUser(userId, user).pipe(
          map((user) => {
            return UserActions.updateUserSuccess({
              user: user,
            });
          }),
          catchError((error) => {
            return of(UserActions.updateUserFailure({ payload: error }));
          }),
          finalize(async () => {
            setTimeout(() => {
              this.sharedService.notification(
                'personalFeedback',
                this.responseOK,
                this.errorResponse,
                'Se han actualizado los datos.'
              );
            }, 100);
          })
        )
      )
    )
  );

  updateUserSuccess$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(UserActions.updateUserSuccess),
        map(() => {
          this.store.dispatch(isLoading({ status: false }));
          this.responseOK = true;
        })
      ),
    { dispatch: false }
  );

  updateUserFailure$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(UserActions.updateUserFailure),
        map((error) => {
          this.store.dispatch(isLoading({ status: false }));
          this.responseOK = false;
          this.errorResponse = error.payload.error;
          this.sharedService.errorLog(error.payload.error);
        })
      ),
    { dispatch: false }
  );

  deleteUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UserActions.deleteUser),
      exhaustMap(({ userId }) =>
        this.userService.deleteUser(userId).pipe(
          map(() => {
            this.store.dispatch(isLoading({ status: false }));
            return UserActions.deleteUserSuccess({
              userId: userId,
            });
          }),
          catchError((error) => {
            return of(UserActions.deleteUserFailure({ payload: error }));
          })
        )
      )
    )
  );

  deleteUserFailure$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(UserActions.deleteUserFailure),
        map((error) => {
          this.store.dispatch(isLoading({ status: false }));
          this.errorResponse = error.payload.error;
          this.sharedService.errorLog(error.payload.error);
        })
      ),
    { dispatch: false }
  );
}
