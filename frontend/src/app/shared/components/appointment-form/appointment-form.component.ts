import { Component } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Store } from '@ngrx/store';
import {
  addMinutes,
  setHours as fnSetHours,
  setMinutes as fnSetMinutes,
} from 'date-fns';
import { AppState } from '../../../app.reducers';
import * as AppointmentAction from '../../../appointments/actions';
import {
  AppointmentClass,
  StateAppointment,
} from '../../../appointments/models/appointment';
import * as CategoriesAction from '../../../categories/actions';
import { CategoryClass, Department } from '../../../categories/models/category';
import { InputDTO, OptionDTO } from '../../../shared/models/input.dto';
import { isLoading } from '../../../spinner/actions/spinner.actions';
import * as TreatmentAction from '../../../treatments/actions';
import { TreatmentClass } from '../../../treatments/models/treatment';
import {
  StateUserTreatment,
  UserTreatmentClass,
} from '../../../user-treatments/models/user-treatments';
import { TypeUser, UserClass } from '../../../users/models/user';
import { RouteService } from '../../services/route.service';

interface AppointmentDTO {
  typeTreatment: string | null;
  treatment: string | null;
  date: Date | null;
  time: string | null;
}

@Component({
  selector: 'app-appointment-form',
  templateUrl: './appointment-form.component.html',
  styleUrl: './appointment-form.component.scss',
})
export class AppointmentFormComponent {
  appointment: AppointmentClass;
  appointmentDTO: AppointmentDTO;
  appointments: AppointmentClass[];
  userTreatment: UserTreatmentClass;
  treatmentSelect: TreatmentClass;
  user: UserClass;
  categories: CategoryClass[];
  typeTreatmentOptions: OptionDTO[];
  treatmentOptions: OptionDTO[];
  dateSelected: boolean;

  typeTreatmentForm: FormControl;
  treatmentForm: FormControl;
  dateForm: FormControl;
  timeForm: FormControl;
  /*
  date: string | null;
  time: string | null;
  typeTreatment: string | null;
  treatment: string | null;*/

  appointmentForm: FormGroup;
  isValidForm: boolean | null;
  checkForm: boolean;

  inputsForm: InputDTO[];

  showFeedback: boolean;
  showErrorFeedback: boolean;

  treatmentRequired: boolean;

  urlId: string | null;

  constructor(
    protected formBuilder: FormBuilder,
    protected store: Store<AppState>,
    public routeService: RouteService
  ) {
    //Initialize
    this.urlId = this.routeService.getProfileFormId();
    this.showFeedback = false;
    this.showErrorFeedback = false;

    this.isValidForm = null;
    this.checkForm = false;

    this.appointmentDTO = {
      typeTreatment: null,
      treatment: null,
      date: null,
      time: null,
    };

    this.treatmentRequired = true;

    this.user = new UserClass('', '', '', '', '', null, TypeUser['user'], '');
    this.treatmentSelect = new TreatmentClass('', '', '', 0, 0, '');
    this.userTreatment = new UserTreatmentClass(
      '',
      '',
      StateUserTreatment['En proceso'],
      0,
      ''
    );
    this.appointment = new AppointmentClass(
      '',
      new Date(),
      StateAppointment['Próxima sesión'],
      this.userTreatment
    );
    this.appointments = new Array<AppointmentClass>();

    this.categories = new Array<CategoryClass>();
    this.typeTreatmentOptions = [];
    this.treatmentOptions = [];
    this.dateSelected = false;

    //LoadCategories
    setTimeout(() => {
      this.loadCategories();
    });

    setTimeout(() => {
      if (this.urlId !== null) {
        this.loadAppointmentById(this.urlId);
      }
    });

    //Form
    this.typeTreatmentForm = new FormControl(
      this.appointmentDTO.typeTreatment,
      [Validators.required]
    );

    this.treatmentForm = new FormControl(this.appointmentDTO.treatment, [
      Validators.required,
    ]);

    this.dateForm = new FormControl(this.appointmentDTO.date, [
      Validators.required,
    ]);

    this.timeForm = new FormControl(this.appointmentDTO.time, [
      Validators.required,
    ]);

    this.appointmentForm = this.formBuilder.group({
      typeTreatment: this.typeTreatmentForm,
      treatment: this.treatmentForm,
      date: this.dateForm,
      time: this.timeForm,
    });

    //Subscriptions store
    this.storeUser();

    this.storeCategory();

    this.storeTreatment();

    this.storeAppointment();

    //Create inputs
    this.inputsForm = this.getDataInputs();
  }

