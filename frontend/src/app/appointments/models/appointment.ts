import { UserTreatmentClass } from '../../user-treatments/models/user-treatments';

export enum StateAppointment {
  'Pendiente' = 'Pendiente',
  'Próxima sesión' = 'Próxima sesión',
  'Realizada' = 'Realizada',
  'No realizada' = 'No realizada',
  'Cancelada' = 'Cancelada',
}

export class AppointmentClass {
  id: string;
  date: Date;
  state: StateAppointment;
  user_treatment: UserTreatmentClass;
  treatment?: {
    name: string;
    duration: number;
    category_id: string;
  };
  user?: {
    id: string;
    name: string;
    surname: string;
  };

  constructor(
    id: string,
    date: Date,
    state: StateAppointment,
    user_treatment: UserTreatmentClass
  ) {
    this.id = id;
    this.date = date;
    this.state = state;
    this.user_treatment = user_treatment;
  }
}
