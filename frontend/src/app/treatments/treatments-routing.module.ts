import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TreatmentDetailComponent } from './components/treatment-detail/treatment-detail.component';
import { TreatmentsCategoriesComponent } from './components/treatments-categories/treatments-categories.component';

const routes: Routes = [
  {
    path: '',
    component: TreatmentsCategoriesComponent,
  },
  {
    path: 'info/:treatment',
    component: TreatmentDetailComponent,
  },
  {
    path: ':category',
    component: TreatmentsCategoriesComponent,
  },
  {
    path: ':category/info/:treatment',
    component: TreatmentDetailComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TreatmentsRoutingModule {}
