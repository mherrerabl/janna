import { Action, createReducer, on } from '@ngrx/store';
import {
  createUserTreatment,
  createUserTreatmentFailure,
  createUserTreatmentSuccess,
  deleteUserTreatment,
  deleteUserTreatmentFailure,
  deleteUserTreatmentSuccess,
  getAllUserTreatments,
  getAllUserTreatmentsFailure,
  getAllUserTreatmentsSuccess,
  getUserTreatmentByUserId,
  getUserTreatmentByUserIdFailure,
  getUserTreatmentByUserIdSuccess,
  updateUserTreatment,
  updateUserTreatmentFailure,
  updateUserTreatmentSuccess,
} from '../actions';
import {
  StateUserTreatment,
  UserTreatmentClass,
} from '../models/user-treatments';

export interface UserTreatmentsState {
  userTreatments: UserTreatmentClass[];
  userTreatment: UserTreatmentClass;
  loading: boolean;
  loaded: boolean;
  error: any;
}

export const initialState: UserTreatmentsState = {
  userTreatments: new Array<UserTreatmentClass>(),
  userTreatment: new UserTreatmentClass(
    '',
    '',
    StateUserTreatment['En proceso'],
    0,
    ''
  ),
  loading: false,
  loaded: false,
  error: null,
};

const _userTreatmentsReducer = createReducer(
  initialState,
  on(getAllUserTreatments, (state) => ({
    ...state,
    loading: true,
    loaded: false,
    error: null,
  })),
  on(getAllUserTreatmentsSuccess, (state, action) => ({
    ...state,
    userTreatments: action.userTreatments,
    loading: false,
    loaded: true,
    error: null,
  })),
  on(getAllUserTreatmentsFailure, (state, { payload }) => ({
    ...state,
    loading: false,
    loaded: false,
    error: { payload },
  })),

  on(getUserTreatmentByUserId, (state) => ({
    ...state,
    loading: true,
    loaded: false,
    error: null,
  })),
  on(getUserTreatmentByUserIdSuccess, (state, action) => ({
    ...state,
    userTreatments: action.userTreatments,
    loading: false,
    loaded: true,
    error: null,
  })),
  on(getUserTreatmentByUserIdFailure, (state, { payload }) => ({
    ...state,
    loading: false,
    loaded: false,
    error: { payload },
  })),

  on(createUserTreatment, (state) => ({
    ...state,
    loading: true,
    loaded: false,
    error: null,
  })),
  on(createUserTreatmentSuccess, (state, action) => ({
    ...state,
    userTreatment: action.userTreatment,
    loading: false,
    loaded: true,
    error: null,
  })),
  on(createUserTreatmentFailure, (state, { payload }) => ({
    ...state,
    loading: false,
    loaded: false,
    error: { payload },
  })),

  on(updateUserTreatment, (state) => ({
    ...state,
    loading: true,
    loaded: false,
    error: null,
  })),
  on(updateUserTreatmentSuccess, (state, action) => ({
    ...state,
    userTreatment: action.userTreatment,
    loading: false,
    loaded: true,
    error: null,
  })),
  on(updateUserTreatmentFailure, (state, { payload }) => ({
    ...state,
    loading: false,
    loaded: false,
    error: { payload },
  })),

  on(deleteUserTreatment, (state) => ({
    ...state,
    loading: true,
    loaded: false,
    error: null,
  })),
  on(deleteUserTreatmentSuccess, (state, { userTreatmentId }) => ({
    ...state,
    userTreatments: [
      ...state.userTreatments.filter(({ id }) => id !== userTreatmentId),
    ],
    loading: false,
    loaded: true,
    error: null,
  })),
  on(deleteUserTreatmentFailure, (state, { payload }) => ({
    ...state,
    loading: false,
    loaded: false,
    error: { payload },
  }))
);

export function userTreatmentsReducer(
  state: UserTreatmentsState | undefined,
  action: Action
): UserTreatmentsState {
  return _userTreatmentsReducer(state, action);
}
