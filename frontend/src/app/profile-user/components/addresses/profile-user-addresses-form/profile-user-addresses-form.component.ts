import { Component } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Store } from '@ngrx/store';
import * as AddressAction from '../../../../addresses/actions';
import { AddressClass } from '../../../../addresses/models/address';
import { AppState } from '../../../../app.reducers';
import { InputDTO } from '../../../../shared/models/input.dto';
import { RouteService } from '../../../../shared/services/route.service';
import { isLoading } from '../../../../spinner/actions/spinner.actions';
import { TypeUser, UserClass } from '../../../../users/models/user';

@Component({
  selector: 'app-profile-user-addresses-form',
  templateUrl: './profile-user-addresses-form.component.html',
  styleUrl: './profile-user-addresses-form.component.scss',
})
export class ProfileUserAddressesFormComponent {
  address: AddressClass;

  name: FormControl;
  address1: FormControl;
  number: FormControl;
  additionalInfo: FormControl;
  zip: FormControl;
  city: FormControl;
  predetermined: FormControl;
  isPredetermined: boolean;

  addressForm: FormGroup;
  isValidForm: boolean | null;
  checkForm: boolean;

  inputsForm: InputDTO[];

  showFeedback: boolean;
  showErrorFeedback: boolean;

  title: string;
  urlId: string | null;
  user: UserClass;

