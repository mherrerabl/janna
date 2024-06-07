import { HttpErrorResponse } from '@angular/common/http';
import { createAction, props } from '@ngrx/store';
import { BreadcrumbDTO } from '../../shared/models/breadcrumb.dto';
import { ProductClass } from '../models/product';

export const getProducts = createAction('[Products list] Get products list');
export const getProductsSuccess = createAction(
  '[Products list] Get products list success',
  props<{ products: ProductClass[] }>()
);

export const getProductsFailure = createAction(
  '[Products list] Get products list fail',
  props<{ payload: HttpErrorResponse }>()
);

export const getProductsForSale = createAction(
  '[Products list] Get products list for sale'
);
export const getProductsForSaleSuccess = createAction(
  '[Products list] Get products list for sale success',
  props<{ products: ProductClass[] }>()
);

export const getProductsForSaleFailure = createAction(
  '[Products list] Get products list for sale fail',
  props<{ payload: HttpErrorResponse }>()
);

export const getProductById = createAction(
  '[Product detail] Get product detail',
  props<{ productId: string }>()
);
export const getProductByIdSuccess = createAction(
  '[Product detail] Get product detail success',
  props<{ product: ProductClass }>()
);

export const getProductByIdFailure = createAction(
  '[Product detail] Get product detail fail',
  props<{ payload: HttpErrorResponse }>()
);

export const getProductsByTreatmentId = createAction(
  '[Products list] Get products by treatment id',
  props<{ treatmentId: string }>()
);
export const getProductsByTreatmentIdSuccess = createAction(
  '[Products list] Get products by treatment id success',
  props<{ products: ProductClass[] }>()
);

export const getProductsByTreatmentIdFailure = createAction(
  '[Products list] Get products by treatment id fail',
  props<{ payload: HttpErrorResponse }>()
);

export const getProductsRelated = createAction(
  '[Products list] Get products by category id',
  props<{ productId: string }>()
);
export const getProductsRelatedSuccess = createAction(
  '[Products list] Get products by category id success',
  props<{ productsRelated: ProductClass[] }>()
);

export const getProductsRelatedFailure = createAction(
  '[Products list] Get products by category id fail',
  props<{ payload: HttpErrorResponse }>()
);

export const getProductsByCategoryUrl = createAction(
  '[Products list] Get products by category url',
  props<{ categoryUrl: string }>()
);
export const getProductsByCategoryUrlSuccess = createAction(
  '[Products list] Get products by category url success',
  props<{ products: ProductClass[] }>()
);

export const getProductsByCategoryUrlFailure = createAction(
  '[Products list] Get products by category id fail',
  props<{ payload: HttpErrorResponse }>()
);

export const getProductsByTrend = createAction(
  '[Products list] Get products in trend'
);
export const getProductsByTrendSuccess = createAction(
  '[Products list] Get products in trend success',
  props<{ products: ProductClass[] }>()
);

export const getProductsByTrendFailure = createAction(
  '[Products list] Get products in trend fail',
  props<{ payload: HttpErrorResponse }>()
);

export const getProductsByOffer = createAction(
  '[Products list] Get products in offer'
);
export const getProductsByOfferSuccess = createAction(
  '[Products list] Get products in offer success',
  props<{ products: ProductClass[] }>()
);

export const getProductsByOfferFailure = createAction(
  '[Products list] Get products in offer fail',
  props<{ payload: HttpErrorResponse }>()
);

export const getNewProducts = createAction(
  '[Products list] Get new products',
  props<{ quantity: number }>()
);
export const getNewProductsSuccess = createAction(
  '[Products list] Get new products success',
  props<{ products: ProductClass[] }>()
);

export const getNewProductsFailure = createAction(
  '[Products list] Get new products fail',
  props<{ payload: HttpErrorResponse }>()
);

export const getProductByIdForSale = createAction(
  '[Product] Get product by  id ',
  props<{ productId: string }>()
);
export const getProductByIdForSaleSuccess = createAction(
  '[Product] Get product by id  success',
  props<{ product: ProductClass }>()
);

export const getProductByIdForSaleFailure = createAction(
  '[Product] Get product by id fail',
  props<{ payload: HttpErrorResponse }>()
);
export const getProductsBreadcrumbs = createAction(
  '[Products] Get products for breadcrumbs'
);
export const getProductsBreadcrumbsSuccess = createAction(
  '[Products] Get products for breadcrumbs success',
  props<{ breadcrumbs: BreadcrumbDTO[] }>()
);

export const getProductsBreadcrumbsFailure = createAction(
  '[Products] Get products for breadcrumbs fail',
  props<{ payload: HttpErrorResponse }>()
);
export const createProduct = createAction(
  '[Product form] Create new product',
  props<{ product: ProductClass }>()
);

export const createProductSuccess = createAction(
  '[Product form] Create new product success',
  props<{ product: ProductClass }>()
);

export const createProductFailure = createAction(
  '[Product form] Create new product fail',
  props<{ payload: HttpErrorResponse }>()
);

export const updateProduct = createAction(
  '[Product form] Update product',
  props<{ productId: string; product: ProductClass }>()
);

export const updateProductSuccess = createAction(
  '[Product form] Update product success',
  props<{ product: ProductClass }>()
);

export const updateProductFailure = createAction(
  '[Product form] Update product fail',
  props<{ payload: HttpErrorResponse }>()
);

export const deleteProduct = createAction(
  '[Product form] Delete product',
  props<{ productId: string }>()
);

export const deleteProductSuccess = createAction(
  '[Product form] Delete product success',
  props<{ productId: string }>()
);

export const deleteProductFailure = createAction(
  '[Product form] Delete product fail',
  props<{ payload: HttpErrorResponse }>()
);
