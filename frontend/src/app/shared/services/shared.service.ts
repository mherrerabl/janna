import { DOCUMENT } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { throwError } from 'rxjs';

export interface ResponseError {
  statusCode: number;
  message: string;
  messageDetail: string;
  code: string;
  timestamp: string;
  path: string;
  method: string;
}

@Injectable({
  providedIn: 'root',
})
export class SharedService {
  constructor(@Inject(DOCUMENT) private document: Document) {}

  async notification(
    el: string,
    validRequest: boolean,
    error?: ResponseError,
    message?: string
  ): Promise<void> {
    const element = this.document.getElementById(el);
    if (element) {
      if (validRequest) {
        element.textContent =
          message == undefined
            ? 'El formulario se ha enviado correctamente'
            : message;
      } else {
        if (error?.messageDetail) {
          element.textContent =
            'Error: ' +
            error?.message +
            '. Detalles: ' +
            error?.messageDetail +
            '. Status code: ' +
            error?.statusCode;
        } else {
          element.textContent =
            'Error: ' + error?.message + '. Status code: ' + error?.statusCode;
        }
      }
    }
  }

  errorLog(error: ResponseError): void {
    console.error('path:', error.path);
    console.error('timestamp:', error.timestamp);
    console.error('message:', error.message);
    console.error('messageDetail:', error.messageDetail);
    console.error('statusCode:', error.statusCode);
  }

  handleError(error: HttpErrorResponse) {
    return throwError(() => error);
  }
}
