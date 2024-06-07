import { HttpErrorResponse } from '@angular/common/http';
import { createAction, props } from '@ngrx/store';
import { MailClass } from '../models/mail.js';

export const sendMail = createAction(
  '[Contact mail] Send mail',
  props<{ mail: MailClass }>()
);
export const sendMailSuccess = createAction(
  '[Contact mail] Send mail Success',
  props<{ mail: MailClass }>()
);

export const sendMailFailure = createAction(
  '[Contact mail] Send mail Failure',
  props<{ payload: HttpErrorResponse }>()
);
