import { HttpErrorResponse } from '@angular/common/http';
import { createAction, props } from '@ngrx/store';
import { ImageClass } from '../models/image';

export const getAllImages = createAction('[Images list] Get images list');
export const getAllImagesSuccess = createAction(
  '[Images list] Get images list success',
  props<{ images: ImageClass[] }>()
);

export const getAllImagesFailure = createAction(
  '[Images list] Get images list fail',
  props<{ payload: HttpErrorResponse }>()
);

export const getImageById = createAction(
  '[Image detail] Get image detail',
  props<{ imageId: string }>()
);
export const getImageByIdSuccess = createAction(
  '[Image detail] Get image detail success',
  props<{ image: ImageClass }>()
);

export const getImageByIdFailure = createAction(
  '[Image detail] Get image detail fail',
  props<{ payload: HttpErrorResponse }>()
);

export const getImagesByProduct = createAction(
  '[Images product] Get images by product',
  props<{ productId: string }>()
);
export const getImagesByProductSuccess = createAction(
  '[Images product] Get images by product success',
  props<{ images: ImageClass[] }>()
);

export const getImagesByProductFailure = createAction(
  '[Images product] Get images by product fail',
  props<{ payload: HttpErrorResponse }>()
);

export const getImagesByTreatment = createAction(
  '[Images treatment] Get images by treatment',
  props<{ treatmentId: string }>()
);
export const getImagesByTreatmentSuccess = createAction(
  '[Images treatment] Get images by treatment success',
  props<{ images: ImageClass[] }>()
);

export const getImagesByTreatmentFailure = createAction(
  '[Images treatment] Get images by treatment fail',
  props<{ payload: HttpErrorResponse }>()
);

export const getImageByCategory = createAction(
  '[Images category] Get image by category',
  props<{ categoryId: string }>()
);
export const getImageByCategorySuccess = createAction(
  '[Image category] Get image by category success',
  props<{ image: ImageClass }>()
);

export const getImageByCategoryFailure = createAction(
  '[Image category] Get image by category fail',
  props<{ payload: HttpErrorResponse }>()
);

export const createImage = createAction(
  '[Image form] Create new image',
  props<{ image: ImageClass }>()
);

export const createImageSuccess = createAction(
  '[Image form] Create new image success',
  props<{ image: ImageClass }>()
);

export const createImageFailure = createAction(
  '[Image form] Create new image fail',
  props<{ payload: HttpErrorResponse }>()
);

export const updateImage = createAction(
  '[Image form] Update image',
  props<{ imageId: string; image: ImageClass }>()
);

export const updateImageSuccess = createAction(
  '[Image form] Update image success',
  props<{ image: ImageClass }>()
);

export const updateImageFailure = createAction(
  '[Image form] Update image fail',
  props<{ payload: HttpErrorResponse }>()
);

export const deleteImage = createAction(
  '[Image form] Delete image',
  props<{ imageId: string }>()
);

export const deleteImageSuccess = createAction(
  '[Image form] Delete image success',
  props<{ imageId: string }>()
);

export const deleteImageFailure = createAction(
  '[Image form] Delete image fail',
  props<{ payload: HttpErrorResponse }>()
);
