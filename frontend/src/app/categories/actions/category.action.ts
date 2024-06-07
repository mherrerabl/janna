import { HttpErrorResponse } from '@angular/common/http';
import { createAction, props } from '@ngrx/store';
import { BreadcrumbDTO } from '../../shared/models/breadcrumb.dto';
import { CategoryClass } from '../models/category';

export const getCategories = createAction(
  '[Categories list] Get categories list'
);
export const getCategoriesSuccess = createAction(
  '[Categories list] Get categories list success',
  props<{ categories: CategoryClass[] }>()
);

export const getCategoriesFailure = createAction(
  '[Categories list] Get categories list fail',
  props<{ payload: HttpErrorResponse }>()
);

export const getCategoryById = createAction(
  '[Category detail] Get category detail',
  props<{ categoryId: string }>()
);
export const getCategoryByIdSuccess = createAction(
  '[Category detail] Get category detail success',
  props<{ category: CategoryClass }>()
);

export const getCategoryByIdFailure = createAction(
  '[Category detail] Get category detail fail',
  props<{ payload: HttpErrorResponse }>()
);

export const getCategoriesByDepartment = createAction(
  '[Categories list] Get categories by department',
  props<{ department: string }>()
);
export const getCategoriesByDepartmentSuccess = createAction(
  '[Categories list] Get categories by department success',
  props<{ categories: CategoryClass[] }>()
);

export const getCategoriesByDepartmentFailure = createAction(
  '[Categories list] Get categories by department fail',
  props<{ payload: HttpErrorResponse }>()
);

export const getCategoriesByUrl = createAction(
  '[Categories list] Get categories by param',
  props<{ paramUrl: string }>()
);
export const getCategoriesByUrlSuccess = createAction(
  '[Categories list] Get categories by param success',
  props<{ categories: CategoryClass[] }>()
);

export const getCategoriesByUrlFailure = createAction(
  '[Categories list] Get categories by param fail',
  props<{ payload: HttpErrorResponse }>()
);

export const getCategoryByUrl = createAction(
  '[Category] Get category by subcategory',
  props<{ paramUrl: string }>()
);
export const getCategoryByUrlSuccess = createAction(
  '[Category] Get category by subcategory success',
  props<{ category: CategoryClass }>()
);

export const getCategoryByUrlFailure = createAction(
  '[Category] Get category by subcategory fail',
  props<{ payload: HttpErrorResponse }>()
);

export const getCategoryNamebyUrl = createAction(
  '[Category] Get category by subcategory',
  props<{ paramUrl: string }>()
);
export const getCategoryNamebyUrlSuccess = createAction(
  '[Category] Get category by subcategory success',
  props<{ breadcrumbs: BreadcrumbDTO[] }>()
);

export const getCategoryNamebyUrlFailure = createAction(
  '[Category] Get category by subcategory fail',
  props<{ payload: HttpErrorResponse }>()
);

export const getCategoriesBreadcrumbs = createAction(
  '[Categories] Get categories for breadcrumbs'
);
export const getCategoriesBreadcrumbsSuccess = createAction(
  '[Categories] Get categories for breadcrumbs success',
  props<{ breadcrumbs: BreadcrumbDTO[] }>()
);

export const getCategoriesBreadcrumbsFailure = createAction(
  '[Categories] Get categories for breadcrumbs fail',
  props<{ payload: HttpErrorResponse }>()
);

export const createCategory = createAction(
  '[Category form] Create new category',
  props<{ category: CategoryClass }>()
);

export const createCategorySuccess = createAction(
  '[Category form] Create new category success',
  props<{ category: CategoryClass }>()
);

export const createCategoryFailure = createAction(
  '[Category form] Create new category fail',
  props<{ payload: HttpErrorResponse }>()
);

export const updateCategory = createAction(
  '[Category form] Update category',
  props<{ categoryId: string; category: CategoryClass }>()
);

export const updateCategorySuccess = createAction(
  '[Category form] Update category success',
  props<{ category: CategoryClass }>()
);

export const updateCategoryFailure = createAction(
  '[Category form] Update category fail',
  props<{ payload: HttpErrorResponse }>()
);

export const deleteCategory = createAction(
  '[Category form] Delete category',
  props<{ categoryId: string }>()
);

export const deleteCategorySuccess = createAction(
  '[Category form] Delete category success',
  props<{ categoryId: string }>()
);

export const deleteCategoryFailure = createAction(
  '[Category form] Delete category fail',
  props<{ payload: HttpErrorResponse }>()
);
