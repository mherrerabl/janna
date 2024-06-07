import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../../../../app.reducers';
import * as AppointmentsAction from '../../../../appointments/actions';
import { AppointmentClass } from '../../../../appointments/models/appointment';
import { RowDetailDTO } from '../../../../shared/models/row-detail.dto';
import { RowDTO } from '../../../../shared/models/row.dto';
import { TableDTO } from '../../../../shared/models/table.dto';
import { isLoading } from '../../../../spinner/actions/spinner.actions';
@Component({
  selector: 'app-profile-user-appointments-table',
  templateUrl: './profile-user-appointments-table.component.html',
  styleUrl: './profile-user-appointments-table.component.scss',
})
export class ProfileUserAppointmentsTableComponent implements OnInit {
  appointments: AppointmentClass[];
  userId!: string;
  dataTable!: TableDTO;
  constructor(private store: Store<AppState>) {
    this.appointments = new Array<AppointmentClass>();

    this.store.select('user').subscribe((store) => {
      if (store.user.id !== undefined && store.user.id !== '') {
        this.userId = store.user.id;
      }
    });

    this.store.select('appointment').subscribe((store) => {
      if (store.appointments.length > 0) {
        this.appointments = store.appointments;
        if (this.appointments.length > 0) {
          this.appointments.sort((a, b) => {
            return Number(b.id) - Number(a.id);
          });
          this.dataTable = this.getTable();
        }
      }
    });
  }
  ngOnInit(): void {
    setTimeout(() => {
      this.store.dispatch(isLoading({ status: true }));
    });

    if (this.userId !== undefined || this.userId !== '') {
      this.loadAppointments(this.userId);
    }
  }

  loadAppointments(userId: string): void {
    setTimeout(() => {
      this.store.dispatch(isLoading({ status: true }));
    });
    this.store.dispatch(
      AppointmentsAction.getAppointmentByUserId({ userId: userId })
    );
  }

  getTable(): TableDTO {
    let rows: RowDTO[] = [];

    this.appointments.forEach((appointment) => {
      let newRow: string[] = [];
      newRow.push(new Date(appointment.date).toLocaleDateString('en-GB'));
      if (
        appointment.treatment !== undefined &&
        appointment.treatment.name !== undefined
      ) {
        newRow.push(appointment.treatment.name);
      }

      let newDetail: RowDetailDTO[] = [
        {
          title: 'id',
          content: {
            info: {
              text: appointment.id,
            },
          },
        },
        {
          title: 'Usuario',
          content: {
            info: {
              text: `${appointment.user?.id}. ${appointment.user?.name} ${appointment.user?.surname}`,
            },
          },
        },
        {
          title: 'Tratamiento',
          content: {
            info: {
              text: appointment.treatment?.name,
            },
          },
        },
        {
          title: 'Fecha',
          content: {
            info: {
              date: appointment.date,
            },
          },
        },
        {
          title: 'Hora',
          content: {
            info: {
              time: appointment.date,
            },
          },
        },
      ];

      let row: RowDTO = {
        id: appointment.id,
        rowInfo: newRow,
        detail: newDetail,
      };
      rows.push(row);
    });
    this.appointments;
    return {
      titles: [
        {
          title: 'Fecha',
          smallScreens: true,
        },
        {
          title: 'Tratamiento',
          smallScreens: true,
        },
      ],
      rows: rows,
      action: true,
      bd: 'appointment',
    };
  }
}
