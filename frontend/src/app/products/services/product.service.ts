import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError } from 'rxjs';
import { environment } from '../../../environments/environment.development';
import { deleteResponse } from '../../shared/models/deleteResponse.dto';
import { Offer } from '../../shared/models/price';
import { PriceDTO } from '../../shared/models/price.dto';
import { SharedService } from '../../shared/services/shared.service';
import { ProductClass } from '../models/product';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private urlApi: string;
  private controller: string;

  constructor(private http: HttpClient, private sharedService: SharedService) {
    this.controller = 'product';
    this.urlApi = environment.API_URL + '/api/' + this.controller;
  }

  getProducts(): Observable<ProductClass[]> {
    return this.http
      .get<ProductClass[]>(this.urlApi)
      .pipe(catchError(this.sharedService.handleError));
  }

  getProductsForSale(): Observable<ProductClass[]> {
    return this.http
      .get<ProductClass[]>(this.urlApi + '/forsale')
      .pipe(catchError(this.sharedService.handleError));
  }

  getProductsByOffer(): Observable<ProductClass[]> {
    return this.http
      .get<ProductClass[]>(this.urlApi + '/offer')
      .pipe(catchError(this.sharedService.handleError));
  }
  getProductsByTrend(): Observable<ProductClass[]> {
    return this.http
      .get<ProductClass[]>(this.urlApi + '/trend')
      .pipe(catchError(this.sharedService.handleError));
  }
  getProductsByTreatmentId(treatmentId: string): Observable<ProductClass[]> {
    return this.http
      .get<ProductClass[]>(this.urlApi + '/treatment/' + treatmentId)
      .pipe(catchError(this.sharedService.handleError));
  }

  getProductsRelated(productId: string): Observable<ProductClass[]> {
    return this.http
      .get<ProductClass[]>(this.urlApi + '/related/' + productId)
      .pipe(catchError(this.sharedService.handleError));
  }

  getProductsByCategoryUrl(categoryUrl: string): Observable<ProductClass[]> {
    return this.http
      .get<ProductClass[]>(this.urlApi + '/category/url/' + categoryUrl)
      .pipe(catchError(this.sharedService.handleError));
  }

  getNewProducts(quantity: number): Observable<ProductClass[]> {
    return this.http
      .get<ProductClass[]>(this.urlApi + '/new/' + quantity)
      .pipe(catchError(this.sharedService.handleError));
  }

  getProductById(productId: string): Observable<ProductClass> {
    return this.http
      .get<ProductClass>(this.urlApi + '/' + productId)
      .pipe(catchError(this.sharedService.handleError));
  }

  getProductByIdForSale(productId: string): Observable<ProductClass> {
    return this.http
      .get<ProductClass>(this.urlApi + '/forsale/' + productId)
      .pipe(catchError(this.sharedService.handleError));
  }

  createProduct(product: ProductClass): Observable<ProductClass> {
    return this.http
      .post<ProductClass>(this.urlApi, product)
      .pipe(catchError(this.sharedService.handleError));
  }

  updateProduct(
    productId: string,
    product: ProductClass
  ): Observable<ProductClass> {
    return this.http
      .put<ProductClass>(this.urlApi + productId, product)
      .pipe(catchError(this.sharedService.handleError));
  }

  deleteProduct(productId: string): Observable<deleteResponse> {
    return this.http
      .delete<deleteResponse>(this.urlApi + productId)
      .pipe(catchError(this.sharedService.handleError));
  }

  calculatePrice(productPrice: PriceDTO, quantity: number): number {
    let price: number = 0;

    let basePrice: number = productPrice.price as number;
    let discount: number | null = productPrice.discount;
    let offer: Offer | null = productPrice.offer;

    price = basePrice;

    if (discount !== null) {
      price = price * (discount / 100);
    }

    price = this.calculatePriceOffer(price, offer, quantity);

    return price;
  }

  calculatePriceOffer(
    price: number,
    offer: Offer | null,
    quantity: number
  ): number {
    if (offer == '2n 50%' && quantity > 2) {
      if (quantity % 2 == 0) {
        price = price * 0.75;
      } else {
        price = price * 0.83333;
      }
    } else if (offer == '3x2' && quantity > 3) {
      if (quantity % 3 == 0) {
        price = price * 0.66666;
      } else if (quantity % 3 == 1) {
        price = price * 0.75;
      } else if (quantity % 3 == 2) {
        price = price * 0.8;
      }
    }
    return price;
  }
}
