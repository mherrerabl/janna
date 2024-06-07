import { Action, createReducer, on } from '@ngrx/store';
import {
  createUser,
  createUserFailure,
  createUserSuccess,
  getUserById,
  getUserByIdFailure,
  getUserByIdSuccess,
  getUserLogin,
  getUserLoginFailure,
  getUserLoginSuccess,
  getUsers,
  getUsersFailure,
  getUsersSuccess,
  logout,
  updateUser,
  updateUserFailure,
  updateUserSuccess,
} from '../actions';
import { TypeUser, UserClass } from '../models/user';

export interface UserState {
  user: UserClass;
  loading: boolean;
  loaded: boolean;
  error: any;
}

export const initialState: UserState = {
  user: new UserClass('', '', '', '', '', 0, TypeUser['user'], ''),
  loading: false,
  loaded: false,
  error: null,
};

const _userReducer = createReducer(
  initialState,

  on(getUsers, (state) => ({
    ...state,
    loading: true,
    loaded: false,
    error: null,
  })),
  on(getUsersSuccess, (state, action) => ({
    ...state,
    users: action.users,
    loading: false,
    loaded: true,
    error: null,
  })),
  on(getUsersFailure, (state, { payload }) => ({
    ...state,
    loading: false,
    loaded: false,
    error: { payload },
  })),

  on(getUserById, (state) => ({
    ...state,
    loading: true,
    loaded: false,
    error: null,
  })),
  on(getUserByIdSuccess, (state, action) => ({
    ...state,
    user: action.user,
    loading: false,
    loaded: true,
    error: null,
  })),
  on(getUserByIdFailure, (state, { payload }) => ({
    ...state,
    loading: false,
    loaded: false,
    error: { payload },
  })),

  on(getUserLogin, (state) => ({
    ...state,
    loading: true,
    loaded: false,
    error: null,
  })),
  on(getUserLoginSuccess, (state, action) => ({
    ...state,
    user: action.user,
    loading: false,
    loaded: true,
    error: null,
  })),
  on(getUserLoginFailure, (state, { payload }) => ({
    ...state,
    loading: false,
    loaded: false,
    error: { payload },
  })),

  on(createUser, (state) => ({
    ...state,
    loading: true,
    loaded: false,
    error: null,
  })),

  on(createUserSuccess, (state, action) => ({
    ...state,
    user: action.user,
    loading: false,
    loaded: true,
    error: null,
  })),
  on(createUserFailure, (state, { payload }) => ({
    ...state,
    loading: false,
    loaded: false,
    error: { payload },
  })),
  on(updateUser, (state) => ({
    ...state,
    loading: true,
    loaded: false,
    error: null,
  })),
  on(updateUserSuccess, (state, action) => ({
    ...state,
    user: action.user,
    loading: false,
    loaded: true,
    error: null,
  })),
  on(updateUserFailure, (state, { payload }) => ({
    ...state,
    loading: false,
    loaded: false,
    error: { payload },
  })),
  on(logout, (state) => ({
    ...state,
    user: initialState.user,
    loading: true,
    loaded: false,
    error: null,
  }))
);

export function userReducer(
  state: UserState | undefined,
  action: Action
): UserState {
  return _userReducer(state, action);
}
