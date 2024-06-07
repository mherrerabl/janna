import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError } from 'rxjs';
import { environment } from '../../../environments/environment.development';
import { deleteResponse } from '../../shared/models/deleteResponse.dto';
import { SharedService } from '../../shared/services/shared.service';
import { UserClass } from '../models/user';
import { UserDTO } from '../models/user.dto';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private urlApi: string;
  private controller: string;

  constructor(private http: HttpClient, private sharedService: SharedService) {
    this.controller = 'user';
    this.urlApi = environment.API_URL + '/api/' + this.controller;
  }

  getUsers(): Observable<UserClass[]> {
    return this.http
      .get<UserClass[]>(this.urlApi)
      .pipe(catchError(this.sharedService.handleError));
  }

  getUserById(userId: string): Observable<UserClass> {
    return this.http
      .get<UserClass>(this.urlApi + userId)
      .pipe(catchError(this.sharedService.handleError));
  }

  getUserLogin(user: UserDTO): Observable<UserClass> {
    return this.http
      .post<UserClass>(this.urlApi + '/login', user)
      .pipe(catchError(this.sharedService.handleError));
  }

  createUser(user: UserClass): Observable<UserClass> {
    return this.http
      .post<UserClass>(this.urlApi, user)
      .pipe(catchError(this.sharedService.handleError));
  }

  updateUser(userId: string, user: UserClass): Observable<UserClass> {
    return this.http
      .put<UserClass>(this.urlApi + userId, user)
      .pipe(catchError(this.sharedService.handleError));
  }

  deleteUser(userId: string): Observable<deleteResponse> {
    return this.http
      .delete<deleteResponse>(this.urlApi + userId)
      .pipe(catchError(this.sharedService.handleError));
  }
}