  ngOnInit(): void {
    this.appointmentForm.get('typeTreatment')?.valueChanges.subscribe((id) => {
      this.changeTreatmentOptions(id);
      this.loadTreatment(id);
      this.checkIfTreatmentRequired(id);
    });

    this.appointmentForm.get('treatment')?.valueChanges.subscribe((id) => {
      this.loadTreatment(id);
    });

    this.appointmentForm.get('date')?.valueChanges.subscribe((dateForm) => {
      this.disabledOptionsTime(dateForm);
    });
  }

  protected storeUser(): void {
    this.store.select('user').subscribe((store) => {
      this.user = store.user;
    });
  }

  //Get data to selects "Tipo de tratamiento" and "Tratamiento"
  protected storeCategory(): void {
    this.store.select('categories').subscribe((store) => {
      this.categories = store.categories.filter(
        ({ department }) => department === Department['tratamientos']
      );

      this.changeTypeTreatmentOptions();
    });
  }

  //Get data to treatment
  protected storeTreatment(): void {
    this.store.select('treatments').subscribe((store) => {
      this.treatmentSelect = store.treatment;
      this.changeTypeTreatmentOptions();
    });
  }

  protected storeAppointment(): void {
    this.store.select('appointment').subscribe((store) => {
      this.appointments = store.appointments;

      this.loadTreatment(store.appointment.user_treatment.treatment_id);
      this.checkEdit(store.appointment);

      if (this.isValidForm) {
        if (store.loaded) {
          this.resetErrors();
          this.showFeedback = true;
          this.checkForm = false;

          setTimeout(() => {
            this.showFeedback = false;
          }, 5000);
          this.loadAppointments();
        } else {
          this.showErrorFeedback = true;
        }
      }
    });
  }

  protected loadCategories(): void {
    this.store.dispatch(isLoading({ status: true }));
    this.store.dispatch(CategoriesAction.getCategories());
  }

  protected loadTreatment(id: string): void {
    let typeTreatmentsIds = ['1', '2', '3'].filter((val) => val != id);

    if (typeTreatmentsIds.length !== 0) {
      this.store.dispatch(isLoading({ status: true }));
      this.store.dispatch(
        TreatmentAction.getTreatmentByCategoryId({ categoryId: id })
      );
    }
  }

  protected loadAppointments(): void {
    this.store.dispatch(isLoading({ status: true }));
    this.store.dispatch(AppointmentAction.getAppointments());
  }

  protected loadAppointmentById(id: string) {
    this.store.dispatch(isLoading({ status: true }));
    this.store.dispatch(
      AppointmentAction.getAppointmentById({
        appointmentId: id,
      })
    );
  }

  protected changeTypeTreatmentOptions() {
    this.typeTreatmentOptions = [];
    let typeTreatment = this.categories.filter(
      ({ category_id }) => category_id === null
    );
    typeTreatment.map((category) => {
      this.typeTreatmentOptions = [
        ...this.typeTreatmentOptions,
        {
          id: category.id,
          name: category.name,
        },
      ];
    });
    this.inputsForm = this.getDataInputs();
  }

  protected changeTreatmentOptions(id: string): void {
    this.appointmentDTO.typeTreatment = id;
    this.treatmentOptions = [];
    let treatments = this.categories.filter(
      ({ category_id }) => category_id == id
    );

    treatments.map((category) => {
      this.treatmentOptions = [
        ...this.treatmentOptions,
        {
          id: category.id,
          name: category.name,
        },
      ];
    });
    this.inputsForm = this.getDataInputs();
  }

