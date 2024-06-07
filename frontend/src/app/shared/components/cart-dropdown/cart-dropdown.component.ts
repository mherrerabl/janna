import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';
import { Component } from '@angular/core';
import { faChevronDown } from '@fortawesome/free-solid-svg-icons/faChevronDown';
import { faChevronUp } from '@fortawesome/free-solid-svg-icons/faChevronUp';
import { Store } from '@ngrx/store';
import { AppState } from '../../../app.reducers';
import { ImageClass } from '../../../images/models/image';
import { ProductService } from '../../../products/services/product.service';
import { PriceClass } from '../../models/price';
import { ProductDTO } from '../../models/product.dto';
import { ShipmentDTO } from '../../models/shipment.dto';

@Component({
  selector: 'app-cart-dropdown',
  templateUrl: './cart-dropdown.component.html',
  animations: [
    trigger('detailExpand', [
      state('collapsed,void', style({ height: '0px', minHeight: '0' })),
      state('expanded', style({ height: '*' })),
      transition(
        'expanded <=> collapsed',
        animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')
      ),
    ]),
  ],
})
export class CartDropdownComponent {
  shipment: ShipmentDTO;
  dataProducts: ProductDTO[];
  dropdownExpanded: boolean = false;
  iconArrowUp = faChevronUp;
  iconArrowDown = faChevronDown;

  constructor(
    private store: Store<AppState>,
    private productService: ProductService
  ) {
    this.dataProducts = [];

    this.shipment = {
      method: '',
      address: null,
    };
    this.store.select('carts').subscribe((store) => {
      this.dataProducts = [];
      store.cart.products_cart.map((product) => {
        this.dataProducts = [
          ...this.dataProducts,
          {
            id: product.id,
            variation_id: null,
            name: product.product?.name as string,
            price: product.product?.price as PriceClass,
            image: product.product?.image as ImageClass,
            quantity: product.quantity,
            stock: product.product?.stock as number,
          },
        ];
      });
      this.shipment = store.shipment;
    });
  }

  getSubtotal(): number {
    let subtotal: number = 0;

    if (this.dataProducts !== undefined && this.dataProducts.length > 0) {
      for (const product of this.dataProducts) {
        subtotal +=
          this.productService.calculatePrice(product.price, product.quantity) *
          product.quantity;
      }
    }

    return subtotal;
  }

  getTotal(): number {
    let shippingCosts: number = 4.95;
    let subtotal: number = this.getSubtotal();

    if (
      (subtotal > 50 && this.shipment.method == 'shipment') ||
      this.shipment.method == 'shop'
    ) {
      return subtotal;
    }

    return subtotal + shippingCosts;
  }

  getTaxShipment(): string {
    if (
      (this.getSubtotal() > 50 && this.shipment.method == 'shipment') ||
      this.shipment.method == 'shop'
    ) {
      return 'Gratis';
    }

    return '4,95 €';
  }
}
