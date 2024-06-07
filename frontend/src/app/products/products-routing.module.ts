import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductDetailComponent } from './components/product-detail/product-detail.component';
import { ProductsCategoriesComponent } from './components/products-categories/products-categories.component';
import { ProductsListComponent } from './components/products-list/products-list.component';
import { ShopComponent } from './components/shop/shop.component';

const routes: Routes = [
  {
    path: '',
    component: ShopComponent,
  },
  {
    path: 'ofertas',
    component: ProductsListComponent,
  },
  {
    path: 'tendencias',
    component: ProductsListComponent,
  },
  {
    path: 'buscador/:product',
    component: ProductsListComponent,
  },
  {
    path: 'productos/:products',
    component: ProductsListComponent,
  },
  {
    path: 'productos/:products/producto/:id',
    component: ProductDetailComponent,
  },
  {
    path: 'producto/:id',
    component: ProductDetailComponent,
  },
  {
    path: ':category',
    component: ProductsCategoriesComponent,
  },

  {
    path: ':category/producto/:id',
    component: ProductDetailComponent,
  },
  {
    path: ':category/productos/:products',
    component: ProductsListComponent,
  },
  {
    path: ':category/productos/:products/producto/:id',
    component: ProductDetailComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProductsRoutingModule {}
