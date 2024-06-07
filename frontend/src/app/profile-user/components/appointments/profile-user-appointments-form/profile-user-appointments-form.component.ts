import { Component } from '@angular/core';
//import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { AppState } from '../../../../app.reducers';
//import { AppointmentFormComponent } from '../../../../shared/components/appointment-form/appointment-form.component';
import { RouteService } from '../../../../shared/services/route.service';

@Component({
  selector: 'app-profile-user-appointments-form',
  templateUrl: './profile-user-appointments-form.component.html',
  styleUrl: './profile-user-appointments-form.component.scss',
})
export class ProfileUserAppointmentsFormComponent {
  title: string;
  id: string | null;

  constructor(
    public routeService: RouteService,
    private store: Store<AppState>
  ) {
    this.title = '';
    this.id = this.routeService.getProfileFormId();

    setTimeout(() => {
      this.getTypeForm();
    });
  }
  getTypeForm(): void {
    if (this.id === null) {
      this.title = 'Nueva cita';
    } else {
      this.title = 'Editar cita';

      /*this.store.dispatch(isLoading({ status: true }));
      this.store.dispatch(
        AppointmentAction.getAppointmentById({
          appointmentId: this.id,
        })
      );*/
    }
  }

  //appointmentUser: string;
  /*constructor(
    formBuilder: FormBuilder,
    store: Store<AppState>,
    public routeService: RouteService
  ) {
    super(formBuilder, store);
    this.title = '';
    this.id = this.routeService.getProfileFormId();
    this.typeTreatment = '2';

    setTimeout(() => {
      this.loadAppointments();
      this.getTypeForm();
    });
    this.typeTreatmentForm = new FormControl('2', [Validators.required]);

    this.treatmentForm = new FormControl('11', [Validators.required]);

    this.dateForm = new FormControl(new Date(), [Validators.required]);

    this.timeForm = new FormControl('09:00', [Validators.required]);

    this.appointmentForm = this.formBuilder.group({
      typeTreatment: this.typeTreatmentForm,
      treatment: this.treatmentForm,
      date: this.dateForm,
      time: this.timeForm,
    });
    this.store.select('appointment').subscribe((store) => {
      this.appointment = store.appointment;
      let typeTreatmentsWithoutSubcategories = ['4', '5', '6', '7'];
      /*if (typeTreatmentsWithoutSubcategories.filter((val)=> (val == this.appointment.user_treatment.id)).length === 0) {
        this.typeTreatment = this.appointment.user_treatment.id;
      } else {

        this.treatment = this.appointment.user_treatment.id;
      }
      
    });
  }

  override ngOnInit(): void {}
  getTypeForm(): void {
    if (this.id === null) {
      this.title = 'Nueva cita';
    } else {
      this.title = 'Editar cita';

      this.store.dispatch(isLoading({ status: true }));
      this.store.dispatch(
        AppointmentAction.getAppointmentById({
          appointmentId: this.id,
        })
      );
    }
  }*/
}
