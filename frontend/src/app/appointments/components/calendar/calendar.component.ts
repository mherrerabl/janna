import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import {
  CalendarEvent,
  CalendarEventAction,
  CalendarView,
} from 'angular-calendar';
import {
  addMinutes,
  format,
  isSameDay,
  isSameMonth,
  setDefaultOptions,
} from 'date-fns';
import { es } from 'date-fns/locale';
import { Subject } from 'rxjs';
import { AppState } from '../../../app.reducers';
import { TypeUser, UserClass } from '../../../users/models/user';
import { AppointmentClass } from '../../models/appointment';
setDefaultOptions({ locale: es });

interface ModalCalendar {
  action: string;
  event: CalendarEvent;
}

const colors = {
  admin: {
    primary: '#CF647F',
    secondary: '#FAE9EC',
  },
  user: {
    primary: '#FAA300',
    secondary: '#FFF5C5',
  },
  visitor: {
    primary: '#4D4D4D',
    secondary: '#F2F4F8',
  },
};

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrl: './calendar.component.scss',
})
export class CalendarComponent {
  user!: UserClass;
  isLogin: boolean;
  isAdmin: boolean;
  showCalendar: boolean;
  appointments: AppointmentClass[];

  view: CalendarView = CalendarView.Month;

  CalendarView = CalendarView;

  viewDate: Date = new Date();

  modalData!: ModalCalendar;

  actionsAdmin: CalendarEventAction[] = [
    {
      label: '<i class="fas fa-fw fa-pencil-alt"></i>',
      a11yLabel: 'Edit',
      onClick: function () {},
    },
    {
      label: '<i class="fas fa-fw fa-trash-alt"></i>',
      a11yLabel: 'Delete',
      onClick: function () {},
    },
  ];

  actions: CalendarEventAction[] = [];

  refresh = new Subject<void>();

  events: CalendarEvent[];

  activeDayIsOpen: boolean = true;

  constructor(private store: Store<AppState>) {
    this.appointments = [];
    this.isLogin = false;
    this.isAdmin = false;
    this.showCalendar = false;
    this.events = [];
    this.user = new UserClass('', '', '', '', '', null, TypeUser['user'], '');

    this.store.select('user').subscribe((store) => {
      this.checkLogin(store.user);
    });

    this.store.select('appointment').subscribe((store) => {
      this.appointments = store.appointments;

      if (this.appointments.length > 0) {
        this.pushEventsToCalendar();
      }
    });
  }

  private checkLogin(user: UserClass): void {
    this.isLogin = false;
    this.isAdmin = false;

    if (user.id !== '') {
      this.isLogin = true;
      this.user = user;

      if (this.user.type === TypeUser['admin']) {
        this.isAdmin = true;
      }
    }
  }

  private getTitle(appointment: AppointmentClass): string {
    if (this.isAdmin) {
      return `${appointment.user?.name} ${appointment.user?.surname} - ${
        appointment.treatment?.name
      }: ${format(new Date(appointment.date), 'HH:mm')}h.`;
    }

    if (this.isLogin && appointment.user?.id === this.user.id) {
      return `${appointment.treatment?.name}: ${format(
        new Date(appointment.date),
        'HH:mm'
      )}h.`;
    }

    return 'Reservado';
  }

  private getColor(appointment: AppointmentClass): any {
    if (this.isAdmin) {
      return { ...colors.admin };
    }

    if (this.isLogin && appointment.user?.id === this.user.id) {
      return { ...colors.user };
    }

    return { ...colors.visitor };
  }
  private addEvent(
    datetime: Date,
    duration: number,
    color: any,
    title: string
  ): CalendarEvent {
    return {
      start: new Date(datetime),
      end: addMinutes(new Date(datetime), duration),
      title: title,
      color: color,
      actions: this.isAdmin ? this.actionsAdmin : this.actions,
      resizable: {
        beforeStart: false,
        afterEnd: false,
      },
      draggable: false,
    };
  }

  pushEventsToCalendar(): void {
    this.events = [];
    this.appointments.map((appointment) => {
      if (appointment.treatment) {
        this.events = [
          ...this.events,
          this.addEvent(
            appointment.date,
            appointment.treatment?.duration,
            this.getColor(appointment),
            this.getTitle(appointment)
          ),
        ];
      }
    });
  }

  dayClicked({ date, events }: { date: Date; events: CalendarEvent[] }): void {
    if (isSameMonth(date, this.viewDate)) {
      if (
        (isSameDay(this.viewDate, date) && this.activeDayIsOpen === true) ||
        events.length === 0
      ) {
        this.activeDayIsOpen = false;
      } else {
        this.activeDayIsOpen = true;
      }
      this.viewDate = date;
    }
  }

  setView(view: CalendarView) {
    this.view = view;
  }

  closeOpenMonthViewDay() {
    this.activeDayIsOpen = false;
  }
}
