import { Location } from '@angular/common';
import { Injectable } from '@angular/core';
import { NavigationStart, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { AppState } from '../../app.reducers';
import * as CategoriesAction from '../../categories/actions';
import * as ProductsAction from '../../products/actions';
import * as TreatmentsAction from '../../treatments/actions';

import { BreadcrumbDTO } from '../models/breadcrumb.dto';

interface fixedRoute {
  url: string;
  name: string;
}
@Injectable({
  providedIn: 'root',
})
export class RouteService {
  urls: string[] = [];

  categories: BreadcrumbDTO[];

  products: BreadcrumbDTO[];

  constructor(
    private router: Router,
    private location: Location,
    private store: Store<AppState>
  ) {
    this.categories = new Array<BreadcrumbDTO>();

    this.products = new Array<BreadcrumbDTO>();

    this.loadCategories();
    //this.loadTreatments();
    this.loadProducts();

    this.urls = this.router.url.split('/');
    if (this.urls[0] === '') {
      this.urls.shift();
    }

    this.store.select('categories').subscribe((store) => {
      this.categories = store.breadcrumbs;
    });

    this.store.select('products').subscribe((store) => {
      this.products = store.breadcrumbs;
    });

    this.router.events.subscribe((event) => {
      if (event instanceof NavigationStart) {
        this.urls = event.url.split('/');
        if (this.urls[0] === '') {
          this.urls.shift();
        }

        this.generateBreadcrumbs();
      }
    });
  }

  private loadCategories(): void {
    this.store.dispatch(CategoriesAction.getCategoriesBreadcrumbs());
  }

  private loadTreatments(): void {
    this.store.dispatch(TreatmentsAction.getTreatments());
  }

  private loadProducts(): void {
    this.store.dispatch(ProductsAction.getProductsBreadcrumbs());
  }

  getProductId(): string {
    return this.urls[this.urls.length - 1];
  }

  getProfileFormId(): string | null {
    let urls: string[] = [];
    let id: string = '';
    const isNumeric = (string: string) => /^[+-]?\d+(\.\d+)?$/.test(string);

    urls = this.router.url.split('/');
    if (urls[0] === '') {
      urls.shift();
    }

    id = urls[urls.length - 1];

    if (isNumeric(id)) {
      return id;
    }
    return null;
  }

  back(): void {
    this.location.back();
  }

  generateBreadcrumbs(): BreadcrumbDTO[] {
    switch (this.urls[0]) {
      case 'perfil':
        return this.breadcrumbProfile();

      case 'agenda':
        return this.breadcrumbsFixed();

      case 'checkout':
        return this.breadcrumbsFixed();

      case 'area-legal':
        return this.breadcrumbsFixed();

      case 'tratamientos':
        return this.breadcrumbTreatments();

      case 'tienda':
        return this.breadcrumbProducts();

      default:
        break;
    }

    return [];
  }

  breadcrumbProfile(): BreadcrumbDTO[] {
    let breadcrumbs: BreadcrumbDTO[] = [];

    for (const url of this.urls) {
      this.getRoutesFixedProfileUser().map((breadcrumb) => {
        if (breadcrumb.url == decodeURIComponent(url)) {
          breadcrumbs.push(breadcrumb);
        }
      });
    }
    return breadcrumbs;
  }

  breadcrumbTreatments(): BreadcrumbDTO[] {
    this.urls = this.urls.filter((url) => url !== 'info');
    let breadcrumbs: BreadcrumbDTO[] = [
      {
        url: 'tratamientos',
        name: 'Tratamientos',
      },
    ];
    for (const url of this.urls) {
      this.categories.map((breadcrumb) => {
        if (breadcrumb.url == decodeURIComponent(url)) {
          breadcrumbs.push(breadcrumb);
        }
      });
    }

    return breadcrumbs;
  }

  breadcrumbProducts(): BreadcrumbDTO[] {
    this.urls = this.urls.filter((url) => url !== 'producto');

    let breadcrumbs: BreadcrumbDTO[] = [];
    for (const url of this.urls) {
      this.getRoutesFixed().map((breadcrumb) => {
        if (breadcrumb.url == decodeURIComponent(url)) {
          breadcrumbs.push(breadcrumb);
        }
      });
      this.categories.map((breadcrumb) => {
        if (breadcrumb.url == decodeURIComponent(url)) {
          breadcrumbs.push(breadcrumb);
        }
      });
      this.products.map((breadcrumb) => {
        if (breadcrumb.url == url) {
          breadcrumbs.push(breadcrumb);
        }
      });
    }

    return breadcrumbs;
  }

  breadcrumbsFixed(): BreadcrumbDTO[] {
    let breadcrumbs: BreadcrumbDTO[] = [];
    for (const url of this.urls) {
      this.getRoutesFixed().map((breadcrumb) => {
        if (breadcrumb.url == decodeURIComponent(url)) {
          breadcrumbs.push(breadcrumb);
        }
      });
    }
    return breadcrumbs;
  }

  getRoutesFixedProfileUser(): BreadcrumbDTO[] {
    return [
      {
        url: 'perfil',
        name: 'Perfil',
      },
      {
        url: 'personal',
        name: 'Datos personales',
      },
      {
        url: 'direcciones',
        name: 'Direcciones',
      },
      {
        url: 'pedidos',
        name: 'Pedidos',
      },
      {
        url: 'citas',
        name: 'Citas',
      },
      {
        url: 'tratamientos',
        name: 'Tratamientos',
      },
    ];
  }
  getRoutesFixed(): fixedRoute[] {
    return [
      {
        name: 'Tratamientos',
        url: 'tratamientos',
      },
      {
        name: 'Tienda',
        url: 'tienda',
      },
      {
        name: 'Agenda',
        url: 'agenda',
      },
      {
        name: 'Perfil',
        url: 'perfil',
      },
      {
        name: 'Administrador',
        url: 'admin',
      },
      {
        name: 'Ofertas',
        url: 'ofertas',
      },
      {
        name: 'Tendencias',
        url: 'tendencias',
      },
      {
        name: 'Realizar pedido',
        url: 'checkout',
      },
      {
        name: 'Método de envío',
        url: 'envio',
      },
      {
        name: 'Pago',
        url: 'pago',
      },
      {
        name: 'Área legal',
        url: 'area-legal',
      },
      {
        name: 'Política de privacidad',
        url: 'privacidad',
      },
      {
        name: 'Aviso legal',
        url: 'aviso-legal',
      },
      {
        name: 'Política de cookies',
        url: 'cookies',
      },
      {
        name: 'Créditos',
        url: 'creditos',
      },
    ];
  }
}
