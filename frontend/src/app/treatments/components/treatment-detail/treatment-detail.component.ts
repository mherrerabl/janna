import { ViewportScroller } from '@angular/common';
import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { faClock, faHourglass } from '@fortawesome/free-regular-svg-icons';
import { faEuro } from '@fortawesome/free-solid-svg-icons';
import { Store } from '@ngrx/store';
import { AppState } from '../../../app.reducers';
import * as ProductAction from '../../../products/actions';
import { ProductClass } from '../../../products/models/product';
import { RouteService } from '../../../shared/services/route.service';
import { isLoading } from '../../../spinner/actions/spinner.actions';
import { TreatmentClass } from '../../models/treatment';
import * as TreatmentsAction from './../../actions';

@Component({
  selector: 'app-treatment-detail',
  templateUrl: './treatment-detail.component.html',
  styleUrl: './treatment-detail.component.scss',
})
export class TreatmentDetailComponent {
  treatment: TreatmentClass;
  prevTreatment: TreatmentClass;
  private urlTreatment!: string | null;

  iconHourglass = faHourglass;
  iconClock = faClock;
  iconEuro = faEuro;
  productsRelated: ProductClass[];

  breakpoints = {
    0: {
      slidesPerView: 2,
    },
    640: {
      slidesPerView: 3,
    },
    1024: {
      slidesPerView: 4,
    },
    1200: {
      slidesPerView: 6,
    },
  };
  constructor(
    private route: ActivatedRoute,
    private store: Store<AppState>,
    private scroller: ViewportScroller,
    private routeService: RouteService
  ) {
    this.treatment = new TreatmentClass('', '', '', 0, 0, '');
    this.prevTreatment = new TreatmentClass('', '', '', 0, 0, '');
    this.productsRelated = new Array<ProductClass>();
    this.treatment = new TreatmentClass('', '', '', 0, 0, '');

    this.loadTreatments(this.getUrlTreatment());

    this.store.select('treatments').subscribe((store) => {
      this.treatment = store.treatment;
      if (this.treatment.id != '') {
        this.loadProductsByTreatment(this.treatment.id);
      }
    });

    this.store.select('products').subscribe((store) => {
      this.productsRelated = store.products;
    });
  }

  private getUrlTreatment(): string {
    let breadcrumbs = this.routeService.breadcrumbTreatments();
    let breadcrumb = breadcrumbs[breadcrumbs.length - 1];
    return breadcrumb.url;
  }

  private loadTreatments(paramUrl: string): void {
    setTimeout(() => {
      this.store.dispatch(isLoading({ status: true }));
    });
    this.store.dispatch(
      TreatmentsAction.getTreatmentByUrl({ paramUrl: paramUrl })
    );
  }

  private loadProductsByTreatment(treatmentId: string): void {
    this.store.dispatch(isLoading({ status: true }));
    this.store.dispatch(
      ProductAction.getProductsByTreatmentId({ treatmentId: treatmentId })
    );
  }

  navigateToSection(section: string) {
    this.scroller.scrollToAnchor(section);
  }
}
