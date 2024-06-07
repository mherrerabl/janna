import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AppState } from './app.reducers';
import * as CartAction from './carts/actions';
import { CartClass } from './carts/models/cart';
import { ProductCartClass } from './carts/models/product-cart';
import { LocalStorageService } from './shared/services/local-storage.service';
import { ModalService } from './shared/services/modal.service';
import { isLoading } from './spinner/actions/spinner.actions';
import { getLoading } from './spinner/selector/spinner.selector';
import * as UserAction from './users/actions';
import { UserDTO } from './users/models/user.dto';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'Janna';
  showMenu: boolean;
  showCart: boolean;
  showLogin: boolean;
  showRegister: boolean;

  showLoading!: Observable<boolean>;

  user!: UserDTO;

  cart: CartClass;

  constructor(
    private store: Store<AppState>,
    private localService: LocalStorageService,
    private modalService: ModalService
  ) {
    this.showMenu = false;
    this.showCart = true;
    this.showLogin = false;
    this.showRegister = false;

    this.cart = new CartClass('', '', 0, new Array<ProductCartClass>());
    this.user = this.localService.getUser();

    if (this.user && this.user.token !== undefined && this.user.token !== '') {
      this.loadUser(this.user);
    }

    this.storeUser();

    this.storeCarts();
  }

  storeUser(): void {
    this.store.select('user').subscribe((store) => {
      if (
        store.user.id !== '' &&
        store.user.id !== undefined &&
        store.user.id !== null
      ) {
        setTimeout(() => {
          this.loadCart(store.user.id);
        });
      } else {
        this.resetCart();
      }
    });
  }
  storeCarts(): void {
    this.store.select('carts').subscribe((store) => {
      if (store.cart.id !== '') {
        if (store.cart.id !== this.cart.id) {
          setTimeout(() => {
            this.openCart();
          });

          setTimeout(() => {
            this.closeCart();
            this.cart = store.cart;
          }, 1000);
        }
      }
    });
  }

  loadUser(user: UserDTO): void {
    setTimeout(() => {
      this.showLoading = this.store.select(getLoading);
    });

    this.store.dispatch(UserAction.getUserLogin({ user: user }));
  }

  loadCart(userId: string): void {
    this.store.dispatch(isLoading({ status: true }));

    this.store.dispatch(CartAction.getCartByUserId({ userId: userId }));
  }

  resetCart(): void {
    this.store.dispatch(isLoading({ status: true }));
    this.store.dispatch(CartAction.resetState());
  }

  openCart(): void {
    this.modalService.openCart();
  }

  closeCart(): void {
    this.modalService.closeCart();
  }
}
