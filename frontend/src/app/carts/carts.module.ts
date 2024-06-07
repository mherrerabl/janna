import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { CartsRoutingModule } from './carts-routing.module';

@NgModule({
  declarations: [],
  imports: [CommonModule, CartsRoutingModule],
})
export class CartsModule {
  constructor() {
    console.log('CartModule loaded.');
  }
}
