import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AppState } from '../../../app.reducers';
import { InputDTO } from '../../../shared/models/input.dto';
import { LocalStorageService } from '../../../shared/services/local-storage.service';
import { ModalService } from '../../../shared/services/modal.service';
import { CustomValidator } from '../../../shared/validators/custom-validator';
import { isLoading } from '../../../spinner/actions/spinner.actions';
import * as UserAction from '../../actions';
import { TypeUser, UserClass } from '../../models/user';
import { UserDTO } from '../../models/user.dto';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss',
})
export class RegisterComponent implements OnInit {
  user: UserClass;
  name: FormControl;
  surname: FormControl;
  email: FormControl;
  password: FormControl;
  passwordConfirm: FormControl;
  checkLogin: FormControl;
  keepLogin: boolean;

  passwordConfirmData: string;

  registerForm: FormGroup;
  isValidForm: boolean | null;
  checkForm: boolean;

  inputsForm: InputDTO[];

  showFeedback: boolean;
  showErrorFeedback: boolean;

  showRegister$!: Observable<'open' | 'close'>;
  iconClose = faXmark;

  constructor(
    private formBuilder: FormBuilder,
    private store: Store<AppState>,
    private modalService: ModalService,
    private localService: LocalStorageService
  ) {
    this.showFeedback = false;
    this.showErrorFeedback = false;

    this.isValidForm = null;
    this.checkForm = false;
    this.keepLogin = false;

    this.user = new UserClass('', '', '', '', '', null, TypeUser['user'], '');
    this.passwordConfirmData = '';

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

    this.checkLogin = new FormControl();

    this.inputsForm = this.getDataInputs();

    this.registerForm = this.formBuilder.group({
      name: this.name,
      surname: this.surname,
      email: this.email,
      password: this.password,
      passwordConfirm: this.passwordConfirm,
      checkLogin: this.checkLogin,
    });

    this.store.select('user').subscribe((store) => {
      if (this.isValidForm) {
        this.resetErrors();
        if (store.user.id !== undefined) {
          if (this.keepLogin) {
            let user: UserDTO = {
              email: store.user.email,
              token: store.user.token,
            };
            this.localService.saveUser(user);
          }

          this.registerForm.reset();
          this.showFeedback = true;
          this.checkForm = false;
          this.keepLogin = false;

          setTimeout(() => {
            this.showFeedback = false;
            this.closeRegister();
          }, 3000);
        } else {
          this.showErrorFeedback = true;
        }
      }
    });
  }

  ngOnInit(): void {
    this.showRegister$ = this.modalService.watchRegister();
  }

  resetErrors(): void {
    this.showErrorFeedback = false;
    this.showFeedback = false;
  }

  register(): void {
    this.checkForm = true;

    if (this.registerForm.invalid) {
      return;
    }

    this.isValidForm = true;
    this.user = {
      id: '',
      name: this.registerForm.controls['name'].value,
      surname: this.registerForm.controls['surname'].value,
      password: this.registerForm.controls['password'].value,
      email: this.registerForm.controls['email'].value,
      phone: null,
      type: TypeUser['user'],
      token: '',
    };

    this.store.dispatch(isLoading({ status: true }));
    this.store.dispatch(UserAction.createUser({ user: this.user }));
  }

  getKeepLogin(): void {
    this.keepLogin = !this.keepLogin;
  }

  closeRegister(): void {
    this.modalService.closeRegister();
  }

  openLogin(): void {
    this.modalService.closeRegister();
    this.modalService.openLogin();
  }
  private getDataInputs(): InputDTO[] {
    return [
      {
        id: 'nameRegister',
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
        id: 'surnameRegister',
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
        id: 'emailRegister',
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
        id: 'passwordRegister',
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
        id: 'passwordConfirmationRegister',
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
