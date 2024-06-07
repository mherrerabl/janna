import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { AppState } from '../../../app.reducers';
import * as CartAction from '../../../carts/actions';
import * as OrderAction from '../../../orders/actions';
import { isLoading } from '../../../spinner/actions/spinner.actions';

@Component({
  selector: 'app-success',
  templateUrl: './success.component.html',
  styleUrl: './success.component.scss',
})
export class SuccessComponent implements OnInit {
  orderId: string;
  sessionId: string;
  cartId: string;

  constructor(
    private store: Store<AppState>,
    private activatedRoute: ActivatedRoute
  ) {
    this.orderId = '';
    this.cartId = '';
    this.sessionId = this.activatedRoute.snapshot.paramMap.get(
      'sessionId'
    ) as string;

    this.store.select('carts').subscribe((store) => {
      this.cartId = store.cart.id;
    });
    this.store.select('order').subscribe((store) => {
      this.orderId = store.order.id;

      if (store.order.state == 'Pago realizado') {
        this.deleteProductsCart(this.cartId);
      }
    });
  }

  ngOnInit(): void {
    this.loadOrder(this.sessionId);
  }

  private loadOrder(sessionId: string): void {
    setTimeout(() => {
      this.store.dispatch(isLoading({ status: true }));
    });
    this.store.dispatch(
      OrderAction.updateOrderState({
        sessionId: sessionId,
        state: 'Pago realizado',
      })
    );
  }

  private deleteProductsCart(cartId: string): void {
    setTimeout(() => {
      this.store.dispatch(isLoading({ status: true }));
    });
    this.store.dispatch(
      CartAction.deleteProductsCart({
        cartId: cartId,
      })
    );
  }
}
