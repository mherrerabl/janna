import { HttpErrorResponse } from '@angular/common/http';
import { createAction, props } from '@ngrx/store';
import { TreatmentClass } from '../models/treatment';

export const getTreatments = createAction(
  '[Treatments list] Get treatments list'
);
export const getTreatmentsSuccess = createAction(
  '[Treatments list] Get treatments list success',
  props<{ treatments: TreatmentClass[] }>()
);

export const getTreatmentsFailure = createAction(
  '[Treatments list] Get treatments list fail',
  props<{ payload: HttpErrorResponse }>()
);

export const getTreatmentByCategoryId = createAction(
  '[Treatment detail] Get treatments detail by categoryId',
  props<{ categoryId: string }>()
);
export const getTreatmentByCategoryIdSuccess = createAction(
  '[Treatment detail] Get treatments detail by categoryId success',
  props<{ treatment: TreatmentClass }>()
);

export const getTreatmentByCategoryIdFailure = createAction(
  '[Treatment detail] Get treatments detail by categoryId fail',
  props<{ payload: HttpErrorResponse }>()
);

export const getTreatmentById = createAction(
  '[Treatment detail] Get treatment detail',
  props<{ treatmentId: string }>()
);

export const getTreatmentByIdSuccess = createAction(
  '[Treatment detail] Get treatment detail success',
  props<{ treatment: TreatmentClass }>()
);

export const getTreatmentByIdFailure = createAction(
  '[Treatment detail] Get treatment detail fail',
  props<{ payload: HttpErrorResponse }>()
);
export const getTreatmentByUrl = createAction(
  '[Treatment detail] Get treatment by url detail',
  props<{ paramUrl: string }>()
);

export const getTreatmentByUrlSuccess = createAction(
  '[Treatment detail] Get treatment detail by url success',
  props<{ treatment: TreatmentClass }>()
);

export const getTreatmentByUrlFailure = createAction(
  '[Treatment detail] Get treatment detail by url fail',
  props<{ payload: HttpErrorResponse }>()
);

export const createTreatment = createAction(
  '[Treatment form] Create new treatment',
  props<{ treatment: TreatmentClass }>()
);

export const createTreatmentSuccess = createAction(
  '[Treatment form] Create new treatment success',
  props<{ treatment: TreatmentClass }>()
);

export const createTreatmentFailure = createAction(
  '[Treatment form] Create new treatment fail',
  props<{ payload: HttpErrorResponse }>()
);

export const updateTreatment = createAction(
  '[Treatment form] Update treatment',
  props<{ treatmentId: string; treatment: TreatmentClass }>()
);

export const updateTreatmentSuccess = createAction(
  '[Treatment form] Update treatment success',
  props<{ treatment: TreatmentClass }>()
);

export const updateTreatmentFailure = createAction(
  '[Treatment form] Update treatment fail',
  props<{ payload: HttpErrorResponse }>()
);

export const deleteTreatment = createAction(
  '[Treatment form] Delete treatment',
  props<{ treatmentId: string }>()
);

export const deleteTreatmentSuccess = createAction(
  '[Treatment form] Delete treatment success',
  props<{ treatmentId: string }>()
);

export const deleteTreatmentFailure = createAction(
  '[Treatment form] Delete treatment fail',
  props<{ payload: HttpErrorResponse }>()
);
