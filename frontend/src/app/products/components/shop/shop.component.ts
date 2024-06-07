import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../../../app.reducers';
import { isLoading } from '../../../spinner/actions/spinner.actions';
import * as ProductsAction from '../../actions';
import { ProductClass } from '../../models/product';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrl: './shop.component.scss',
})
export class ShopComponent implements OnInit {
  newProducts: ProductClass[];

  constructor(private store: Store<AppState>) {
    this.newProducts = new Array<ProductClass>();

    this.store.select('products').subscribe((store) => {
      this.newProducts = store.products;
    });
  }

  ngOnInit(): void {
    setTimeout(() => {
      this.store.dispatch(isLoading({ status: true }));
    });
    setTimeout(() => {
      this.loadNewProducts(5);
    });
  }

  loadNewProducts(quantity: number): void {
    this.store.dispatch(ProductsAction.getNewProducts({ quantity: quantity }));
  }
}
