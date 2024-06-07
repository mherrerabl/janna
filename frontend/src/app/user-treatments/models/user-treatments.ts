import { AppointmentClass } from '../../appointments/models/appointment';

export enum StateUserTreatment {
  'En proceso' = 'En proceso',
  'Finalizado' = 'Finalizado',
  'No realizado' = 'No realizado',
}

export class UserTreatmentClass {
  id: string;
  user_id: string;
  state: StateUserTreatment;
  sessions: number;
  treatment_id: string;
  name?: string;
  appointments?: AppointmentClass[];

  constructor(
    id: string,
    user_id: string,
    state: StateUserTreatment,
    sessions: number,
    treatment_id: string
  ) {
    this.id = id;
    this.user_id = user_id;
    this.state = state;
    this.sessions = sessions;
    this.treatment_id = treatment_id;
  }
}
