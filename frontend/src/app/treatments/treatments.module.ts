import { CommonModule } from '@angular/common';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';

import { CategoriesModule } from '../categories/categories.module';
import { SharedModule } from '../shared/shared.module';
import { TreatmentDetailComponent } from './components/treatment-detail/treatment-detail.component';
import { TreatmentsCategoriesComponent } from './components/treatments-categories/treatments-categories.component';
import { TreatmentsRoutingModule } from './treatments-routing.module';

@NgModule({
  declarations: [TreatmentDetailComponent, TreatmentsCategoriesComponent],
  imports: [
    CommonModule,
    TreatmentsRoutingModule,
    SharedModule,
    CategoriesModule,
  ],
  exports: [TreatmentDetailComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class TreatmentsModule {
  constructor() {
    console.log('TreatmentsModule loaded.');
  }
}
