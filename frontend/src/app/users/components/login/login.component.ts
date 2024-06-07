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
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent implements OnInit {
  user: UserClass;

  email: FormControl;
  password: FormControl;
  passwordConfirm: FormControl;
  checkLogin: FormControl;
  keepLogin: boolean;
  passwordConfirmData: string;

  loginForm: FormGroup;
  isValidForm: boolean | null;
  checkForm: boolean;

  inputsForm: InputDTO[];

  showFeedback: boolean;
  showErrorFeedback: boolean;
  errorEmail: boolean;
  errorPassword: boolean;

  showLogin$!: Observable<'open' | 'close'>;
  iconClose = faXmark;

  constructor(
    private formBuilder: FormBuilder,
    private store: Store<AppState>,
    private modalService: ModalService,
    private localService: LocalStorageService
  ) {
    this.showFeedback = false;
    this.showErrorFeedback = false;
    this.errorEmail = false;
    this.errorPassword = false;

    this.isValidForm = null;
    this.checkForm = false;
    this.keepLogin = false;

    this.user = new UserClass('', '', '', '', '', null, TypeUser['user'], '');
    this.passwordConfirmData = '';

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

    this.loginForm = this.formBuilder.group({
      email: this.email,
      password: this.password,
      passwordConfirm: this.passwordConfirm,
      checkLogin: this.checkLogin,
    });

    this.store.select('user').subscribe((store) => {
      if (store.loaded) {
        this.resetErrors();

        if (store.user.token !== undefined && store.user.token !== '') {
          this.user = store.user;

          if (this.keepLogin) {
            let user: UserDTO = {
              email: store.user.email,
              token: store.user.token,
            };

            this.localService.saveUser(user);
          }

          this.loginForm.reset();
          this.showFeedback = true;
          this.checkForm = false;
          this.keepLogin = false;

          setTimeout(() => {
            this.showFeedback = false;
            this.closeLogin();
          }, 3000);
        } else {
          this.notificationErrors(store.user);
        }
      }
    });
  }

  resetErrors(): void {
    this.showErrorFeedback = false;
    this.errorEmail = false;
    this.errorPassword = false;
    this.showFeedback = false;
    this.isValidForm = false;
  }

  notificationErrors(error: any): void {
    this.showErrorFeedback = true;
    let message: any = error;

    if (message === 'email') {
      this.errorEmail = true;
    }
    if (message === 'password') {
      this.errorPassword = true;
    }
  }

  ngOnInit(): void {
    this.showLogin$ = this.modalService.watchLogin();
  }

  login(): void {
    this.checkForm = true;

    if (this.loginForm.invalid) {
      return;
    }

    this.isValidForm = true;
    let user: UserDTO = {
      email: this.loginForm.controls['email'].value,
      password: this.loginForm.controls['password'].value,
    };

    this.store.dispatch(isLoading({ status: true }));
    this.store.dispatch(UserAction.getUserLogin({ user: user }));
  }

  getKeepLogin(): void {
    this.keepLogin = !this.keepLogin;
  }

  closeLogin(): void {
    this.modalService.closeLogin();
  }

  openRegister(): void {
    this.modalService.openRegister();
  }
  private getDataInputs(): InputDTO[] {
    return [
      {
        id: 'emailLogin',
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
        id: 'passwordLogin',
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
        id: 'PasswordConfirmationLogin',
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