  protected checkIfTreatmentRequired(id: string): void {
    let typeTreatmentsWithoutSubcategories = ['4', '5', '6', '7'];
    this.treatmentRequired = false;
    this.appointmentForm.get('treatment')?.clearValidators();
    if (
      typeTreatmentsWithoutSubcategories.filter((val) => val == id).length === 0
    ) {
      this.treatmentRequired = true;
      this.appointmentForm.get('treatment')?.addValidators(Validators.required);
    }

    this.appointmentForm.get('treatment')?.updateValueAndValidity();
  }

  protected disabledOptionsTime(dateForm: Date): void {
    let appointmentsDay: AppointmentClass[] = this.appointments.filter(
      ({ date }) =>
        new Date(date).toLocaleDateString() ==
        new Date(dateForm).toLocaleDateString()
    );

    this.searchHoursReserved(appointmentsDay);

    this.dateSelected = true;
    this.inputsForm = this.getDataInputs();
  }

  protected searchHoursReserved(appointmentsDay: AppointmentClass[]): void {
    hours.map((option) => {
      let arrayInterval = option.name.split('-');
      let startHour: string = arrayInterval[0];
      let endHour = arrayInterval[1];

      option.disabled = false;
      appointmentsDay.map((appointment) => {
        let startAppointment: string = new Date(
          appointment.date
        ).toLocaleTimeString();
        let endAppointment: string = '';

        if (appointment.treatment) {
          endAppointment = addMinutes(
            new Date(appointment.date),
            appointment.treatment?.duration
          ).toLocaleTimeString();
        }

        option.disabled = this.compareHours(
          startAppointment,
          endAppointment,
          startHour,
          endHour,
          option
        );
      });

      option.disabled = this.disabledHoursTreatmentDuration(
        startHour,
        endHour,
        startHour,
        endHour,
        option
      );
    });
  }

  protected disabledHoursTreatmentDuration(
    startAppointment: string,
    endAppointment: string,
    startHour: string,
    endHour: string,
    option: OptionDTO
  ): boolean {
    if (option.disabled !== true) {
      let newEndAppointment = addMinutes(
        new Date('1/1/2000 ' + endAppointment + ':00'),
        this.treatmentSelect.duration
      ).toLocaleTimeString();

      return this.compareHours(
        startAppointment,
        newEndAppointment,
        startHour,
        endHour,
        option
      );
    }
    return true;
  }

  protected compareHours(
    startAppointment: string,
    endAppointment: string,
    startHour: string,
    endHour: string,
    option: OptionDTO
  ): boolean {
    if (option.disabled !== true) {
      return (
        (Date.parse('1/1/2000 ' + startAppointment) >=
          Date.parse('1/1/2000 ' + startHour + ':00') &&
          Date.parse('1/1/2000 ' + endAppointment) <
            Date.parse('1/1/2000 ' + endHour + ':00')) ||
        (Date.parse('1/1/2000 ' + startAppointment) >
          Date.parse('1/1/2000 ' + startHour + ':00') &&
          Date.parse('1/1/2000 ' + endHour) >
            Date.parse('1/1/2000 ' + endAppointment + ':00'))
      );
    }
    return true;
  }

  protected checkEdit(appointmentStore: AppointmentClass): void {
    if (appointmentStore.id !== '') {
      this.appointment = appointmentStore;
      this.addDataAppointmentEdit();

      this.typeTreatmentForm.setValue(this.appointmentDTO.typeTreatment);
      this.treatmentForm.setValue(this.appointmentDTO.treatment);
      this.dateForm.setValue(this.appointmentDTO.date);
      this.timeForm.setValue(this.appointmentDTO.time);
    }
  }

  protected addDataAppointmentEdit(): void {
    let typeTreatment: string | null = null;
    let treatment: string | null = null;
    if (this.appointment.treatment) {
      if (
        ['4', '5', '6', '7'].includes(this.appointment.treatment?.category_id)
      ) {
        typeTreatment = this.appointment.treatment.category_id;
      } else {
        treatment = this.appointment.treatment.category_id;

        let category: CategoryClass = this.categories.filter(
          (category) => category.id == this.appointment.treatment?.category_id
        )[0];

        typeTreatment =
          category.category_id !== undefined ? category.category_id : null;
      }

      let time = new Date(this.appointment.date).toLocaleTimeString();
      time = time.substring(0, time.length - 3);

      this.appointmentDTO = {
        typeTreatment: typeTreatment,
        treatment: treatment,
        date: new Date(this.appointment.date),
        time: time,
      };
    }
  }

