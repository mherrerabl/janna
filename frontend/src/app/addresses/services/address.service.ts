import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError } from 'rxjs';
import { environment } from '../../../environments/environment.development';
import { deleteResponse } from '../../shared/models/deleteResponse.dto';
import { SharedService } from '../../shared/services/shared.service';
import { AddressClass } from '../models/address';

@Injectable({
  providedIn: 'root',
})
export class AddressService {
  private urlApi: string;
  private controller: string;

  constructor(private http: HttpClient, private sharedService: SharedService) {
    this.controller = 'address';
    this.urlApi = environment.API_URL + '/api/' + this.controller;
  }

  getAddresses(): Observable<AddressClass[]> {
    return this.http
      .get<AddressClass[]>(this.urlApi)
      .pipe(catchError(this.sharedService.handleError));
  }

  getAddressById(addressId: string): Observable<AddressClass> {
    return this.http
      .get<AddressClass>(this.urlApi + addressId)
      .pipe(catchError(this.sharedService.handleError));
  }

  getAddressByUserId(userId: string): Observable<AddressClass[]> {
    return this.http
      .get<AddressClass[]>(this.urlApi + '/user/' + userId)
      .pipe(catchError(this.sharedService.handleError));
  }

  createAddress(address: AddressClass): Observable<AddressClass> {
    return this.http
      .post<AddressClass>(this.urlApi, address)
      .pipe(catchError(this.sharedService.handleError));
  }

  updateAddress(
    addressId: string,
    address: AddressClass
  ): Observable<AddressClass> {
    return this.http
      .put<AddressClass>(this.urlApi + addressId, address)
      .pipe(catchError(this.sharedService.handleError));
  }

  deleteAddress(addressId: string): Observable<deleteResponse> {
    return this.http
      .delete<deleteResponse>(this.urlApi + addressId)
      .pipe(catchError(this.sharedService.handleError));
  }
}
