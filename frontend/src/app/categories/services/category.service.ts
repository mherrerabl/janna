import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError } from 'rxjs';
import { environment } from '../../../environments/environment.development';
import { BreadcrumbDTO } from '../../shared/models/breadcrumb.dto';
import { deleteResponse } from '../../shared/models/deleteResponse.dto';
import { SharedService } from '../../shared/services/shared.service';
import { CategoryClass } from '../models/category';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  private urlApi: string;
  private controller: string;

  constructor(private http: HttpClient, private sharedService: SharedService) {
    this.controller = 'category';
    this.urlApi = environment.API_URL + '/api/' + this.controller;
  }

  getCategories(): Observable<CategoryClass[]> {
    return this.http
      .get<CategoryClass[]>(this.urlApi)
      .pipe(catchError(this.sharedService.handleError));
  }

  getCategoryById(categoryId: string): Observable<CategoryClass> {
    return this.http
      .get<CategoryClass>(this.urlApi + categoryId)
      .pipe(catchError(this.sharedService.handleError));
  }

  getCategoriesByDepartment(department: string): Observable<CategoryClass[]> {
    return this.http
      .get<CategoryClass[]>(this.urlApi + '/department/' + department)
      .pipe(catchError(this.sharedService.handleError));
  }

  getCategoriesByUrl(paramUrl: string): Observable<CategoryClass[]> {
    return this.http
      .get<CategoryClass[]>(this.urlApi + '/categories/' + paramUrl)
      .pipe(catchError(this.sharedService.handleError));
  }

  getCategoryByUrl(paramUrl: string): Observable<CategoryClass> {
    return this.http
      .get<CategoryClass>(this.urlApi + '/category/' + paramUrl)
      .pipe(catchError(this.sharedService.handleError));
  }

  getCategoryNamebyUrl(paramUrl: string): Observable<BreadcrumbDTO[]> {
    return this.http
      .get<BreadcrumbDTO[]>(this.urlApi + '/name/' + paramUrl)
      .pipe(catchError(this.sharedService.handleError));
  }

  createCategory(category: CategoryClass): Observable<CategoryClass> {
    return this.http
      .post<CategoryClass>(this.urlApi, category)
      .pipe(catchError(this.sharedService.handleError));
  }

  updateCategory(
    categoryId: string,
    category: CategoryClass
  ): Observable<CategoryClass> {
    return this.http
      .put<CategoryClass>(this.urlApi + categoryId, category)
      .pipe(catchError(this.sharedService.handleError));
  }

  deleteCategory(categoryId: string): Observable<deleteResponse> {
    return this.http
      .delete<deleteResponse>(this.urlApi + categoryId)
      .pipe(catchError(this.sharedService.handleError));
  }
}
