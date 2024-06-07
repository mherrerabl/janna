import { Action, createReducer, on } from '@ngrx/store';
import { BreadcrumbDTO } from '../../shared/models/breadcrumb.dto';
import {
  createProduct,
  createProductFailure,
  createProductSuccess,
  deleteProduct,
  deleteProductFailure,
  deleteProductSuccess,
  getNewProducts,
  getNewProductsFailure,
  getNewProductsSuccess,
  getProductById,
  getProductByIdFailure,
  getProductByIdForSale,
  getProductByIdForSaleFailure,
  getProductByIdForSaleSuccess,
  getProductByIdSuccess,
  getProducts,
  getProductsBreadcrumbs,
  getProductsBreadcrumbsFailure,
  getProductsBreadcrumbsSuccess,
  getProductsByCategoryUrl,
  getProductsByCategoryUrlFailure,
  getProductsByCategoryUrlSuccess,
  getProductsByOffer,
  getProductsByOfferFailure,
  getProductsByOfferSuccess,
  getProductsByTreatmentId,
  getProductsByTreatmentIdFailure,
  getProductsByTreatmentIdSuccess,
  getProductsByTrend,
  getProductsByTrendFailure,
  getProductsByTrendSuccess,
  getProductsFailure,
  getProductsForSale,
  getProductsForSaleFailure,
  getProductsForSaleSuccess,
  getProductsRelated,
  getProductsRelatedFailure,
  getProductsRelatedSuccess,
  getProductsSuccess,
  updateProduct,
  updateProductFailure,
  updateProductSuccess,
} from '../actions';
import { ProductClass, Routine } from '../models/product';

export interface ProductsState {
  products: ProductClass[];
  product: ProductClass;
  productsRelated: ProductClass[];
  breadcrumbs: BreadcrumbDTO[];
  loading: boolean;
  loaded: boolean;
  error: any;
}

export const initialState: ProductsState = {
  products: new Array<ProductClass>(),
  product: new ProductClass(
    '',
    '',
    '',
    '',
    '',
    Routine.init,
    '',
    '',
    '',
    0,
    '',
    0,
    false,
    false,
    '',
    new Date()
  ),
  productsRelated: new Array<ProductClass>(),
  breadcrumbs: new Array<BreadcrumbDTO>(),
  loading: false,
  loaded: false,
  error: null,
};

