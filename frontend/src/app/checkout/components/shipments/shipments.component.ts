import { Component } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Store } from '@ngrx/store';
import * as AddressAction from '../../../addresses/actions';
import * as CartAction from '../../../carts/actions';

import { AddressClass } from '../../../addresses/models/address';
import { AppState } from '../../../app.reducers';
import { CartClass } from '../../../carts/models/cart';
import { ProductCartClass } from '../../../carts/models/product-cart';
import { InputDTO } from '../../../shared/models/input.dto';
import { ShipmentDTO } from '../../../shared/models/shipment.dto';
import { ModalService } from '../../../shared/services/modal.service';
import { isLoading } from '../../../spinner/actions/spinner.actions';
import { TypeUser, UserClass } from '../../../users/models/user';

@Component({
  selector: 'app-shipments',
  templateUrl: './shipments.component.html',
  styleUrl: './shipments.component.scss',
})
export class ShipmentsComponent {
  methodShipment: FormControl;
  methodShipmentValue: string = '';
  shippmentMethodForm: FormGroup;

  addressShipment: FormControl;
  addressShipmentValue: string = '';
  addressShipmentFrom: FormGroup;

  addresses: AddressClass[];
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

  user: UserClass;
  cart: CartClass;
  addressPredetermined: string | null = null;
  constructor(
    private formBuilder: FormBuilder,
    private store: Store<AppState>,
    private modalService: ModalService
  ) {
    this.modalService.closeCart();

    this.user = new UserClass('', '', '', '', '', null, TypeUser['user'], '');
    this.addresses = new Array<AddressClass>();
    this.address = new AddressClass(
      '',
      '',
      '',
      0,
      '',
      '',
      '',
      true,
      this.user.id
    );

    this.isPredetermined = true;
    this.showFeedback = false;
    this.showErrorFeedback = false;
    this.isValidForm = null;
    this.checkForm = false;

    this.store.select('user').subscribe((store) => {
      this.user = store.user;
      this.loadAddresesByUser(this.user.id);
    });

    this.resetStoreAddresses();

    this.store.select('address').subscribe((store) => {
      this.addresses = store.addresses;

      if (this.addresses.length > 0) {
        this.setAddressPredetemined();

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
      }
    });

    //Form radio type shippment
    this.methodShipment = new FormControl(this.methodShipmentValue, [
      Validators.required,
    ]);
    this.shippmentMethodForm = this.formBuilder.group({
      method: this.methodShipment,
    });

    //Form radio addresses
    this.addressShipment = new FormControl(this.addressShipmentValue, [
      Validators.required,
    ]);
    this.addressShipmentFrom = this.formBuilder.group({
      address: this.addressShipment,
    });

    //Form new address
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

    this.predetermined = new FormControl(this.isPredetermined);

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

    this.cart = new CartClass('', '', 0, new Array<ProductCartClass>());

    this.store.select('carts').subscribe((store) => {
      this.cart = store.cart;
    });
  }

  private loadAddresesByUser(userId: string): void {
    this.store.dispatch(isLoading({ status: true }));
    this.store.dispatch(AddressAction.getAddressByUserId({ userId: userId }));
  }

  private setAddressPredetemined(): void {
    this.addresses.forEach(({ id, predetermined }) => {
      if (predetermined == true) {
        this.addressShipment.setValue('address' + id);

        this.addressShipmentFrom = this.formBuilder.group({
          address: this.addressShipment,
        });
        this.addressPredetermined = id;
        this.saveAddres('shipment', id);
      }
    });
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

    this.createAddress();
  }

  private resetStoreAddresses(): void {
    this.store.dispatch(isLoading({ status: true }));
    this.store.dispatch(AddressAction.resetState());
  }

  private createAddress(): void {
    this.store.dispatch(isLoading({ status: true }));
    this.store.dispatch(
      AddressAction.createAddress({
        address: this.address,
      })
    );

    setTimeout(() => {
      this.loadAddresesByUser(this.user.id);
    }, 500);
  }

  saveAddres(method: string, value?: string): void {
    let shipment: ShipmentDTO = {
      method: method,
      address:
        value === undefined
          ? method == 'shop'
            ? null
            : this.addressPredetermined
          : value,
    };

    this.store.dispatch(CartAction.saveShipment({ shipment: shipment }));
  }

  private getDateForm(): void {
    if (this.address.user_id === undefined) {
      this.address.user_id = this.user.id;
    }

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
