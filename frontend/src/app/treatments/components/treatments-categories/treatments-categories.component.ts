import { Component } from '@angular/core';
import { BreadcrumbDTO } from '../../../shared/models/breadcrumb.dto';

@Component({
  selector: 'app-treatments-categories',
  templateUrl: './treatments-categories.component.html',
  styleUrl: './treatments-categories.component.scss',
})
export class TreatmentsCategoriesComponent {
  title!: string;

  constructor() {}

  receiveBreadcrumb(breadcrumb: BreadcrumbDTO): void {
    setTimeout(() => {
      this.title = breadcrumb.name;
    });
  }
}