const _productsReducer = createReducer(
  initialState,
  on(getProducts, (state) => ({
    ...state,
    loading: true,
    loaded: false,
    error: null,
  })),
  on(getProductsSuccess, (state, action) => ({
    ...state,
    products: action.products,
    loading: false,
    loaded: true,
    error: null,
  })),
  on(getProductsFailure, (state, { payload }) => ({
    ...state,
    loading: false,
    loaded: false,
    error: { payload },
  })),

  on(getProductsForSale, (state) => ({
    ...state,
    loading: true,
    loaded: false,
    error: null,
  })),
  on(getProductsForSaleSuccess, (state, action) => ({
    ...state,
    products: action.products,
    loading: false,
    loaded: true,
    error: null,
  })),
  on(getProductsForSaleFailure, (state, { payload }) => ({
    ...state,
    loading: false,
    loaded: false,
    error: { payload },
  })),

  on(getProductsByTreatmentId, (state) => ({
    ...state,
    loading: true,
    loaded: false,
    error: null,
  })),
  on(getProductsByTreatmentIdSuccess, (state, action) => ({
    ...state,
    products: action.products,
    loading: false,
    loaded: true,
    error: null,
  })),
  on(getProductsByTreatmentIdFailure, (state, { payload }) => ({
    ...state,
    loading: false,
    loaded: false,
    error: { payload },
  })),
  on(getProductsRelated, (state) => ({
    ...state,
    loading: true,
    loaded: false,
    error: null,
  })),
  on(getProductsRelatedSuccess, (state, action) => ({
    ...state,
    productsRelated: action.productsRelated,
    loading: false,
    loaded: true,
    error: null,
  })),
  on(getProductsRelatedFailure, (state, { payload }) => ({
    ...state,
    loading: false,
    loaded: false,
    error: { payload },
  })),

  on(getProductsByCategoryUrl, (state) => ({
    ...state,
    loading: true,
    loaded: false,
    error: null,
  })),
  on(getProductsByCategoryUrlSuccess, (state, action) => ({
    ...state,
    products: action.products,
    loading: false,
    loaded: true,
    error: null,
  })),
  on(getProductsByCategoryUrlFailure, (state, { payload }) => ({
    ...state,
    loading: false,
    loaded: false,
    error: { payload },
  })),
  on(getProductsByTrend, (state) => ({
    ...state,
    loading: true,
    loaded: false,
    error: null,
  })),
  on(getProductsByTrendSuccess, (state, action) => ({
    ...state,
    products: action.products,
    loading: false,
    loaded: true,
    error: null,
  })),
  on(getProductsByTrendFailure, (state, { payload }) => ({
    ...state,
    loading: false,
    loaded: false,
    error: { payload },
  })),
  on(getProductsByOffer, (state) => ({
    ...state,
    loading: true,
    loaded: false,
    error: null,
  })),
  on(getProductsByOfferSuccess, (state, action) => ({
    ...state,
    products: action.products,
    loading: false,
    loaded: true,
    error: null,
  })),
  on(getProductsByOfferFailure, (state, { payload }) => ({
    ...state,
    loading: false,
    loaded: false,
    error: { payload },
  })),

  on(getNewProducts, (state) => ({
    ...state,
    loading: true,
    loaded: false,
    error: null,
  })),
  on(getNewProductsSuccess, (state, action) => ({
    ...state,
    products: action.products,
    loading: false,
    loaded: true,
    error: null,
  })),
  on(getNewProductsFailure, (state, { payload }) => ({
    ...state,
    loading: false,
    loaded: false,
    error: { payload },
  })),

  on(getProductById, (state) => ({
    ...state,
    loading: true,
    loaded: false,
    error: null,
  })),
  on(getProductByIdSuccess, (state, action) => ({
    ...state,
    product: action.product,
    loading: false,
    loaded: true,
    error: null,
  })),
  on(getProductByIdFailure, (state, { payload }) => ({
    ...state,
    loading: false,
    loaded: false,
    error: { payload },
  })),
  on(getProductByIdForSale, (state) => ({
    ...state,
    loading: true,
    loaded: false,
    error: null,
  })),
  on(getProductByIdForSaleSuccess, (state, action) => ({
    ...state,
    product: action.product,
    loading: false,
    loaded: true,
    error: null,
  })),
  on(getProductByIdForSaleFailure, (state, { payload }) => ({
    ...state,
    loading: false,
    loaded: false,
    error: { payload },
  })),

  on(createProduct, (state) => ({
    ...state,
    loading: true,
    loaded: false,
    error: null,
  })),
  on(createProductSuccess, (state, action) => ({
    ...state,
    product: action.product,
    loading: false,
    loaded: true,
    error: null,
  })),
  on(createProductFailure, (state, { payload }) => ({
    ...state,
    loading: false,
    loaded: false,
    error: { payload },
  })),
  on(getProductsBreadcrumbs, (state) => ({
    ...state,
    loading: true,
    loaded: false,
    error: null,
  })),
  on(getProductsBreadcrumbsSuccess, (state, action) => ({
    ...state,
    breadcrumbs: action.breadcrumbs,
    loading: false,
    loaded: true,
    error: null,
  })),
  on(getProductsBreadcrumbsFailure, (state, { payload }) => ({
    ...state,
    loading: false,
    loaded: false,
    error: { payload },
  })),
  on(updateProduct, (state) => ({
    ...state,
    loading: true,
    loaded: false,
    error: null,
  })),
  on(updateProductSuccess, (state, action) => ({
    ...state,
    product: action.product,
    loading: false,
    loaded: true,
    error: null,
  })),
  on(updateProductFailure, (state, { payload }) => ({
    ...state,
    loading: false,
    loaded: false,
    error: { payload },
  })),

  on(deleteProduct, (state) => ({
    ...state,
    loading: true,
    loaded: false,
    error: null,
  })),
  on(deleteProductSuccess, (state, { productId }) => ({
    ...state,
    products: [...state.products.filter(({ id }) => id !== productId)],
    loading: false,
    loaded: true,
    error: null,
  })),
  on(deleteProductFailure, (state, { payload }) => ({
    ...state,
    loading: false,
    loaded: false,
    error: { payload },
  }))
);

export function productsReducer(
  state: ProductsState | undefined,
  action: Action
): ProductsState {
  return _productsReducer(state, action);
}
