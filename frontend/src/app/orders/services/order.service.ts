import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError } from 'rxjs';
import { environment } from '../../../environments/environment.development';
import { deleteResponse } from '../../shared/models/deleteResponse.dto';
import { SharedService } from '../../shared/services/shared.service';
import { OrderClass } from '../models/order';

@Injectable({
  providedIn: 'root',
})
export class OrderService {
  private urlApi: string;
  private controller: string;

  constructor(private http: HttpClient, private sharedService: SharedService) {
    this.controller = 'order';
    this.urlApi = environment.API_URL + '/api/' + this.controller;
  }

  getOrders(): Observable<OrderClass[]> {
    return this.http
      .get<OrderClass[]>(this.urlApi)
      .pipe(catchError(this.sharedService.handleError));
  }

  getOrderByUserId(userId: string): Observable<OrderClass[]> {
    return this.http
      .get<OrderClass[]>(this.urlApi + '/user/' + userId)
      .pipe(catchError(this.sharedService.handleError));
  }

  createOrder(order: OrderClass): Observable<OrderClass> {
    return this.http
      .post<OrderClass>(this.urlApi, order)
      .pipe(catchError(this.sharedService.handleError));
  }

  updateOrder(orderId: string, order: OrderClass): Observable<OrderClass> {
    return this.http
      .put<OrderClass>(this.urlApi + orderId, order)
      .pipe(catchError(this.sharedService.handleError));
  }

  updateOrderState(session_id: string, state: string): Observable<OrderClass> {
    const order = {
      state: state,
    };
    return this.http
      .put<OrderClass>(this.urlApi + '/session/' + session_id, order)
      .pipe(catchError(this.sharedService.handleError));
  }

  deleteOrder(orderId: string): Observable<deleteResponse> {
    return this.http
      .delete<deleteResponse>(this.urlApi + orderId)
      .pipe(catchError(this.sharedService.handleError));
  }
}
