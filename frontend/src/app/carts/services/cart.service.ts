import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError } from 'rxjs';
import { environment } from '../../../environments/environment.development';
import { deleteResponse } from '../../shared/models/deleteResponse.dto';
import { SharedService } from '../../shared/services/shared.service';
import { CartClass } from '../models/cart';
import { ProductCartClass } from '../models/product-cart';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private urlApi: string;
  private controller: string;

  constructor(private http: HttpClient, private sharedService: SharedService) {
    this.controller = 'cart';
    this.urlApi = environment.API_URL + '/api/' + this.controller;
  }

  getCarts(): Observable<CartClass[]> {
    return this.http
      .get<CartClass[]>(this.urlApi)
      .pipe(catchError(this.sharedService.handleError));
  }

  getCartById(cartId: string): Observable<CartClass> {
    return this.http
      .get<CartClass>(this.urlApi + cartId)
      .pipe(catchError(this.sharedService.handleError));
  }

  getCartByUserId(userId: string): Observable<CartClass> {
    return this.http
      .get<CartClass>(this.urlApi + '/user/' + userId)
      .pipe(catchError(this.sharedService.handleError));
  }

  createCart(cart: CartClass): Observable<CartClass> {
    return this.http
      .post<CartClass>(this.urlApi, cart)
      .pipe(catchError(this.sharedService.handleError));
  }

  updateCart(cartId: string, cart: CartClass): Observable<CartClass> {
    return this.http
      .put<CartClass>(this.urlApi + cartId, cart)
      .pipe(catchError(this.sharedService.handleError));
  }

  addProduct(userId: string, product: ProductCartClass): Observable<CartClass> {
    return this.http
      .post<CartClass>(this.urlApi + '/user/add/' + userId, product)
      .pipe(catchError(this.sharedService.handleError));
  }

  removeProduct(userId: string, productId: string): Observable<CartClass> {
    return this.http
      .put<CartClass>(this.urlApi + '/user/remove/' + userId, productId)
      .pipe(catchError(this.sharedService.handleError));
  }

  addQuantity(userId: string, productCartId: string): Observable<CartClass> {
    return this.http
      .put<CartClass>(
        this.urlApi + '/user/product/add/' + userId,
        productCartId
      )
      .pipe(catchError(this.sharedService.handleError));
  }

  removeQuantity(userId: string, productCartId: string): Observable<CartClass> {
    return this.http
      .put<CartClass>(
        this.urlApi + '/user/product/remove/' + userId,
        productCartId
      )
      .pipe(catchError(this.sharedService.handleError));
  }

  deleteCart(cartId: string): Observable<deleteResponse> {
    return this.http
      .delete<deleteResponse>(this.urlApi + cartId)
      .pipe(catchError(this.sharedService.handleError));
  }

  removeProductsCart(cartId: string): Observable<CartClass> {
    return this.http
      .delete<CartClass>(this.urlApi + '/products/' + cartId)
      .pipe(catchError(this.sharedService.handleError));
  }
}
