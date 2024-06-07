import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { catchError, exhaustMap, finalize, map, of } from 'rxjs';
import { SharedService } from '../../shared/services/shared.service';
import { isLoading } from '../../spinner/actions/spinner.actions';
import { ImageService } from '../services/image.service';
import * as ImageActions from './../actions';

@Injectable()
export class ImageEffects {
  private responseOK: boolean;
  private errorResponse: any;

  constructor(
    private actions$: Actions,
    private imageService: ImageService,
    private sharedService: SharedService,
    private router: Router,
    private store: Store
  ) {
    this.responseOK = false;
  }

  getImages$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ImageActions.getAllImages),
      exhaustMap(() =>
        this.imageService.getImages().pipe(
          map((images) => {
            this.store.dispatch(isLoading({ status: false }));
            return ImageActions.getAllImagesSuccess({
              images: images,
            });
          }),
          catchError((error) => {
            return of(ImageActions.getAllImagesFailure({ payload: error }));
          })
        )
      )
    )
  );

  getImageById$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ImageActions.getImageById),
      exhaustMap(({ imageId }) =>
        this.imageService.getImageById(imageId).pipe(
          map((image) => {
            this.store.dispatch(isLoading({ status: false }));
            return ImageActions.getImageByIdSuccess({
              image: image,
            });
          }),
          catchError((error) => {
            return of(ImageActions.getImageByIdFailure({ payload: error }));
          })
        )
      )
    )
  );

  getImageByIdFailure$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(ImageActions.getImageByIdFailure),
        map((error) => {
          this.store.dispatch(isLoading({ status: false }));
          this.errorResponse = error.payload.error;
          this.sharedService.errorLog(error.payload.error);
        })
      ),
    { dispatch: false }
  );

  getImagesFailure$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(ImageActions.getAllImagesFailure),
        map((error) => {
          this.store.dispatch(isLoading({ status: false }));
          this.responseOK = false;
          this.errorResponse = error.payload.error;
          this.sharedService.errorLog(error.payload.error);
        })
      ),
    { dispatch: false }
  );

  getImagesByProduct$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ImageActions.getImagesByProduct),
      exhaustMap(({ productId }) =>
        this.imageService.getImagesByProduct(productId).pipe(
          map((images) => {
            this.store.dispatch(isLoading({ status: false }));
            return ImageActions.getImagesByProductSuccess({
              images: images,
            });
          }),
          catchError((error) => {
            return of(
              ImageActions.getImagesByProductFailure({
                payload: error,
              })
            );
          })
        )
      )
    )
  );

  getImagesByProductFailure$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(ImageActions.getImagesByProductFailure),
        map((error) => {
          this.store.dispatch(isLoading({ status: false }));
          this.errorResponse = error.payload.error;
          this.sharedService.errorLog(error.payload.error);
        })
      ),
    { dispatch: false }
  );

  getImagesByTreatment$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ImageActions.getImagesByTreatment),
      exhaustMap(({ treatmentId }) =>
        this.imageService.getImagesByTreatment(treatmentId).pipe(
          map((images) => {
            this.store.dispatch(isLoading({ status: false }));
            return ImageActions.getImagesByTreatmentSuccess({
              images: images,
            });
          }),
          catchError((error) => {
            return of(
              ImageActions.getImagesByTreatmentFailure({
                payload: error,
              })
            );
          })
        )
      )
    )
  );

  getImagesByTreatmentFailure$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(ImageActions.getImagesByTreatmentFailure),
        map((error) => {
          this.store.dispatch(isLoading({ status: false }));
          this.errorResponse = error.payload.error;
          this.sharedService.errorLog(error.payload.error);
        })
      ),
    { dispatch: false }
  );

  getImagesByCategory$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ImageActions.getImageByCategory),
      exhaustMap(({ categoryId }) =>
        this.imageService.getImageByCategory(categoryId).pipe(
          map((image) => {
            this.store.dispatch(isLoading({ status: false }));
            return ImageActions.getImageByCategorySuccess({
              image: image,
            });
          }),
          catchError((error) => {
            return of(
              ImageActions.getImageByCategoryFailure({
                payload: error,
              })
            );
          })
        )
      )
    )
  );

  getImagesByCategoryFailure$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(ImageActions.getImageByCategoryFailure),
        map((error) => {
          this.store.dispatch(isLoading({ status: false }));
          this.errorResponse = error.payload.error;
          this.sharedService.errorLog(error.payload.error);
        })
      ),
    { dispatch: false }
  );

  createImage$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ImageActions.createImage),
      exhaustMap(({ image }) =>
        this.imageService.createImage(image).pipe(
          map((image) => {
            return ImageActions.createImageSuccess({
              image: image,
            });
          }),
          catchError((error) => {
            return of(ImageActions.createImageFailure({ payload: error }));
          }),
          finalize(async () => {
            setTimeout(() => {
              this.sharedService.notification(
                'imageFeedback',
                this.responseOK,
                this.errorResponse,
                'Se ha creado una nueva imagen.'
              );
            }, 100);
          })
        )
      )
    )
  );

  createImageSuccess$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(ImageActions.createImageSuccess),
        map(() => {
          this.store.dispatch(isLoading({ status: false }));
          this.responseOK = true;
        })
      ),
    { dispatch: false }
  );

  createImageFailure$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(ImageActions.createImageFailure),
        map((error) => {
          this.store.dispatch(isLoading({ status: false }));
          this.responseOK = false;
          this.errorResponse = error.payload.error;
          this.sharedService.errorLog(error.payload.error);
        })
      ),
    { dispatch: false }
  );

  updateImage$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ImageActions.updateImage),
      exhaustMap(({ imageId, image }) =>
        this.imageService.updateImage(imageId, image).pipe(
          map((image) => {
            return ImageActions.updateImageSuccess({
              image: image,
            });
          }),
          catchError((error) => {
            return of(ImageActions.updateImageFailure({ payload: error }));
          }),
          finalize(async () => {
            setTimeout(() => {
              this.sharedService.notification(
                'imageFeedback',
                this.responseOK,
                this.errorResponse,
                'Se ha actualizado la imagen.'
              );
            }, 100);
          })
        )
      )
    )
  );

  updateImageSuccess$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(ImageActions.updateImageSuccess),
        map(() => {
          this.store.dispatch(isLoading({ status: false }));
          this.responseOK = true;
        })
      ),
    { dispatch: false }
  );

  updateImageFailure$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(ImageActions.updateImageFailure),
        map((error) => {
          this.store.dispatch(isLoading({ status: false }));
          this.responseOK = false;
          this.errorResponse = error.payload.error;
          this.sharedService.errorLog(error.payload.error);
        })
      ),
    { dispatch: false }
  );

  deleteImage$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ImageActions.deleteImage),
      exhaustMap(({ imageId }) =>
        this.imageService.deleteImage(imageId).pipe(
          map(() => {
            this.store.dispatch(isLoading({ status: false }));
            return ImageActions.deleteImageSuccess({
              imageId: imageId,
            });
          }),
          catchError((error) => {
            return of(ImageActions.deleteImageFailure({ payload: error }));
          })
        )
      )
    )
  );

  deleteImageFailure$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(ImageActions.deleteImageFailure),
        map((error) => {
          this.store.dispatch(isLoading({ status: false }));
          this.errorResponse = error.payload.error;
          this.sharedService.errorLog(error.payload.error);
        })
      ),
    { dispatch: false }
  );
}
