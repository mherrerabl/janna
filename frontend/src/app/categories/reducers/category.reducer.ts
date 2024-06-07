import { Action, createReducer, on } from '@ngrx/store';
import { BreadcrumbDTO } from '../../shared/models/breadcrumb.dto';
import {
  createCategory,
  createCategoryFailure,
  createCategorySuccess,
  deleteCategory,
  deleteCategoryFailure,
  deleteCategorySuccess,
  getCategories,
  getCategoriesBreadcrumbs,
  getCategoriesBreadcrumbsFailure,
  getCategoriesBreadcrumbsSuccess,
  getCategoriesByDepartment,
  getCategoriesByDepartmentFailure,
  getCategoriesByDepartmentSuccess,
  getCategoriesByUrl,
  getCategoriesByUrlFailure,
  getCategoriesByUrlSuccess,
  getCategoriesFailure,
  getCategoriesSuccess,
  getCategoryById,
  getCategoryByIdFailure,
  getCategoryByIdSuccess,
  getCategoryByUrl,
  getCategoryByUrlFailure,
  getCategoryByUrlSuccess,
  getCategoryNamebyUrl,
  getCategoryNamebyUrlFailure,
  getCategoryNamebyUrlSuccess,
  updateCategory,
  updateCategoryFailure,
  updateCategorySuccess,
} from '../actions';
import { CategoryClass, Department } from '../models/category';

export interface CategoriesState {
  categories: CategoryClass[];
  category: CategoryClass;
  breadcrumbs: BreadcrumbDTO[];
  loading: boolean;
  loaded: boolean;
  error: any;
}

export const initialState: CategoriesState = {
  categories: new Array<CategoryClass>(),
  category: new CategoryClass('', '', Department.init, ''),
  breadcrumbs: new Array<BreadcrumbDTO>(),
  loading: false,
  loaded: false,
  error: null,
};

const _categoriesReducer = createReducer(
  initialState,
  on(getCategories, (state) => ({
    ...state,
    loading: true,
    loaded: false,
    error: null,
  })),
  on(getCategoriesSuccess, (state, action) => ({
    ...state,
    categories: action.categories,
    loading: false,
    loaded: true,
    error: null,
  })),
  on(getCategoriesFailure, (state, { payload }) => ({
    ...state,
    loading: false,
    loaded: false,
    error: { payload },
  })),

  on(getCategoryById, (state) => ({
    ...state,
    loading: true,
    loaded: false,
    error: null,
  })),
  on(getCategoryByIdSuccess, (state, action) => ({
    ...state,
    category: action.category,
    loading: false,
    loaded: true,
    error: null,
  })),
  on(getCategoryByIdFailure, (state, { payload }) => ({
    ...state,
    loading: false,
    loaded: false,
    error: { payload },
  })),

  on(getCategoriesByDepartment, (state) => ({
    ...state,
    loading: true,
    loaded: false,
    error: null,
  })),
  on(getCategoriesByDepartmentSuccess, (state, action) => ({
    ...state,
    categories: action.categories,
    loading: false,
    loaded: true,
    error: null,
  })),
  on(getCategoriesByDepartmentFailure, (state, { payload }) => ({
    ...state,
    loading: false,
    loaded: false,
    error: { payload },
  })),

  on(getCategoriesByUrl, (state) => ({
    ...state,
    loading: true,
    loaded: false,
    error: null,
  })),
  on(getCategoriesByUrlSuccess, (state, action) => ({
    ...state,
    categories: action.categories,
    loading: false,
    loaded: true,
    error: null,
  })),
  on(getCategoriesByUrlFailure, (state, { payload }) => ({
    ...state,
    loading: false,
    loaded: false,
    error: { payload },
  })),

  on(getCategoryByUrl, (state) => ({
    ...state,
    loading: true,
    loaded: false,
    error: null,
  })),
  on(getCategoryByUrlSuccess, (state, action) => ({
    ...state,
    category: action.category,
    loading: false,
    loaded: true,
    error: null,
  })),
  on(getCategoryByUrlFailure, (state, { payload }) => ({
    ...state,
    loading: false,
    loaded: false,
    error: { payload },
  })),

  on(getCategoryNamebyUrl, (state) => ({
    ...state,
    loading: true,
    loaded: false,
    error: null,
  })),
  on(getCategoryNamebyUrlSuccess, (state, action) => ({
    ...state,
    breadcrumbs: action.breadcrumbs,
    loading: false,
    loaded: true,
    error: null,
  })),
  on(getCategoryNamebyUrlFailure, (state, { payload }) => ({
    ...state,
    loading: false,
    loaded: false,
    error: { payload },
  })),
  on(getCategoriesBreadcrumbs, (state) => ({
    ...state,
    loading: true,
    loaded: false,
    error: null,
  })),
  on(getCategoriesBreadcrumbsSuccess, (state, action) => ({
    ...state,
    breadcrumbs: action.breadcrumbs,
    loading: false,
    loaded: true,
    error: null,
  })),
  on(getCategoriesBreadcrumbsFailure, (state, { payload }) => ({
    ...state,
    loading: false,
    loaded: false,
    error: { payload },
  })),
  on(createCategory, (state) => ({
    ...state,
    loading: true,
    loaded: false,
    error: null,
  })),
  on(createCategorySuccess, (state, action) => ({
    ...state,
    category: action.category,
    loading: false,
    loaded: true,
    error: null,
  })),
  on(createCategoryFailure, (state, { payload }) => ({
    ...state,
    loading: false,
    loaded: false,
    error: { payload },
  })),

  on(updateCategory, (state) => ({
    ...state,
    loading: true,
    loaded: false,
    error: null,
  })),
  on(updateCategorySuccess, (state, action) => ({
    ...state,
    category: action.category,
    loading: false,
    loaded: true,
    error: null,
  })),
  on(updateCategoryFailure, (state, { payload }) => ({
    ...state,
    loading: false,
    loaded: false,
    error: { payload },
  })),

  on(deleteCategory, (state) => ({
    ...state,
    loading: true,
    loaded: false,
    error: null,
  })),
  on(deleteCategorySuccess, (state, { categoryId }) => ({
    ...state,
    categories: [...state.categories.filter(({ id }) => id !== categoryId)],
    loading: false,
    loaded: true,
    error: null,
  })),
  on(deleteCategoryFailure, (state, { payload }) => ({
    ...state,
    loading: false,
    loaded: false,
    error: { payload },
  }))
);

export function categoriesReducer(
  state: CategoriesState | undefined,
  action: Action
): CategoriesState {
  return _categoriesReducer(state, action);
}
