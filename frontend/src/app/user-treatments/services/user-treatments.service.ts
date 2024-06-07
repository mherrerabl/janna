import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError } from 'rxjs';
import { environment } from '../../../environments/environment.development';
import { deleteResponse } from '../../shared/models/deleteResponse.dto';
import { SharedService } from '../../shared/services/shared.service';
import { UserTreatmentClass } from '../models/user-treatments';

@Injectable({
  providedIn: 'root',
})
export class UserTreatmentService {
  private urlApi: string;
  private controller: string;

  constructor(private http: HttpClient, private sharedService: SharedService) {
    this.controller = 'user_treatment';
    this.urlApi = environment.API_URL + '/api/' + this.controller;
  }

  getUserTreatments(): Observable<UserTreatmentClass[]> {
    return this.http
      .get<UserTreatmentClass[]>(this.urlApi)
      .pipe(catchError(this.sharedService.handleError));
  }

  getUserTreatmentByUserId(userId: string): Observable<UserTreatmentClass[]> {
    return this.http
      .get<UserTreatmentClass[]>(this.urlApi + '/user/' + userId)
      .pipe(catchError(this.sharedService.handleError));
  }

  createUserTreatment(
    userTreatment: UserTreatmentClass
  ): Observable<UserTreatmentClass> {
    return this.http
      .post<UserTreatmentClass>(this.urlApi, userTreatment)
      .pipe(catchError(this.sharedService.handleError));
  }

  updateUserTreatment(
    userTreatmentId: string,
    userTreatment: UserTreatmentClass
  ): Observable<UserTreatmentClass> {
    return this.http
      .put<UserTreatmentClass>(this.urlApi + userTreatmentId, userTreatment)
      .pipe(catchError(this.sharedService.handleError));
  }

  deleteUserTreatment(userTreatmentId: string): Observable<deleteResponse> {
    return this.http
      .delete<deleteResponse>(this.urlApi + userTreatmentId)
      .pipe(catchError(this.sharedService.handleError));
  }
}
