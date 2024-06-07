import { DOCUMENT } from '@angular/common';
import {
  Component,
  ElementRef,
  Inject,
  OnInit,
  ViewChild,
} from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../../../app.reducers';
import { CartClass } from '../../../carts/models/cart';
import { ProductCartClass } from '../../../carts/models/product-cart';
import { CheckoutService } from '../../services/checkout.service';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrl: './payment.component.scss',
})
export class PaymentComponent implements OnInit {
  cart: CartClass;
  addressId: string | null;
  stripeCheckout: any;

  @ViewChild('checkout') checkoutForm!: ElementRef;

  constructor(
    private checkoutService: CheckoutService,
    private store: Store<AppState>,
    @Inject(DOCUMENT) private document: Document
  ) {
    this.cart = new CartClass('', '', 0, new Array<ProductCartClass>());
    this.addressId = null;
  }

  ngOnInit(): void {
    this.stripeCheckout = this.document.getElementById('checkout');

    this.store.select('carts').subscribe((store) => {
      this.cart = store.cart;

      this.addressId = store.shipment.address;

      if (this.cart.id !== '' && this.stripeCheckout !== null) {
        this.loadStripe(this.cart, this.addressId);
      }
    });
  }

  private loadStripe(cart: CartClass, addressId: string | null): void {
    this.checkoutService.createCheckoutSession(cart, addressId);
  }
}
