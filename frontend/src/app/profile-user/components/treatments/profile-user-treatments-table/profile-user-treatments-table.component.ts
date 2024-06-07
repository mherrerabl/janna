import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../../../../app.reducers';
import {
  RowDetailDTO,
  SessionDTO,
} from '../../../../shared/models/row-detail.dto';
import { RowDTO } from '../../../../shared/models/row.dto';
import { TableDTO } from '../../../../shared/models/table.dto';
import { isLoading } from '../../../../spinner/actions/spinner.actions';
import * as UserTreatmentsAction from '../../../../user-treatments/actions';
import {
  StateUserTreatment,
  UserTreatmentClass,
} from '../../../../user-treatments/models/user-treatments';
@Component({
  selector: 'app-profile-user-treatments-table',
  templateUrl: './profile-user-treatments-table.component.html',
  styleUrl: './profile-user-treatments-table.component.scss',
})
export class ProfileUserTreatmentsTableComponent {
  userTreatments: UserTreatmentClass[];
  userId!: string;
  dataTable!: TableDTO;
  constructor(private store: Store<AppState>) {
    this.userTreatments = new Array<UserTreatmentClass>();

    this.store.select('user').subscribe((store) => {
      if (store.user.id !== undefined && store.user.id !== '') {
        this.userId = store.user.id;
      }
    });

    this.store.select('userTreatment').subscribe((store) => {
      if (store.userTreatments.length > 0) {
        this.userTreatments = store.userTreatments;
        if (this.userTreatments.length > 0) {
          this.userTreatments.sort((a, b) => {
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
      this.loadUserTreatments(this.userId);
    }
  }

  loadUserTreatments(userId: string): void {
    setTimeout(() => {
      this.store.dispatch(isLoading({ status: true }));
    });
    this.store.dispatch(
      UserTreatmentsAction.getUserTreatmentByUserId({ userId: userId })
    );
  }

  getTable(): TableDTO {
    let rows: RowDTO[] = [];
    let sessions: SessionDTO[] = [];

    this.userTreatments.forEach((userTreatment) => {
      let newRow: string[] = [];
      if (userTreatment.name !== undefined) {
        newRow.push(userTreatment.name);
      }
      newRow.push(StateUserTreatment[userTreatment.state]);

      if (userTreatment.appointments !== undefined) {
        userTreatment.appointments.forEach((appointment) => {
          let session: SessionDTO;

          session = {
            date: appointment.date,
            state: StateUserTreatment[userTreatment.state],
            appointment_id: appointment.id,
          };

          sessions.push(session);
        });
      }

      let newDetail: RowDetailDTO[] = [
        {
          title: 'Sesiones',
          content: {
            info: {
              text: `${userTreatment.sessions}`,
            },
          },
        },
        {
          title: 'Estado',
          content: {
            info: {
              text: StateUserTreatment[userTreatment.state],
            },
          },
        },
        {
          title: 'Citas',
          content: {
            appointments: {
              sessions: sessions,
              state: StateUserTreatment[userTreatment.state],
            },
          },
        },
      ];

      let row: RowDTO = {
        id: userTreatment.id,
        rowInfo: newRow,
        detail: newDetail,
      };
      rows.push(row);
    });
    this.userTreatments;
    return {
      titles: [
        {
          title: 'Tratamiento',
          smallScreens: true,
        },
        {
          title: 'Estado',
          smallScreens: true,
        },
      ],
      rows: rows,
      action: false,
      bd: 'user_treatment',
    };
  }
}
