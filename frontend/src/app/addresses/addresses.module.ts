import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { AddressesRoutingModule } from './addresses-routing.module';

@NgModule({
  declarations: [],
  imports: [CommonModule, AddressesRoutingModule],
})
export class AddressesModule {
  constructor() {
    console.log('AddressesModule loaded.');
  }
}
