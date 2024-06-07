import { Component, OnInit } from '@angular/core';
import { faMinus, faPlus } from '@fortawesome/free-solid-svg-icons';
import { faXmark } from '@fortawesome/free-solid-svg-icons/faXmark';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AppState } from '../../../app.reducers';
import * as CartAction from '../../../carts/actions';
import { ProductService } from '../../../products/services/product.service';
import { TypeUser, UserClass } from '../../../users/models/user';
import { ProductDTO } from '../../models/product.dto';
import { ModalService } from '../../services/modal.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
})
export class CartComponent implements OnInit {
  dataProducts: ProductDTO[];
  user: UserClass;
  iconClose = faXmark;
  iconPlus = faPlus;
  iconLess = faMinus;

  showCart$!: Observable<'open' | 'close'>;

  constructor(
    private modalService: ModalService,
    private store: Store<AppState>,
    private productService: ProductService
  ) {
    this.dataProducts = [];

    this.user = new UserClass('', '', '', '', '', null, TypeUser['user'], '');

    this.store.select('user').subscribe((store) => {
      this.user = store.user;
    });

    this.store.select('carts').subscribe((store) => {
      this.dataProducts = [];

      for (const product of store.cart.products_cart) {
        if (product.product !== undefined) {
          this.dataProducts = [
            ...this.dataProducts,
            {
              id: product.product.id,
              variation_id: null,
              name: product.product.name,
              price: product.product.price,
              image: product.product.image,
              quantity: product.quantity,
              stock: product.product.stock,
            },
          ];
        }
      }

      this.getTotalCart();
    });
  }

  ngOnInit(): void {
    this.showCart$ = this.modalService.watchCart();
  }

  getTotalCart(): number {
    let total: number = 0;
    if (this.dataProducts !== null && this.dataProducts.length > 0) {
      for (const product of this.dataProducts) {
        total +=
          this.productService.calculatePrice(product.price, product.quantity) *
          product.quantity;
      }
    }

    return total;
  }

  removeProduct(productId: string): void {
    this.store.dispatch(
      CartAction.removeProduct({
        userId: this.user.id,
        productId: productId,
      })
    );
  }

  changeQuantity(counter: number, index: number): void {
    if (this.dataProducts[index].quantity < counter) {
      this.addQuantity(this.dataProducts[index].id);
    } else {
      this.removeQuantity(this.dataProducts[index].id);
    }
  }

  removeQuantity(productId: string): void {
    this.store.dispatch(
      CartAction.removeQuantity({
        userId: this.user.id,
        productId: productId,
      })
    );
  }

  addQuantity(productId: string): void {
    this.store.dispatch(
      CartAction.addQuantity({
        userId: this.user.id,
        productId: productId,
      })
    );
  }

  closeCart(): void {
    this.modalService.closeCart();
  }
}
