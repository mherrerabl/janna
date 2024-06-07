import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError } from 'rxjs';
import { environment } from '../../../environments/environment.development';
import { SharedService } from '../../shared/services/shared.service';
import { MailClass } from '../models/mail.js';

@Injectable({
  providedIn: 'root',
})
export class MailService {
  private urlApi: string;
  private controller: string;

  constructor(private http: HttpClient, private sharedService: SharedService) {
    this.controller = 'mail';
    this.urlApi = environment.API_URL + '/api/' + this.controller;
  }

  sendEmail(mail: MailClass): Observable<MailClass> {
    return this.http
      .post<MailClass>(this.urlApi, mail)
      .pipe(catchError(this.sharedService.handleError));
  }
}
