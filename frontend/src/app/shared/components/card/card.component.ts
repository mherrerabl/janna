import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../../../app.reducers';
import * as CartAction from '../../../carts/actions';
import { CartClass } from '../../../carts/models/cart';
import { ProductCartClass } from '../../../carts/models/product-cart';
import { ImageClass } from '../../../images/models/image';
import { ProductClass } from '../../../products/models/product';
import { ProductVariationClass } from '../../../products/models/product-variation';
import { ProductService } from '../../../products/services/product.service';
import { isLoading } from '../../../spinner/actions/spinner.actions';
import { TypeUser, UserClass } from '../../../users/models/user';
import { BadgeDTO } from '../../models/badge.dto';
import { PriceClass } from '../../models/price';
import { ProductDTO } from '../../models/product.dto';
import { ModalService } from '../../services/modal.service';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
})
export class CardComponent implements OnInit {
  @Input() dataCard!: ProductClass;
  @Output() emitProduct = new EventEmitter<ProductDTO>();

  cart: CartClass;
  user: UserClass;

  price: PriceClass = new PriceClass('', 0, null, null);
  priceVariationText: number = 0;
  priceVariationColor: number = 0;

  indexVariationText: number = -1;
  indexVariationColor: number = -1;

  dataVariationText!: BadgeDTO;
  dataVariationColor!: BadgeDTO;

  badgeTrend: BadgeDTO = {
    id: '',
    name: 'Trend',
    textSize: 'text-s',
    isButtonText: false,
    isButtonColor: false,
  };

  badgeNew: BadgeDTO = {
    id: '',
    name: 'Nuevo',
    textSize: 'text-s',
    isButtonText: false,
    isButtonColor: false,
  };

  badgeProm1: BadgeDTO = {
    id: '',
    name: '2a 50%',
    textSize: 'text-s',
    isButtonText: false,
    isButtonColor: false,
  };

  badgeProm2: BadgeDTO = {
    id: '',
    name: '3x2',
    textSize: 'text-s',
    isButtonText: false,
    isButtonColor: false,
  };

  constructor(
    private store: Store<AppState>,
    private productService: ProductService,
    private modalService: ModalService
  ) {
    this.cart = new CartClass('', '', 0, new Array<ProductCartClass>());
    this.user = new UserClass('', '', '', '', '', null, TypeUser['user'], '');

    this.store.select('user').subscribe((store) => {
      this.user = store.user;
    });

    this.store.select('carts').subscribe((store) => {
      this.cart = store.cart;
    });
  }

  ngOnInit(): void {}

  createBadge(variation: ProductVariationClass): BadgeDTO {
    return {
      id: variation.id,
      name: variation.name,
      textSize: variation.color === null ? 'text-s' : '',
      color: variation.color === null ? '' : variation.color,
      stock: variation.stock,
      isButtonText: variation.color === null ? true : false,
      isButtonColor: variation.color !== null ? true : false,
    };
  }

  /*
  dataSelectedVariation(variation: BadgeDTO, type: string): void {
    if (type === 'textBadge') {
      this.dataVariationText = variation;
    }

    if (type === 'colorBadge') {
      this.dataVariationColor = variation;
    }
  }

  selectedVariationText(
    i: number,
    variation: ProductVariationClass | undefined
  ): void {
    if (variation !== undefined && variation.price !== undefined) {
      this.price = variation.price;
    }

    if (this.indexVariationText === i) {
      this.indexVariationText = -1;
    } else {
      this.indexVariationText = i;
    }
  }

  selectedVariationColor(
    i: number,
    variation: ProductVariationClass | undefined
  ): void {
    if (variation !== undefined && variation.price !== undefined) {
      this.price = variation.price;
    }

    if (this.indexVariationColor === i) {
      this.indexVariationColor = -1;
    } else {
      this.indexVariationColor = i;
    }
  }
*/
  getPrice(): number {
    let priceProduct: number = this.dataCard.price?.price as number;

    if (this.dataCard.price !== undefined) {
      return this.productService.calculatePrice(
        this.dataCard.price as PriceClass,
        1
      );
    }

    return priceProduct;
  }

  compareDates(val: Date): boolean {
    let date = new Date(val);

    let days: number = 15;
    let timeNew: number = days * 86400;

    let today = new Date().getTime();

    if (date.getTime() > today - timeNew) {
      return true;
    }

    return false;
  }

  addProduct(): void {
    let image!: ImageClass;

    if (this.dataCard.images !== undefined) {
      image = this.dataCard.images[0];
    }
    let product: ProductCartClass = {
      id: '',
      product_id: this.dataCard.id,
      quantity: 1,
      cart_id: this.cart.id,
    };

    setTimeout(() => {
      this.store.dispatch(isLoading({ status: true }));
    });

    this.store.dispatch(
      CartAction.addProduct({ userId: this.user.id, product: product })
    );
  }

  openLogin(): void {
    this.modalService.openLogin();
  }
}