  constructor(
    private formBuilder: FormBuilder,
    private store: Store<AppState>,
    public routeService: RouteService
  ) {
    this.showFeedback = false;
    this.showErrorFeedback = false;

    this.isValidForm = null;
    this.checkForm = false;

    this.isPredetermined = false;

    this.address = new AddressClass('', '', '', '', '', '', '', false, '');

    this.title = '';
    this.urlId = this.routeService.getProfileFormId();

    this.user = new UserClass('', '', '', '', '', null, TypeUser['user'], '');

    this.getTypeForm();

    this.name = new FormControl(this.address.name, [
      Validators.required,
      Validators.maxLength(50),
    ]);

    this.address1 = new FormControl(this.address.address, [
      Validators.required,
      Validators.maxLength(100),
    ]);

    this.number = new FormControl(this.address.number, [
      Validators.required,
      Validators.pattern('^[0-9]*$'),
    ]);

    this.additionalInfo = new FormControl(this.address.additionalInfo, [
      Validators.maxLength(100),
    ]);

    this.zip = new FormControl(this.address.zip, [
      Validators.required,
      Validators.minLength(5),
      Validators.maxLength(5),
      Validators.pattern('^[0-9]*$'),
    ]);

    this.city = new FormControl(this.address.city, [
      Validators.required,
      Validators.maxLength(50),
    ]);

    this.predetermined = new FormControl(this.address.predetermined);

    this.inputsForm = this.getDataInputs();

    this.addressForm = this.formBuilder.group({
      name: this.name,
      address: this.address1,
      number: this.number,
      additionalInfo: this.additionalInfo,
      zip: this.zip,
      city: this.city,
      predeterminate: this.predetermined,
    });

    this.store.select('user').subscribe((store) => {
      this.user = store.user;
    });
    this.store.select('address').subscribe((store) => {
      if (this.urlId !== null) {
        this.address = store.address;
      }

      this.name.setValue(this.address.name);

      this.address1.setValue(this.address.address);

      this.number.setValue(this.address.number);

      this.additionalInfo.setValue(this.address.additionalInfo);

      this.zip.setValue(this.address.zip);

      this.city.setValue(this.address.city);

      this.predetermined.setValue(this.address.predetermined);
      this.isPredetermined = this.address.predetermined;

      this.addressForm = this.formBuilder.group({
        name: this.name,
        address: this.address1,
        number: this.number,
        additionalInfo: this.additionalInfo,
        zip: this.zip,
        city: this.city,
        predeterminate: this.predetermined,
      });

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
  }

  ngOnInit(): void {}

  getTypeForm(): void {
    if (this.urlId === null) {
      this.title = 'Nueva dirección';
    } else {
      this.title = 'Editar dirección';

      this.store.dispatch(isLoading({ status: true }));
      this.store.dispatch(
        AddressAction.getAddressById({
          addressId: this.urlId,
        })
      );
    }
  }

  getIsPredetermined(): void {
    this.isPredetermined = !this.isPredetermined;
  }

  resetErrors(): void {
    this.showErrorFeedback = false;
    this.showFeedback = false;
    this.isValidForm = false;
    this.isPredetermined = false;
  }

  sendForm(): void {
    this.checkForm = true;

    if (this.addressForm.invalid) {
      return;
    }

    this.checkForm = true;

    if (this.addressForm.invalid) {
      return;
    }

    this.isValidForm = true;

    this.getDateForm();

    if (this.urlId === null) {
      this.createAddress();
    } else {
      this.updateAddress();
    }
  }

  private updateAddress(): void {
    this.store.dispatch(isLoading({ status: true }));
    this.store.dispatch(
      AddressAction.updateAddress({
        addressId: this.address.id,
        address: this.address,
      })
    );
  }

  private createAddress(): void {
    this.store.dispatch(isLoading({ status: true }));
    this.store.dispatch(
      AddressAction.createAddress({
        address: this.address,
      })
    );
  }

  private getDateForm(): void {
    if (this.address.user_id === undefined) {
      this.address.user_id = this.user.id;
    }
    console.log(this.addressForm.controls['additionalInfo'].value);

    this.address = {
      id: this.address.id,
      name: this.addressForm.controls['name'].value,
      address: this.addressForm.controls['address'].value,
      number: this.addressForm.controls['number'].value,
      additionalInfo: `${this.addressForm.controls['additionalInfo'].value}`,
      zip: this.addressForm.controls['zip'].value,
      city: this.addressForm.controls['city'].value,
      predetermined: this.isPredetermined,
      user_id: this.user.id,
    };
  }

  private getDataInputs(): InputDTO[] {
    return [
      {
        id: 'nameAddress',
        label: 'Nombre',
        placeholder: 'Escriba el nombre de la dirección',
        type: 'text',
        formControl: this.name,
        required: true,
        errors: [
          {
            type: 'required',
            message: 'Se requiere un nombre',
          },
          {
            type: 'maxlength',
            message: 'Máximo 50 carácteres',
          },
        ],
      },
      {
        id: 'addressAddress',
        label: 'Dirección',
        placeholder: 'Escriba la dirección',
        type: 'text',
        formControl: this.address1,
        required: true,
        errors: [
          {
            type: 'required',
            message: 'Se requiere la dirección',
          },
          {
            type: 'maxlength',
            message: 'Máximo 150 carácteres',
          },
        ],
      },
      {
        id: 'numberAddress',
        label: 'Número',
        placeholder: 'Escriba el número',
        type: 'text',
        formControl: this.number,
        required: true,
        errors: [
          {
            type: 'required',
            message: 'Se requiere el número',
          },
          {
            type: 'pattern',
            message: 'Solo se aceptan números',
          },
        ],
      },
      {
        id: 'additionalInfoAddress',
        label: 'Piso, bloque, puerta',
        placeholder: 'Escriba la información adicional',
        type: 'text',
        formControl: this.additionalInfo,
        required: false,
        errors: [
          {
            type: 'maxlength',
            message: 'Máximo 100 carácteres',
          },
        ],
      },
      {
        id: 'zipAddress',
        label: 'Código postal',
        placeholder: 'Escriba el código postal',
        type: 'text',
        formControl: this.zip,
        required: true,
        errors: [
          {
            type: 'required',
            message: 'Escriba el código postal',
          },
          {
            type: 'minlength',
            message: 'Mínimo 5 números',
          },
          {
            type: 'maxlength',
            message: 'Máximo 5 números',
          },
          {
            type: 'pattern',
            message: 'Solo se aceptan números',
          },
        ],
      },
      {
        id: 'cityAddress',
        label: 'Ciudad',
        placeholder: 'Escriba la ciudad',
        type: 'text',
        formControl: this.city,
        required: true,
        errors: [
          {
            type: 'required',
            message: 'Escriba la ciudad',
          },
          {
            type: 'maxlength',
            message: 'Máximo 50 carácteres',
          },
        ],
      },
    ];
  }
}
