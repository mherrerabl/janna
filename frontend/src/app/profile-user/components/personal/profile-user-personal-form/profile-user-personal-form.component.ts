import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Store } from '@ngrx/store';
import { AppState } from '../../../../app.reducers';
import { InputDTO } from '../../../../shared/models/input.dto';
import { CustomValidator } from '../../../../shared/validators/custom-validator';
import { isLoading } from '../../../../spinner/actions/spinner.actions';
import * as UserAction from '../../../../users/actions';
import { TypeUser, UserClass } from '../../../../users/models/user';
@Component({
  selector: 'app-profile-user-personal-form',
  templateUrl: './profile-user-personal-form.component.html',
  styleUrl: './profile-user-personal-form.component.scss',
})
export class ProfileUserPersonalFormComponent implements OnInit {
  user: UserClass;
  name: FormControl;
  surname: FormControl;
  email: FormControl;
  phone: FormControl;
  password: FormControl;
  passwordConfirm: FormControl;

  passwordConfirmData: string;

  personalForm: FormGroup;
  isValidForm: boolean | null;
  checkForm: boolean;

  inputsForm: InputDTO[];

  showFeedback: boolean;
  showErrorFeedback: boolean;

  constructor(
    private formBuilder: FormBuilder,
    private store: Store<AppState>
  ) {
    this.showFeedback = false;
    this.showErrorFeedback = false;

    this.isValidForm = null;
    this.checkForm = false;

    this.user = new UserClass('', '', '', '', '', null, TypeUser['user'], '');
    this.passwordConfirmData = '';

    this.store.select('user').subscribe((store) => {
      this.user = store.user;

      if (this.isValidForm) {
        if (store.loaded) {
          this.resetErrors();
          this.showFeedback = true;
          this.checkForm = false;

          setTimeout(() => {
            this.showFeedback = false;
          }, 5000);
        } else {
          this.showErrorFeedback = true;
        }
      }
    });

    this.name = new FormControl(this.user.name, [
      Validators.required,
      Validators.maxLength(55),
    ]);

    this.surname = new FormControl(this.user.surname, [
      Validators.required,
      Validators.maxLength(55),
    ]);

    this.email = new FormControl(this.user.email, [
      Validators.required,
      Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,4}$'),
    ]);

    this.phone = new FormControl(this.user.phone, [
      Validators.pattern('^[0-9]*$'),
      Validators.maxLength(9),
      Validators.minLength(9),
    ]);

    this.password = new FormControl(this.user.password, [
      Validators.required,
      Validators.minLength(8),
      CustomValidator.matchValidator('confirmPassword', true),
    ]);

    (this.passwordConfirm = new FormControl()),
      (this.passwordConfirm = new FormControl(this.passwordConfirmData, [
        Validators.required,
        Validators.minLength(8),
        CustomValidator.matchValidator('password'),
      ]));

    this.inputsForm = this.getDataInputs();

    this.personalForm = this.formBuilder.group({
      name: this.name,
      surname: this.surname,
      email: this.email,
      phone: this.phone,
      password: this.password,
      passwordConfirm: this.passwordConfirm,
    });
  }

  ngOnInit(): void {}

  resetErrors(): void {
    this.showErrorFeedback = false;
    this.showFeedback = false;
    this.isValidForm = false;
  }

  updateUser(): void {
    this.checkForm = true;

    if (this.personalForm.invalid) {
      return;
    }

    this.isValidForm = true;
    this.user = {
      id: this.user.id,
      name: this.personalForm.controls['name'].value,
      surname: this.personalForm.controls['surname'].value,
      email: this.personalForm.controls['email'].value,
      phone: this.personalForm.controls['phone'].value,
      password: this.personalForm.controls['password'].value,
      type: TypeUser[this.user.type],
      token: this.user.token,
    };

    this.store.dispatch(isLoading({ status: true }));
    this.store.dispatch(
      UserAction.updateUser({ userId: this.user.id, user: this.user })
    );
  }

  private getDataInputs(): InputDTO[] {
    return [
      {
        id: 'namePersonalData',
        label: 'Nombre',
        placeholder: 'Escriba su nombre',
        type: 'text',
        formControl: this.name,
        required: true,
        errors: [
          {
            type: 'required',
            message: 'Se requiere su nombre',
          },
          {
            type: 'maxlength',
            message: 'Máximo 55 carácteres',
          },
        ],
      },
      {
        id: 'surnamePersonalData',
        label: 'Apellidos',
        placeholder: 'Escriba sus apellidos',
        type: 'text',
        formControl: this.surname,
        required: true,
        errors: [
          {
            type: 'required',
            message: 'Se requiere sus apellidos',
          },
          {
            type: 'maxlength',
            message: 'Máximo 55 carácteres',
          },
        ],
      },
      {
        id: 'emailPersonalData',
        label: 'Correo electrónico',
        placeholder: 'Escriba su correo electrónico',
        type: 'text',
        formControl: this.email,
        required: true,
        iconLeft: 'email',
        errors: [
          {
            type: 'required',
            message: 'Se requiere sus apellidos',
          },
          {
            type: 'pattern',
            message: 'El formato no es válido',
          },
        ],
      },
      {
        id: 'phonePersonalData',
        label: 'Teléfono/Móvil',
        placeholder: 'Escriba su teléfono de contacto',
        type: 'tel',
        formControl: this.phone,
        required: false,
        iconLeft: 'phone',
        errors: [
          {
            type: 'maxlength',
            message: 'Máximo 9 números',
          },
          {
            type: 'minlength',
            message: 'Mínimo 9 números',
          },
          {
            type: 'pattern',
            message: 'El formato no es válido. Solo se aceptan números',
          },
        ],
      },
      {
        id: 'passwordPersonalData',
        label: 'Contraseña',
        placeholder: 'Escriba una constraseña',
        type: 'password',
        formControl: this.password,
        iconRight: 'password',
        required: true,
        errors: [
          {
            type: 'required',
            message: 'Escriba una contraseña',
          },
          {
            type: 'minlength',
            message: 'Mínimo 8 carácteres',
          },
        ],
      },
      {
        id: 'passwordConfirmationPersonalData',
        label: 'Confimración de contraseña',
        placeholder: 'Repita la constraseña',
        type: 'password',
        formControl: this.passwordConfirm,
        iconRight: 'password',
        required: true,
        errors: [
          {
            type: 'required',
            message: 'Escriba una contraseña',
          },
          {
            type: 'minlength',
            message: 'Mínimo 8 carácteres',
          },
          {
            type: 'matching',
            message: 'La contraseña no coincide',
          },
        ],
      },
    ];
  }
}
