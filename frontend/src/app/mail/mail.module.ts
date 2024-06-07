import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
import { ContactComponent } from './components/contact/contact.component';

@NgModule({
  declarations: [ContactComponent],
  imports: [CommonModule, SharedModule, ReactiveFormsModule],
  exports: [ContactComponent],
})
export class MailModule {
  constructor() {
    console.log('MailModule loaded.');
  }
}
