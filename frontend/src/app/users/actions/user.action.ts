import { HttpErrorResponse } from '@angular/common/http';
import { createAction, props } from '@ngrx/store';
import { UserClass } from '../models/user';
import { UserDTO } from '../models/user.dto';

export const getUsers = createAction('[Profile Page] Get users');
export const getUsersSuccess = createAction(
  '[Profile Page] Get users Success',
  props<{ users: UserClass[] }>()
);

export const getUsersFailure = createAction(
  '[Profile Page] Get users Failure',
  props<{ payload: HttpErrorResponse }>()
);

export const getUserById = createAction(
  '[Profile Page] Get user by ID',
  props<{ userId: string }>()
);
export const getUserByIdSuccess = createAction(
  '[Profile Page] Get user by ID Success',
  props<{ user: UserClass }>()
);

export const getUserByIdFailure = createAction(
  '[Profile Page] Get user by ID Failure',
  props<{ payload: HttpErrorResponse }>()
);

export const getUserLogin = createAction(
  '[Profile Page] Get user by Email',
  props<{ user: UserDTO }>()
);
export const getUserLoginSuccess = createAction(
  '[Profile Page] Get user by Email Success',
  props<{ user: UserClass }>()
);

export const getUserLoginFailure = createAction(
  '[Profile Page] Get user by Email Failure',
  props<{ payload: HttpErrorResponse }>()
);

export const createUser = createAction(
  '[Register Page] Register new user',
  props<{ user: UserClass }>()
);
export const createUserSuccess = createAction(
  '[Register Page] Register new user Success',
  props<{ user: UserClass }>()
);

export const createUserFailure = createAction(
  '[Register Page] Register new user Failure',
  props<{ payload: HttpErrorResponse }>()
);

export const updateUser = createAction(
  '[Profile Page] Update User',
  props<{ userId: string; user: UserClass }>()
);
export const updateUserSuccess = createAction(
  '[Profile Page] Update User Success',
  props<{ user: UserClass }>()
);

export const updateUserFailure = createAction(
  '[Profile Page] Update User Failure',
  props<{ payload: HttpErrorResponse }>()
);

export const deleteUser = createAction(
  '[User form] Delete user',
  props<{ userId: string }>()
);

export const deleteUserSuccess = createAction(
  '[User form] Delete user success',
  props<{ userId: string }>()
);

export const deleteUserFailure = createAction(
  '[User form] Delete user fail',
  props<{ payload: HttpErrorResponse }>()
);

export const logout = createAction('[User] Logout');
