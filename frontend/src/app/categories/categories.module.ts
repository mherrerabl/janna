import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { SharedModule } from '../shared/shared.module';
import { CategoriesRoutingModule } from './categories-routing.module';
import { CategoriesComponent } from './components/categories/categories.component';

@NgModule({
  declarations: [CategoriesComponent],
  imports: [CommonModule, CategoriesRoutingModule, SharedModule],
  exports: [CategoriesComponent],
})
export class CategoriesModule {
  constructor() {
    console.log('CategoriesModule loaded.');
  }
}
