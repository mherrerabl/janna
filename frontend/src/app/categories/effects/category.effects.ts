import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { catchError, exhaustMap, finalize, map, of } from 'rxjs';
import { BreadcrumbDTO } from '../../shared/models/breadcrumb.dto';
import { SharedService } from '../../shared/services/shared.service';
import { isLoading } from '../../spinner/actions/spinner.actions';
import { CategoryService } from '../services/category.service';
import * as CategoryActions from './../actions';

@Injectable()
export class CategoryEffects {
  private responseOK: boolean;
  private errorResponse: any;

  constructor(
    private actions$: Actions,
    private categoryService: CategoryService,
    private sharedService: SharedService,
    private store: Store
  ) {
    this.responseOK = false;
  }

  getCategories$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CategoryActions.getCategories),
      exhaustMap(() =>
        this.categoryService.getCategories().pipe(
          map((categories) => {
            this.store.dispatch(isLoading({ status: false }));
            return CategoryActions.getCategoriesSuccess({
              categories: categories,
            });
          }),
          catchError((error) => {
            return of(CategoryActions.getCategoriesFailure({ payload: error }));
          })
        )
      )
    )
  );
  getCategoriesFailure$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(CategoryActions.getCategoriesFailure),
        map((error) => {
          this.store.dispatch(isLoading({ status: false }));
          this.responseOK = false;
          this.errorResponse = error.payload.error;
          this.sharedService.errorLog(error.payload.error);
        })
      ),
    { dispatch: false }
  );

  getCategoryById$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CategoryActions.getCategoryById),
      exhaustMap(({ categoryId }) =>
        this.categoryService.getCategoryById(categoryId).pipe(
          map((category) => {
            this.store.dispatch(isLoading({ status: false }));
            return CategoryActions.getCategoryByIdSuccess({
              category: category,
            });
          }),
          catchError((error) => {
            return of(
              CategoryActions.getCategoryByIdFailure({ payload: error })
            );
          })
        )
      )
    )
  );

  getCategoryByIdFailure$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(CategoryActions.getCategoryByIdFailure),
        map((error) => {
          this.store.dispatch(isLoading({ status: false }));
          this.errorResponse = error.payload.error;
          this.sharedService.errorLog(error.payload.error);
        })
      ),
    { dispatch: false }
  );

  getCategoriesByDepartment$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CategoryActions.getCategoriesByDepartment),
      exhaustMap(({ department }) =>
        this.categoryService.getCategoriesByDepartment(department).pipe(
          map((categories) => {
            this.store.dispatch(isLoading({ status: false }));
            return CategoryActions.getCategoriesByDepartmentSuccess({
              categories: categories,
            });
          }),
          catchError((error) => {
            return of(
              CategoryActions.getCategoriesByDepartmentFailure({
                payload: error,
              })
            );
          })
        )
      )
    )
  );

  getCategoriesByDepartmentFailure$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(CategoryActions.getCategoriesByDepartmentFailure),
        map((error) => {
          this.store.dispatch(isLoading({ status: false }));
          this.errorResponse = error.payload.error;
          this.sharedService.errorLog(error.payload.error);
        })
      ),
    { dispatch: false }
  );

  getCategoriesByUrl$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CategoryActions.getCategoriesByUrl),
      exhaustMap(({ paramUrl }) =>
        this.categoryService.getCategoriesByUrl(paramUrl).pipe(
          map((categories) => {
            this.store.dispatch(isLoading({ status: false }));
            return CategoryActions.getCategoriesByUrlSuccess({
              categories: categories,
            });
          }),
          catchError((error) => {
            return of(
              CategoryActions.getCategoriesByUrlFailure({
                payload: error,
              })
            );
          })
        )
      )
    )
  );

  getCategoriesByUrlFailure$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(CategoryActions.getCategoriesByUrlFailure),
        map((error) => {
          this.store.dispatch(isLoading({ status: false }));
          this.errorResponse = error.payload.error;
          this.sharedService.errorLog(error.payload.error);
        })
      ),
    { dispatch: false }
  );

  getCategoryByUrl$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CategoryActions.getCategoryByUrl),
      exhaustMap(({ paramUrl }) =>
        this.categoryService.getCategoryByUrl(paramUrl).pipe(
          map((category) => {
            this.store.dispatch(isLoading({ status: false }));
            return CategoryActions.getCategoryByUrlSuccess({
              category: category,
            });
          }),
          catchError((error) => {
            return of(
              CategoryActions.getCategoryByUrlFailure({
                payload: error,
              })
            );
          })
        )
      )
    )
  );

  getCategoryByUrlFailure$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(CategoryActions.getCategoryByUrlFailure),
        map((error) => {
          this.store.dispatch(isLoading({ status: false }));
          this.errorResponse = error.payload.error;
          this.sharedService.errorLog(error.payload.error);
        })
      ),
    { dispatch: false }
  );

  getCategoryNamebyUrl$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CategoryActions.getCategoryNamebyUrl),
      exhaustMap(({ paramUrl }) =>
        this.categoryService.getCategoryNamebyUrl(paramUrl).pipe(
          map((breadcrumbs) => {
            this.store.dispatch(isLoading({ status: false }));
            return CategoryActions.getCategoryNamebyUrlSuccess({
              breadcrumbs: breadcrumbs,
            });
          }),
          catchError((error) => {
            return of(
              CategoryActions.getCategoryNamebyUrlFailure({
                payload: error,
              })
            );
          })
        )
      )
    )
  );

  getCategoryNamebyUrlFailure$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(CategoryActions.getCategoryNamebyUrlFailure),
        map((error) => {
          this.store.dispatch(isLoading({ status: false }));
          this.errorResponse = error.payload.error;
          this.sharedService.errorLog(error.payload.error);
        })
      ),
    { dispatch: false }
  );

  getCategoriesBreadcrumbs$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CategoryActions.getCategoriesBreadcrumbs),
      exhaustMap(() =>
        this.categoryService.getCategories().pipe(
          map((categories) => {
            this.store.dispatch(isLoading({ status: false }));
            let breadcrumbs: BreadcrumbDTO[] = [];
            categories.map((category) => {
              breadcrumbs = [
                ...breadcrumbs,
                {
                  name: category.name,
                  url: category.url,
                },
              ];
            });

            return CategoryActions.getCategoriesBreadcrumbsSuccess({
              breadcrumbs: breadcrumbs,
            });
          }),
          catchError((error) => {
            return of(
              CategoryActions.getCategoriesBreadcrumbsFailure({
                payload: error,
              })
            );
          })
        )
      )
    )
  );

  getCategoriesBreadcrumbsFailure$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(CategoryActions.getCategoriesBreadcrumbsFailure),
        map((error) => {
          this.store.dispatch(isLoading({ status: false }));
          this.errorResponse = error.payload.error;
          this.sharedService.errorLog(error.payload.error);
        })
      ),
    { dispatch: false }
  );

  createCategory$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CategoryActions.createCategory),
      exhaustMap(({ category }) =>
        this.categoryService.createCategory(category).pipe(
          map((category) => {
            return CategoryActions.createCategorySuccess({
              category: category,
            });
          }),
          catchError((error) => {
            return of(
              CategoryActions.createCategoryFailure({ payload: error })
            );
          }),
          finalize(async () => {
            setTimeout(() => {
              this.sharedService.notification(
                'categoryFeedback',
                this.responseOK,
                this.errorResponse,
                'Se ha creado una nueva categoría.'
              );
            }, 100);
          })
        )
      )
    )
  );

  createCategorySuccess$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(CategoryActions.createCategorySuccess),
        map(() => {
          this.store.dispatch(isLoading({ status: false }));
          this.responseOK = true;
        })
      ),
    { dispatch: false }
  );

  createCategoryFailure$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(CategoryActions.createCategoryFailure),
        map((error) => {
          this.store.dispatch(isLoading({ status: false }));
          this.responseOK = false;
          this.errorResponse = error.payload.error;
          this.sharedService.errorLog(error.payload.error);
        })
      ),
    { dispatch: false }
  );

  updateCategory$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CategoryActions.updateCategory),
      exhaustMap(({ categoryId, category }) =>
        this.categoryService.updateCategory(categoryId, category).pipe(
          map((category) => {
            return CategoryActions.updateCategorySuccess({
              category: category,
            });
          }),
          catchError((error) => {
            return of(
              CategoryActions.updateCategoryFailure({ payload: error })
            );
          }),
          finalize(async () => {
            setTimeout(() => {
              this.sharedService.notification(
                'categoryFeedback',
                this.responseOK,
                this.errorResponse,
                'Se ha actualizado la categoría.'
              );
            }, 100);
          })
        )
      )
    )
  );

  updateCategorySuccess$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(CategoryActions.updateCategorySuccess),
        map(() => {
          this.store.dispatch(isLoading({ status: false }));
          this.responseOK = true;
        })
      ),
    { dispatch: false }
  );

  updateCategoryFailure$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(CategoryActions.updateCategoryFailure),
        map((error) => {
          this.store.dispatch(isLoading({ status: false }));
          this.responseOK = false;
          this.errorResponse = error.payload.error;
          this.sharedService.errorLog(error.payload.error);
        })
      ),
    { dispatch: false }
  );

  deleteCategory$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CategoryActions.deleteCategory),
      exhaustMap(({ categoryId }) =>
        this.categoryService.deleteCategory(categoryId).pipe(
          map(() => {
            this.store.dispatch(isLoading({ status: false }));
            return CategoryActions.deleteCategorySuccess({
              categoryId: categoryId,
            });
          }),
          catchError((error) => {
            return of(
              CategoryActions.deleteCategoryFailure({ payload: error })
            );
          })
        )
      )
    )
  );

  deleteCategoryFailure$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(CategoryActions.deleteCategoryFailure),
        map((error) => {
          this.store.dispatch(isLoading({ status: false }));
          this.errorResponse = error.payload.error;
          this.sharedService.errorLog(error.payload.error);
        })
      ),
    { dispatch: false }
  );
}
