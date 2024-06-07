import { Component } from '@angular/core';
import { BreadcrumbDTO } from '../../../shared/models/breadcrumb.dto';

@Component({
  selector: 'app-products-categories',
  templateUrl: './products-categories.component.html',
  styleUrl: './products-categories.component.scss',
})
export class ProductsCategoriesComponent {
  title!: string;

  constructor() {}
  receiveBreadcrumb(breadcrumb: BreadcrumbDTO): void {
    setTimeout(() => {
      this.title = breadcrumb.name;
    });
  }
}
