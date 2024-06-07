import { createFeatureSelector, createSelector } from '@ngrx/store';
import { SpinnerState } from '../reducer';

const getSpinnerState = createFeatureSelector<SpinnerState>('spinner');

export const getLoading = createSelector(getSpinnerState, (state) => {
  return state.isOn;
});
