import { HttpErrorResponse } from '@angular/common/http';
import { createAction, props } from '@ngrx/store';
import { UserTreatmentClass } from '../models/user-treatments';

export const getAllUserTreatments = createAction(
  '[UserTreatments list] Get userTreatments list'
);
export const getAllUserTreatmentsSuccess = createAction(
  '[UserTreatments list] Get userTreatments list success',
  props<{ userTreatments: UserTreatmentClass[] }>()
);

export const getAllUserTreatmentsFailure = createAction(
  '[UserTreatments list] Get userTreatments list fail',
  props<{ payload: HttpErrorResponse }>()
);

export const getUserTreatmentByUserId = createAction(
  '[UserTreatment detail] Get userTreatment detail by user id',
  props<{ userId: string }>()
);
export const getUserTreatmentByUserIdSuccess = createAction(
  '[UserTreatment detail] Get userTreatment detail by user id success',
  props<{ userTreatments: UserTreatmentClass[] }>()
);

export const getUserTreatmentByUserIdFailure = createAction(
  '[UserTreatment detail] Get userTreatment detail by user id fail',
  props<{ payload: HttpErrorResponse }>()
);

export const createUserTreatment = createAction(
  '[UserTreatment form] Create new userTreatment',
  props<{ userTreatment: UserTreatmentClass }>()
);

export const createUserTreatmentSuccess = createAction(
  '[UserTreatment form] Create new userTreatment success',
  props<{ userTreatment: UserTreatmentClass }>()
);

export const createUserTreatmentFailure = createAction(
  '[UserTreatment form] Create new userTreatment fail',
  props<{ payload: HttpErrorResponse }>()
);

export const updateUserTreatment = createAction(
  '[UserTreatment form] Update userTreatment',
  props<{ userTreatmentId: string; userTreatment: UserTreatmentClass }>()
);

export const updateUserTreatmentSuccess = createAction(
  '[UserTreatment form] Update userTreatment success',
  props<{ userTreatment: UserTreatmentClass }>()
);

export const updateUserTreatmentFailure = createAction(
  '[UserTreatment form] Update userTreatment fail',
  props<{ payload: HttpErrorResponse }>()
);

export const deleteUserTreatment = createAction(
  '[UserTreatment form] Delete userTreatment',
  props<{ userTreatmentId: string }>()
);

export const deleteUserTreatmentSuccess = createAction(
  '[UserTreatment form] Delete userTreatment success',
  props<{ userTreatmentId: string }>()
);

export const deleteUserTreatmentFailure = createAction(
  '[UserTreatment form] Delete userTreatment fail',
  props<{ payload: HttpErrorResponse }>()
);
