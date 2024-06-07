import { Action, createReducer, on } from '@ngrx/store';
import {
  StateUserTreatment,
  UserTreatmentClass,
} from '../../user-treatments/models/user-treatments';
import {
  createAppointment,
  createAppointmentFailure,
  createAppointmentSuccess,
  deleteAppointment,
  deleteAppointmentFailure,
  deleteAppointmentSuccess,
  getAppointmentById,
  getAppointmentByIdFailure,
  getAppointmentByIdSuccess,
  getAppointmentByUserId,
  getAppointmentByUserIdFailure,
  getAppointmentByUserIdSuccess,
  getAppointments,
  getAppointmentsFailure,
  getAppointmentsSuccess,
  updateAppointment,
  updateAppointmentFailure,
  updateAppointmentSuccess,
} from '../actions';
import { AppointmentClass, StateAppointment } from '../models/appointment';

export interface AppointmentsState {
  appointments: AppointmentClass[];
  appointment: AppointmentClass;
  loading: boolean;
  loaded: boolean;
  error: any;
}
export const initialState: AppointmentsState = {
  appointments: new Array<AppointmentClass>(),
  appointment: new AppointmentClass(
    '',
    new Date(),
    StateAppointment['Pendiente'],
    new UserTreatmentClass('', '', StateUserTreatment['En proceso'], 0, '')
  ),
  loading: false,
  loaded: false,
  error: null,
};

const _appointmentsReducer = createReducer(
  initialState,
  on(getAppointments, (state) => ({
    ...state,
    loading: true,
    loaded: false,
    error: null,
  })),
  on(getAppointmentsSuccess, (state, action) => ({
    ...state,
    appointments: action.appointments,
    loading: false,
    loaded: true,
    error: null,
  })),
  on(getAppointmentsFailure, (state, { payload }) => ({
    ...state,
    loading: false,
    loaded: false,
    error: { payload },
  })),

  on(getAppointmentByUserId, (state) => ({
    ...state,
    loading: true,
    loaded: false,
    error: null,
  })),
  on(getAppointmentByUserIdSuccess, (state, action) => ({
    ...state,
    appointments: action.appointments,
    loading: false,
    loaded: true,
    error: null,
  })),
  on(getAppointmentByUserIdFailure, (state, { payload }) => ({
    ...state,
    loading: false,
    loaded: false,
    error: { payload },
  })),

  on(getAppointmentById, (state) => ({
    ...state,
    loading: true,
    loaded: false,
    error: null,
  })),
  on(getAppointmentByIdSuccess, (state, action) => ({
    ...state,
    appointment: action.appointment,
    loading: false,
    loaded: true,
    error: null,
  })),
  on(getAppointmentByIdFailure, (state, { payload }) => ({
    ...state,
    loading: false,
    loaded: false,
    error: { payload },
  })),

  on(createAppointment, (state) => ({
    ...state,
    loading: true,
    loaded: false,
    error: null,
  })),
  on(createAppointmentSuccess, (state, action) => ({
    ...state,
    appointment: action.appointment,
    loading: false,
    loaded: true,
    error: null,
  })),
  on(createAppointmentFailure, (state, { payload }) => ({
    ...state,
    loading: false,
    loaded: false,
    error: { payload },
  })),

  on(updateAppointment, (state) => ({
    ...state,
    loading: true,
    loaded: false,
    error: null,
  })),
  on(updateAppointmentSuccess, (state, action) => ({
    ...state,
    appointment: action.appointment,
    loading: false,
    loaded: true,
    error: null,
  })),
  on(updateAppointmentFailure, (state, { payload }) => ({
    ...state,
    loading: false,
    loaded: false,
    error: { payload },
  })),

  on(deleteAppointment, (state) => ({
    ...state,
    loading: true,
    loaded: false,
    error: null,
  })),
  on(deleteAppointmentSuccess, (state, { appointmentId }) => ({
    ...state,
    appointments: [
      ...state.appointments.filter(({ id }) => id !== appointmentId),
    ],
    loading: false,
    loaded: true,
    error: null,
  })),
  on(deleteAppointmentFailure, (state, { payload }) => ({
    ...state,
    loading: false,
    loaded: false,
    error: { payload },
  }))
);

export function appointmentsReducer(
  state: AppointmentsState | undefined,
  action: Action
): AppointmentsState {
  return _appointmentsReducer(state, action);
}
