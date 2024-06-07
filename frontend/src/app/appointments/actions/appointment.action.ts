import { HttpErrorResponse } from '@angular/common/http';
import { createAction, props } from '@ngrx/store';
import { AppointmentClass } from '../models/appointment';

export const getAppointments = createAction(
  '[Appointments list] Get appointments list'
);
export const getAppointmentsSuccess = createAction(
  '[Appointments list] Get appointments list success',
  props<{ appointments: AppointmentClass[] }>()
);

export const getAppointmentsFailure = createAction(
  '[Appointments list] Get appointments list fail',
  props<{ payload: HttpErrorResponse }>()
);

export const getAppointmentByUserId = createAction(
  '[Appointments list] Get appointment detail by user id',
  props<{ userId: string }>()
);
export const getAppointmentByUserIdSuccess = createAction(
  '[Appointments list] Get appointment detail by user id success',
  props<{ appointments: AppointmentClass[] }>()
);

export const getAppointmentByUserIdFailure = createAction(
  '[Appointments list] Get appointment detail by user id fail',
  props<{ payload: HttpErrorResponse }>()
);

export const getAppointmentById = createAction(
  '[Appointment detail] Get appointment detail by id',
  props<{ appointmentId: string }>()
);
export const getAppointmentByIdSuccess = createAction(
  '[Appointment detail] Get appointment detail by id success',
  props<{ appointment: AppointmentClass }>()
);

export const getAppointmentByIdFailure = createAction(
  '[Appointment detail] Get appointment detail by id fail',
  props<{ payload: HttpErrorResponse }>()
);

export const createAppointment = createAction(
  '[Appointment form] Create new appointment',
  props<{ appointment: AppointmentClass }>()
);

export const createAppointmentSuccess = createAction(
  '[Appointment form] Create new appointment success',
  props<{ appointment: AppointmentClass }>()
);

export const createAppointmentFailure = createAction(
  '[Appointment form] Create new appointment fail',
  props<{ payload: HttpErrorResponse }>()
);

export const updateAppointment = createAction(
  '[Appointment form] Update appointment',
  props<{ appointmentId: string; appointment: AppointmentClass }>()
);

export const updateAppointmentSuccess = createAction(
  '[Appointment form] Update appointment success',
  props<{ appointment: AppointmentClass }>()
);

export const updateAppointmentFailure = createAction(
  '[Appointment form] Update appointment fail',
  props<{ payload: HttpErrorResponse }>()
);

export const deleteAppointment = createAction(
  '[Appointment form] Delete appointment',
  props<{ appointmentId: string }>()
);

export const deleteAppointmentSuccess = createAction(
  '[Appointment form] Delete appointment success',
  props<{ appointmentId: string }>()
);

export const deleteAppointmentFailure = createAction(
  '[Appointment form] Delete appointment fail',
  props<{ payload: HttpErrorResponse }>()
);
