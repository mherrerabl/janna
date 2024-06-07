import { isPlatformBrowser } from '@angular/common';
import {
  Component,
  HostListener,
  Inject,
  OnInit,
  PLATFORM_ID,
} from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AppState } from '../../../app.reducers';
import { isLoading } from '../../../spinner/actions/spinner.actions';
import * as UserAction from '../../../users/actions';
import { InputDTO } from '../../models/input.dto';
import { LocalStorageService } from '../../services/local-storage.service';
import { ModalService } from '../../services/modal.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent implements OnInit {
  isLogin: boolean = false;

  innerWidth!: number;

  iconBars = faBars;

  countProducts = 0;

  showSearcher: boolean = false;

  search: FormControl;

  input: InputDTO;
  inputPlaceholder: string = '';

  showMenu$!: Observable<'open' | 'close'>;
  showRegister$!: Observable<'open' | 'close'>;
  showLogin$!: Observable<'open' | 'close'>;
  showCart$!: Observable<'open' | 'close'>;

  constructor(
    private router: Router,
    private modalService: ModalService,
    private store: Store<AppState>,

    private localService: LocalStorageService,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {
    this.search = new FormControl('');
    if (this.router.url) {
      this.inputPlaceholder = 'Busca un producto';
    }
    this.input = this.getDataInput();

    this.store.select('user').subscribe((store) => {
      if (store.user.token !== '' && store.user.token !== undefined) {
        this.isLogin = true;
      } else {
        this.isLogin = false;
      }
    });

    this.storeCart();
  }

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.innerWidth = window.innerWidth;
    }

    this.showMenu$ = this.modalService.watchMenu();
    this.showRegister$ = this.modalService.watchLogin();
    this.showLogin$ = this.modalService.watchRegister();
    this.showCart$ = this.modalService.watchCart();
  }

  @HostListener('window:resize', ['$event'])
  onResize() {
    this.innerWidth = window.innerWidth;
  }

  private storeCart(): void {
    this.store.select('carts').subscribe((store) => {
      if (store.cart.products_cart) {
        this.countProducts = store.cart.products_cart.length;
      }
    });
  }

  keyPressed(value: string): void {
    //this.store.dispatch(isLoading({ status: true }));
  }

  private getDataInput(): InputDTO {
    return {
      id: 'searcherHeader',
      label: 'Buscador',
      placeholder: this.inputPlaceholder,
      type: 'search',
      formControl: this.search,
      required: false,
      iconLeft: 'search',
    };
  }

  openMenu(): void {
    this.modalService.openMenu();
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
    this.store.dispatch(isLoading({ status: true }));

    this.router.navigate(['']);
  }
}
