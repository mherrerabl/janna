import { Action, createReducer, on } from '@ngrx/store';
import {
  createImage,
  createImageFailure,
  createImageSuccess,
  deleteImage,
  deleteImageFailure,
  deleteImageSuccess,
  getAllImages,
  getAllImagesFailure,
  getAllImagesSuccess,
  getImageByCategory,
  getImageByCategoryFailure,
  getImageByCategorySuccess,
  getImageById,
  getImageByIdFailure,
  getImageByIdSuccess,
  getImagesByProduct,
  getImagesByProductFailure,
  getImagesByProductSuccess,
  getImagesByTreatment,
  getImagesByTreatmentFailure,
  getImagesByTreatmentSuccess,
  updateImage,
  updateImageFailure,
  updateImageSuccess,
} from '../actions';
import { ImageClass } from '../models/image';

export interface ImagesState {
  images: ImageClass[];
  image: ImageClass;
  loading: boolean;
  loaded: boolean;
  error: any;
}

export const initialState: ImagesState = {
  images: new Array<ImageClass>(),
  image: new ImageClass('', '', new Blob(), new Blob()),
  loading: false,
  loaded: false,
  error: null,
};

const _imagesReducer = createReducer(
  initialState,
  on(getAllImages, (state) => ({
    ...state,
    loading: true,
    loaded: false,
    error: null,
  })),
  on(getAllImagesSuccess, (state, action) => ({
    ...state,
    images: action.images,
    loading: false,
    loaded: true,
    error: null,
  })),
  on(getAllImagesFailure, (state, { payload }) => ({
    ...state,
    loading: false,
    loaded: false,
    error: { payload },
  })),

  on(getImageById, (state) => ({
    ...state,
    loading: true,
    loaded: false,
    error: null,
  })),
  on(getImageByIdSuccess, (state, action) => ({
    ...state,
    image: action.image,
    loading: false,
    loaded: true,
    error: null,
  })),
  on(getImageByIdFailure, (state, { payload }) => ({
    ...state,
    loading: false,
    loaded: false,
    error: { payload },
  })),
  on(getImagesByProduct, (state) => ({
    ...state,
    loading: true,
    loaded: false,
    error: null,
  })),
  on(getImagesByProductSuccess, (state, action) => ({
    ...state,
    images: action.images,
    loading: false,
    loaded: true,
    error: null,
  })),
  on(getImagesByProductFailure, (state, { payload }) => ({
    ...state,
    loading: false,
    loaded: false,
    error: { payload },
  })),

  on(getImagesByTreatment, (state) => ({
    ...state,
    loading: true,
    loaded: false,
    error: null,
  })),
  on(getImagesByTreatmentSuccess, (state, action) => ({
    ...state,
    images: action.images,
    loading: false,
    loaded: true,
    error: null,
  })),
  on(getImagesByTreatmentFailure, (state, { payload }) => ({
    ...state,
    loading: false,
    loaded: false,
    error: { payload },
  })),

  on(getImageByCategory, (state) => ({
    ...state,
    loading: true,
    loaded: false,
    error: null,
  })),
  on(getImageByCategorySuccess, (state, action) => ({
    ...state,
    image: action.image,
    loading: false,
    loaded: true,
    error: null,
  })),
  on(getImageByCategoryFailure, (state, { payload }) => ({
    ...state,
    loading: false,
    loaded: false,
    error: { payload },
  })),

  on(createImage, (state) => ({
    ...state,
    loading: true,
    loaded: false,
    error: null,
  })),
  on(createImageSuccess, (state, action) => ({
    ...state,
    image: action.image,
    loading: false,
    loaded: true,
    error: null,
  })),
  on(createImageFailure, (state, { payload }) => ({
    ...state,
    loading: false,
    loaded: false,
    error: { payload },
  })),

  on(updateImage, (state) => ({
    ...state,
    loading: true,
    loaded: false,
    error: null,
  })),
  on(updateImageSuccess, (state, action) => ({
    ...state,
    image: action.image,
    loading: false,
    loaded: true,
    error: null,
  })),
  on(updateImageFailure, (state, { payload }) => ({
    ...state,
    loading: false,
    loaded: false,
    error: { payload },
  })),

  on(deleteImage, (state) => ({
    ...state,
    loading: true,
    loaded: false,
    error: null,
  })),
  on(deleteImageSuccess, (state, { imageId }) => ({
    ...state,
    images: [...state.images.filter(({ id }) => id !== imageId)],
    loading: false,
    loaded: true,
    error: null,
  })),
  on(deleteImageFailure, (state, { payload }) => ({
    ...state,
    loading: false,
    loaded: false,
    error: { payload },
  }))
);

export function imagesReducer(
  state: ImagesState | undefined,
  action: Action
): ImagesState {
  return _imagesReducer(state, action);
}
