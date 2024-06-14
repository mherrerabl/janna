import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { faXmark } from '@fortawesome/free-solid-svg-icons/faXmark';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AppState } from '../../../app.reducers';
import * as UserAction from '../../../users/actions';
import { LocalStorageService } from '../../services/local-storage.service';
import { ModalService } from '../../services/modal.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
})
export class MenuComponent implements OnInit {
  isLogin: boolean = false;
  iconClose = faXmark;

  showMenu$!: Observable<'open' | 'close'>;
  showRegister$!: Observable<'open' | 'close'>;
  showLogin$!: Observable<'open' | 'close'>;
  showCart$!: Observable<'open' | 'close'>;

  countProducts = 0;

  constructor(
    private modalService: ModalService,
    private store: Store<AppState>,
    private localService: LocalStorageService,
    private router: Router
  ) {
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

  ngOnInit(): void {
    this.showMenu$ = this.modalService.watchMenu();
    this.showRegister$ = this.modalService.watchLogin();
    this.showLogin$ = this.modalService.watchRegister();
    this.showCart$ = this.modalService.watchCart();
  }

  closeMenu(): void {
    this.modalService.closeMenu();
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

  logout(): void {
    this.localService.removeUser();

    this.store.dispatch(UserAction.logout());

    this.closeMenu();

    this.router.navigate(['']);
  }
}
