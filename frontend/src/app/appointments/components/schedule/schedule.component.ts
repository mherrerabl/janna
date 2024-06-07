import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { setDefaultOptions } from 'date-fns';
import { es } from 'date-fns/locale';
import { AppState } from '../../../app.reducers';
import { ModalService } from '../../../shared/services/modal.service';
import { isLoading } from '../../../spinner/actions/spinner.actions';
import { TypeUser, UserClass } from '../../../users/models/user';
import * as AppointmentsAction from './../../actions';
setDefaultOptions({ locale: es });

@Component({
  selector: 'app-schedule',
  templateUrl: './schedule.component.html',
  styleUrl: './schedule.component.scss',
})
export class ScheduleComponent {
  showCalendar: boolean;
  showForm: boolean;
  user: UserClass;

  constructor(
    private store: Store<AppState>,
    private modalService: ModalService
  ) {
    this.showCalendar = false;
    this.showForm = false;
    this.user = new UserClass('', '', '', '', '', null, TypeUser['user'], '');

    this.store.select('user').subscribe((store) => {
      this.user = store.user;
    });

    this.loadAppointments();
  }

  loadAppointments(): void {
    setTimeout(() => {
      this.store.dispatch(isLoading({ status: true }));
      this.store.dispatch(AppointmentsAction.getAppointments());
    });
  }

  openLogin(): void {
    this.modalService.openLogin();
  }

  openRegister(): void {
    this.modalService.openRegister();
  }
}
