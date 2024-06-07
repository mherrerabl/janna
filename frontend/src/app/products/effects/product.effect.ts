import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { catchError, exhaustMap, finalize, map, of } from 'rxjs';
import { BreadcrumbDTO } from '../../shared/models/breadcrumb.dto';
import { SharedService } from '../../shared/services/shared.service';
import { isLoading } from '../../spinner/actions/spinner.actions';
import { ProductService } from '../services/product.service';
import * as ProductActions from './../actions';

@Injectable()
export class ProductEffects {
  private responseOK: boolean;
  private errorResponse: any;

  constructor(
    private actions$: Actions,
    private productService: ProductService,
    private sharedService: SharedService,
    private router: Router,
    private store: Store
  ) {
    this.responseOK = false;
  }

  getProducts$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ProductActions.getProducts),
      exhaustMap(() =>
        this.productService.getProducts().pipe(
          map((products) => {
            this.store.dispatch(isLoading({ status: false }));
            return ProductActions.getProductsSuccess({
              products: products,
            });
          }),
          catchError((error) => {
            return of(ProductActions.getProductsFailure({ payload: error }));
          })
        )
      )
    )
  );
  getProductsFailure$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(ProductActions.getProductsFailure),
        map((error) => {
          this.store.dispatch(isLoading({ status: false }));
          this.responseOK = false;
          this.errorResponse = error.payload.error;
          this.sharedService.errorLog(error.payload.error);
        })
      ),
    { dispatch: false }
  );

  getProductsForSale$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ProductActions.getProductsForSale),
      exhaustMap(() =>
        this.productService.getProductsForSale().pipe(
          map((products) => {
            this.store.dispatch(isLoading({ status: false }));
            return ProductActions.getProductsForSaleSuccess({
              products: products,
            });
          }),
          catchError((error) => {
            return of(
              ProductActions.getProductsForSaleFailure({ payload: error })
            );
          })
        )
      )
    )
  );
  getProductsForSaleFailure$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(ProductActions.getProductsForSaleFailure),
        map((error) => {
          this.store.dispatch(isLoading({ status: false }));
          this.responseOK = false;
          this.errorResponse = error.payload.error;
          this.sharedService.errorLog(error.payload.error);
        })
      ),
    { dispatch: false }
  );

  getProductsByTrend$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ProductActions.getProductsByTrend),
      exhaustMap(() =>
        this.productService.getProductsByTrend().pipe(
          map((products) => {
            this.store.dispatch(isLoading({ status: false }));
            return ProductActions.getProductsByTrendSuccess({
              products: products,
            });
          }),
          catchError((error) => {
            return of(
              ProductActions.getProductsByTrendFailure({ payload: error })
            );
          })
        )
      )
    )
  );
  getProductsByTrendFailure$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(ProductActions.getProductsByTrendFailure),
        map((error) => {
          this.store.dispatch(isLoading({ status: false }));
          this.responseOK = false;
          this.errorResponse = error.payload.error;
          this.sharedService.errorLog(error.payload.error);
        })
      ),
    { dispatch: false }
  );
  getProductsByOffer$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ProductActions.getProductsByOffer),
      exhaustMap(() =>
        this.productService.getProductsByOffer().pipe(
          map((products) => {
            this.store.dispatch(isLoading({ status: false }));
            return ProductActions.getProductsByOfferSuccess({
              products: products,
            });
          }),
          catchError((error) => {
            return of(
              ProductActions.getProductsByOfferFailure({ payload: error })
            );
          })
        )
      )
    )
  );
  getProductsByOfferFailure$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(ProductActions.getProductsByOfferFailure),
        map((error) => {
          this.store.dispatch(isLoading({ status: false }));
          this.responseOK = false;
          this.errorResponse = error.payload.error;
          this.sharedService.errorLog(error.payload.error);
        })
      ),
    { dispatch: false }
  );

  getProductsByTreatmentId$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ProductActions.getProductsByTreatmentId),
      exhaustMap(({ treatmentId }) =>
        this.productService.getProductsByTreatmentId(treatmentId).pipe(
          map((products) => {
            this.store.dispatch(isLoading({ status: false }));
            return ProductActions.getProductsByTreatmentIdSuccess({
              products: products,
            });
          }),
          catchError((error) => {
            return of(
              ProductActions.getProductsByTreatmentIdFailure({
                payload: error,
              })
            );
          })
        )
      )
    )
  );
  getProductsByTreatmentIdFailure$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(ProductActions.getProductsByTreatmentIdFailure),
        map((error) => {
          this.store.dispatch(isLoading({ status: false }));
          this.responseOK = false;
          this.errorResponse = error.payload.error;
          this.sharedService.errorLog(error.payload.error);
        })
      ),
    { dispatch: false }
  );

  getProductsByCategoryUrl$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ProductActions.getProductsByCategoryUrl),
      exhaustMap(({ categoryUrl }) =>
        this.productService.getProductsByCategoryUrl(categoryUrl).pipe(
          map((products) => {
            this.store.dispatch(isLoading({ status: false }));
            return ProductActions.getProductsByCategoryUrlSuccess({
              products: products,
            });
          }),
          catchError((error) => {
            return of(
              ProductActions.getProductsByCategoryUrlFailure({ payload: error })
            );
          })
        )
      )
    )
  );
  getProductsByCategoryUrlFailure$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(ProductActions.getProductsByCategoryUrlFailure),
        map((error) => {
          this.store.dispatch(isLoading({ status: false }));
          this.responseOK = false;
          this.errorResponse = error.payload.error;
          this.sharedService.errorLog(error.payload.error);
        })
      ),
    { dispatch: false }
  );

  getProductsRelated$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ProductActions.getProductsRelated),
      exhaustMap(({ productId }) =>
        this.productService.getProductsRelated(productId).pipe(
          map((products) => {
            this.store.dispatch(isLoading({ status: false }));
            return ProductActions.getProductsRelatedSuccess({
              productsRelated: products,
            });
          }),
          catchError((error) => {
            return of(
              ProductActions.getProductsRelatedFailure({ payload: error })
            );
          })
        )
      )
    )
  );
  getProductsRelatedFailure$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(ProductActions.getProductsRelatedFailure),
        map((error) => {
          this.store.dispatch(isLoading({ status: false }));
          this.responseOK = false;
          this.errorResponse = error.payload.error;
          this.sharedService.errorLog(error.payload.error);
        })
      ),
    { dispatch: false }
  );

  getNewProducts$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ProductActions.getNewProducts),
      exhaustMap(({ quantity }) =>
        this.productService.getNewProducts(quantity).pipe(
          map((products) => {
            this.store.dispatch(isLoading({ status: false }));
            return ProductActions.getNewProductsSuccess({
              products: products,
            });
          }),
          catchError((error) => {
            return of(ProductActions.getNewProductsFailure({ payload: error }));
          })
        )
      )
    )
  );
  getNewProductsFailure$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(ProductActions.getNewProductsFailure),
        map((error) => {
          this.store.dispatch(isLoading({ status: false }));
          this.responseOK = false;
          this.errorResponse = error.payload.error;
          this.sharedService.errorLog(error.payload.error);
        })
      ),
    { dispatch: false }
  );

  getProductById$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ProductActions.getProductById),
      exhaustMap(({ productId }) =>
        this.productService.getProductById(productId).pipe(
          map((product) => {
            this.store.dispatch(isLoading({ status: false }));
            return ProductActions.getProductByIdSuccess({
              product: product,
            });
          }),
          catchError((error) => {
            return of(ProductActions.getProductByIdFailure({ payload: error }));
          })
        )
      )
    )
  );

  getProductByIdFailure$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(ProductActions.getProductByIdFailure),
        map((error) => {
          this.store.dispatch(isLoading({ status: false }));
          this.errorResponse = error.payload.error;
          this.sharedService.errorLog(error.payload.error);
        })
      ),
    { dispatch: false }
  );

  getProductByIdForSale$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ProductActions.getProductByIdForSale),
      exhaustMap(({ productId }) =>
        this.productService.getProductByIdForSale(productId).pipe(
          map((product) => {
            this.store.dispatch(isLoading({ status: false }));
            return ProductActions.getProductByIdForSaleSuccess({
              product: product,
            });
          }),
          catchError((error) => {
            return of(
              ProductActions.getProductByIdForSaleFailure({ payload: error })
            );
          })
        )
      )
    )
  );

  getProductByIdForSaleFailure$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(ProductActions.getProductByIdForSaleFailure),
        map((error) => {
          this.store.dispatch(isLoading({ status: false }));
          this.errorResponse = error.payload.error;
          this.sharedService.errorLog(error.payload.error);
        })
      ),
    { dispatch: false }
  );
  getProductsBreadcrumbs$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ProductActions.getProductsBreadcrumbs),
      exhaustMap(() =>
        this.productService.getProducts().pipe(
          map((products) => {
            this.store.dispatch(isLoading({ status: false }));
            let breadcrumbs: BreadcrumbDTO[] = [];
            products.map((product) => {
              breadcrumbs = [
                ...breadcrumbs,
                {
                  name: product.name,
                  url: product.id,
                },
              ];
            });

            return ProductActions.getProductsBreadcrumbsSuccess({
              breadcrumbs: breadcrumbs,
            });
          }),
          catchError((error) => {
            return of(
              ProductActions.getProductsBreadcrumbsFailure({
                payload: error,
              })
            );
          })
        )
      )
    )
  );

  getProductsBreadcrumbsFailure$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(ProductActions.getProductsBreadcrumbsFailure),
        map((error) => {
          this.store.dispatch(isLoading({ status: false }));
          this.errorResponse = error.payload.error;
          this.sharedService.errorLog(error.payload.error);
        })
      ),
    { dispatch: false }
  );
  createProduct$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ProductActions.createProduct),
      exhaustMap(({ product }) =>
        this.productService.createProduct(product).pipe(
          map((product) => {
            return ProductActions.createProductSuccess({
              product: product,
            });
          }),
          catchError((error) => {
            return of(ProductActions.createProductFailure({ payload: error }));
          }),
          finalize(async () => {
            setTimeout(() => {
              this.sharedService.notification(
                'productFeedback',
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

  createProductSuccess$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(ProductActions.createProductSuccess),
        map(() => {
          this.store.dispatch(isLoading({ status: false }));
          this.responseOK = true;
        })
      ),
    { dispatch: false }
  );

  createProductFailure$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(ProductActions.createProductFailure),
        map((error) => {
          this.store.dispatch(isLoading({ status: false }));
          this.responseOK = false;
          this.errorResponse = error.payload.error;
          this.sharedService.errorLog(error.payload.error);
        })
      ),
    { dispatch: false }
  );

  updateProduct$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ProductActions.updateProduct),
      exhaustMap(({ productId, product }) =>
        this.productService.updateProduct(productId, product).pipe(
          map((product) => {
            return ProductActions.updateProductSuccess({
              product: product,
            });
          }),
          catchError((error) => {
            return of(ProductActions.updateProductFailure({ payload: error }));
          }),
          finalize(async () => {
            setTimeout(() => {
              this.sharedService.notification(
                'productFeedback',
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

  updateProductSuccess$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(ProductActions.updateProductSuccess),
        map(() => {
          this.store.dispatch(isLoading({ status: false }));
          this.responseOK = true;
        })
      ),
    { dispatch: false }
  );

  updateProductFailure$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(ProductActions.updateProductFailure),
        map((error) => {
          this.store.dispatch(isLoading({ status: false }));
          this.responseOK = false;
          this.errorResponse = error.payload.error;
          this.sharedService.errorLog(error.payload.error);
        })
      ),
    { dispatch: false }
  );

  deleteProduct$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ProductActions.deleteProduct),
      exhaustMap(({ productId }) =>
        this.productService.deleteProduct(productId).pipe(
          map(() => {
            this.store.dispatch(isLoading({ status: false }));
            return ProductActions.deleteProductSuccess({
              productId: productId,
            });
          }),
          catchError((error) => {
            return of(ProductActions.deleteProductFailure({ payload: error }));
          })
        )
      )
    )
  );

  deleteProductFailure$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(ProductActions.deleteProductFailure),
        map((error) => {
          this.store.dispatch(isLoading({ status: false }));
          this.errorResponse = error.payload.error;
          this.sharedService.errorLog(error.payload.error);
        })
      ),
    { dispatch: false }
  );
}
