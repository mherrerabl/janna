import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError } from 'rxjs';
import { environment } from '../../../environments/environment.development';
import { deleteResponse } from '../../shared/models/deleteResponse.dto';
import { SharedService } from '../../shared/services/shared.service';
import { TreatmentClass } from '../models/treatment';

@Injectable({
  providedIn: 'root',
})
export class TreatmentService {
  private urlApi: string;
  private controller: string;

  constructor(private http: HttpClient, private sharedService: SharedService) {
    this.controller = 'treatment';
    this.urlApi = environment.API_URL + '/api/' + this.controller;
  }

  getTreatments(): Observable<TreatmentClass[]> {
    return this.http
      .get<TreatmentClass[]>(this.urlApi)
      .pipe(catchError(this.sharedService.handleError));
  }

  getTreatmentByCategoryId(categoryId: string): Observable<TreatmentClass> {
    return this.http
      .get<TreatmentClass>(this.urlApi + '/category/' + categoryId)
      .pipe(catchError(this.sharedService.handleError));
  }

  getTreatmentById(id: string): Observable<TreatmentClass> {
    return this.http
      .get<TreatmentClass>(this.urlApi + id)
      .pipe(catchError(this.sharedService.handleError));
  }

  getTreatmentByUrl(paramUrl: string): Observable<TreatmentClass> {
    return this.http
      .get<TreatmentClass>(this.urlApi + '/url/' + paramUrl)
      .pipe(catchError(this.sharedService.handleError));
  }

  createTreatment(treatment: TreatmentClass): Observable<TreatmentClass> {
    return this.http
      .post<TreatmentClass>(this.urlApi, treatment)
      .pipe(catchError(this.sharedService.handleError));
  }

  updateTreatment(
    treatmentId: string,
    treatment: TreatmentClass
  ): Observable<TreatmentClass> {
    return this.http
      .put<TreatmentClass>(this.urlApi + treatmentId, treatment)
      .pipe(catchError(this.sharedService.handleError));
  }

  deleteTreatment(treatmentId: string): Observable<deleteResponse> {
    return this.http
      .delete<deleteResponse>(this.urlApi + treatmentId)
      .pipe(catchError(this.sharedService.handleError));
  }
}
