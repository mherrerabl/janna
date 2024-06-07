import { Action, createReducer, on } from '@ngrx/store';
import { isLoading } from '../actions/spinner.actions';

export interface SpinnerState {
  isOn: boolean;
}

export const initialState: SpinnerState = {
  isOn: false,
};

const _spinnerReducer = createReducer(
  initialState,
  on(isLoading, (state, action) => ({
    ...state,
    isOn: action.status,
  }))
);

export function spinnerReducer(
  state: SpinnerState | undefined,
  action: Action
): SpinnerState {
  return _spinnerReducer(state, action);
}