  protected resetErrors(): void {
    this.showErrorFeedback = false;
    this.showFeedback = false;
    this.isValidForm = false;
    this.appointmentForm.reset();
    this.treatmentOptions = [];
    this.dateSelected = false;
    this.inputsForm = this.getDataInputs();
  }

  sendForm(): void {
    this.checkForm = true;

    if (this.appointmentForm.invalid) {
      return;
    }

    this.checkForm = true;

    if (this.appointmentForm.invalid) {
      return;
    }

    this.isValidForm = true;

    this.getDateForm();

    if (this.urlId !== null && this.urlId !== '') {
      this.updateAppointment();
    } else {
      this.createAppointment();
    }
  }

  protected createAppointment(): void {
    this.store.dispatch(isLoading({ status: true }));
    this.store.dispatch(
      AppointmentAction.createAppointment({
        appointment: this.appointment,
      })
    );
  }

  protected updateAppointment(): void {
    this.store.dispatch(isLoading({ status: true }));
    this.store.dispatch(
      AppointmentAction.updateAppointment({
        appointmentId: this.urlId as string,
        appointment: this.appointment,
      })
    );
  }

  protected getDateForm(): void {
    let hours: string =
      this.appointmentForm.controls['time'].value.split('-')[0];
    let minutes: string =
      this.appointmentForm.controls['time'].value.split(':')[1];
    let date: Date = new Date(this.appointmentForm.controls['date'].value);
    let dateFormat = fnSetHours(
      fnSetMinutes(date, parseInt(minutes)),
      parseInt(hours)
    );

    this.userTreatment = {
      id: '',
      user_id: this.user.id,
      state: StateUserTreatment['En proceso'],
      sessions: 1,
      treatment_id: this.treatmentSelect.id,
    };
    console.log(this.userTreatment);

    this.appointment = {
      id: '',
      date: dateFormat,
      state: StateAppointment['Próxima sesión'],
      user_treatment: this.userTreatment,
    };
  }

  protected getDataInputs(): InputDTO[] {
    return [
      {
        id: 'categoryAppointment',
        label: 'Tipo de tratamiento',
        placeholder: '',
        type: 'select',
        options: this.typeTreatmentOptions,
        formControl: this.typeTreatmentForm,
        required: true,
        errors: [
          {
            type: 'required',
            message: 'Se requiere el tipo de tratamiento',
          },
        ],
      },
      {
        id: 'treatmentAppointment',
        label: 'Tratamiento',
        placeholder: '',
        type: 'select',
        options: this.treatmentOptions,
        formControl: this.treatmentForm,
        required: this.treatmentRequired,
        errors: [
          {
            type: 'required',
            message: 'Se requiere un tratamiento',
          },
        ],
      },
      {
        id: 'dateAppointment',
        label: 'Día',
        placeholder: 'dd/mm/aaaa',
        type: 'date',
        formControl: this.dateForm,
        required: true,
        errors: [
          {
            type: 'required',
            message: 'Se requiere un día',
          },
        ],
      },
      {
        id: 'timeInfoAppointment',
        label: 'Hora',
        placeholder: '',
        type: 'select',
        options: hours,
        formControl: this.timeForm,
        required: true,
        errors: [
          {
            type: 'required',
            message: 'Seleccione una hora',
          },
        ],
      },
    ];
  }
}

const hours: OptionDTO[] = [
  {
    id: '9:00',
    name: '09:00-10:00',
  },
  {
    id: '10:00',
    name: '10:00-11:00',
  },
  {
    id: '11:00',
    name: '11:00-12:00',
  },
  {
    id: '12:00',
    name: '12:00-13:00',
  },
  {
    id: '15:00',
    name: '15:00-16:00',
  },
  {
    id: '16:00',
    name: '16:00-17:00',
  },
  {
    id: '17:00',
    name: '17:00-18:00',
  },
  {
    id: '18:00',
    name: '18:00-19:00',
  },
];
