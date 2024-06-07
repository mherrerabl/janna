import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
import { CheckoutRoutingModule } from './checkout-routing.module';
import { ErrorComponent } from './components/error/error.component';
import { PaymentComponent } from './components/payment/payment.component';
import { ShipmentsComponent } from './components/shipments/shipments.component';
import { SuccessComponent } from './components/success/success.component';

@NgModule({
  declarations: [
    ShipmentsComponent,
    PaymentComponent,
    SuccessComponent,
    ErrorComponent,
  ],
  imports: [
    CommonModule,
    CheckoutRoutingModule,
    SharedModule,
    ReactiveFormsModule,
  ],
})
export class CheckoutModule {
  constructor() {
    console.log('CheckoutModule loaded.');
  }
}
