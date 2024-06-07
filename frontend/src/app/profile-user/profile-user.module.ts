import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
import { ProfileUserAddressesFormComponent } from './components/addresses/profile-user-addresses-form/profile-user-addresses-form.component';
import { ProfileUserAddressesTableComponent } from './components/addresses/profile-user-addresses-table/profile-user-addresses-table.component';
import { ProfileUserAppointmentsFormComponent } from './components/appointments/profile-user-appointments-form/profile-user-appointments-form.component';
import { ProfileUserAppointmentsTableComponent } from './components/appointments/profile-user-appointments-table/profile-user-appointments-table.component';
import { ProfileUserOrdersTableComponent } from './components/orders/profile-user-orders-table/profile-user-orders-table.component';
import { ProfileUserPersonalFormComponent } from './components/personal/profile-user-personal-form/profile-user-personal-form.component';
import { ProfileComponent } from './components/profile/profile.component';
import { ProfileUserTreatmentsTableComponent } from './components/treatments/profile-user-treatments-table/profile-user-treatments-table.component';
import { ProfileUserRoutingModule } from './profile-user-routing.module';

@NgModule({
  declarations: [
    ProfileComponent,
    ProfileUserPersonalFormComponent,
    ProfileUserAddressesTableComponent,
    ProfileUserOrdersTableComponent,
    ProfileUserAppointmentsTableComponent,
    ProfileUserTreatmentsTableComponent,
    ProfileUserAddressesFormComponent,
    ProfileUserAppointmentsFormComponent,
  ],
  imports: [
    CommonModule,
    ProfileUserRoutingModule,
    SharedModule,
    ReactiveFormsModule,
  ],
})
export class ProfileUserModule {
  constructor() {
    console.log('ProfileUserModule loaded.');
  }
}
