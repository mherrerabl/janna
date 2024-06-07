import { createAction, props } from '@ngrx/store';

export const isLoading = createAction(
  '[Spinner] Is loading',
  props<{ status: boolean }>()
);
