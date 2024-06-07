import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { UserTreatmentsRoutingModule } from './user-treatments-routing.module';

@NgModule({
  declarations: [],
  imports: [CommonModule, UserTreatmentsRoutingModule],
})
export class UserTreatmentsModule {
  constructor() {
    console.log('UserTreatmentsModule loaded.');
  }
}
