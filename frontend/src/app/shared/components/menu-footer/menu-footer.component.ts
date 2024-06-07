import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AppState } from '../../../app.reducers';
import { ModalService } from '../../services/modal.service';

@Component({
  selector: 'app-menu-footer',
  templateUrl: './menu-footer.component.html',
})
export class MenuFooterComponent {
  isLogin: boolean = false;

  showRegister$!: Observable<'open' | 'close'>;
  showLogin$!: Observable<'open' | 'close'>;
  showCart$!: Observable<'open' | 'close'>;

  countProducts: number;

  constructor(
    private modalService: ModalService,
    private store: Store<AppState>
  ) {
    this.showRegister$ = this.modalService.watchLogin();
    this.showLogin$ = this.modalService.watchRegister();
    this.showCart$ = this.modalService.watchCart();

    this.countProducts = 0;

    this.store.select('user').subscribe((store) => {
      if (store.user.token !== '' && store.user.token !== undefined) {
        this.isLogin = true;
      } else {
        this.isLogin = false;
      }
    });

    this.store.select('carts').subscribe((store) => {
      if (store.cart.products_cart) {
        this.countProducts = store.cart.products_cart.length;
      }
    });
  }

  openCart(): void {
    this.modalService.openCart();
  }

  openLogin(): void {
    this.modalService.openLogin();
  }

  openRegister(): void {
    this.modalService.openRegister();
  }
}
