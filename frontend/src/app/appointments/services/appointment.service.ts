import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError } from 'rxjs';
import { environment } from '../../../environments/environment.development';
import { deleteResponse } from '../../shared/models/deleteResponse.dto';
import { SharedService } from '../../shared/services/shared.service';
import { AppointmentClass } from '../models/appointment';

@Injectable({
  providedIn: 'root',
})
export class AppointmentService {
  private urlApi: string;
  private controller: string;

  constructor(private http: HttpClient, private sharedService: SharedService) {
    this.controller = 'appointment';
    this.urlApi = environment.API_URL + '/api/' + this.controller;
  }

  getAppointments(): Observable<AppointmentClass[]> {
    return this.http
      .get<AppointmentClass[]>(this.urlApi)
      .pipe(catchError(this.sharedService.handleError));
  }

  getAppointmentByUserId(userId: string): Observable<AppointmentClass[]> {
    return this.http
      .get<AppointmentClass[]>(this.urlApi + '/user/' + userId)
      .pipe(catchError(this.sharedService.handleError));
  }

  getAppointmentById(appointmentId: string): Observable<AppointmentClass> {
    return this.http
      .get<AppointmentClass>(this.urlApi + '/' + appointmentId)
      .pipe(catchError(this.sharedService.handleError));
  }

  createAppointment(
    appointment: AppointmentClass
  ): Observable<AppointmentClass> {
    return this.http
      .post<AppointmentClass>(this.urlApi, appointment)
      .pipe(catchError(this.sharedService.handleError));
  }

  updateAppointment(
    appointmentId: string,
    appointment: AppointmentClass
  ): Observable<AppointmentClass> {
    return this.http
      .put<AppointmentClass>(this.urlApi + '/' + appointmentId, appointment)
      .pipe(catchError(this.sharedService.handleError));
  }

  deleteAppointment(appointmentId: string): Observable<deleteResponse> {
    return this.http
      .delete<deleteResponse>(this.urlApi + '/' + appointmentId)
      .pipe(catchError(this.sharedService.handleError));
  }
}
