import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { IconCalendarComponent } from './icon-calendar/icon-calendar.component';
import { IconCartComponent } from './icon-cart/icon-cart.component';
import { IconLoginComponent } from './icon-login/icon-login.component';
import { IconLogoutComponent } from './icon-logout/icon-logout.component';
import { IconRegisterComponent } from './icon-register/icon-register.component';
import { IconShopComponent } from './icon-shop/icon-shop.component';
import { IconTreatmentComponent } from './icon-treatment/icon-treatment.component';
import { IconUserComponent } from './icon-user/icon-user.component';
import { IconRoutine1Component } from './routine/icon-routine-1/icon-routine-1.component';
import { IconRoutine10Component } from './routine/icon-routine-10/icon-routine-10.component';
import { IconRoutine2Component } from './routine/icon-routine-2/icon-routine-2.component';
import { IconRoutine3Component } from './routine/icon-routine-3/icon-routine-3.component';
import { IconRoutine4Component } from './routine/icon-routine-4/icon-routine-4.component';
import { IconRoutine5Component } from './routine/icon-routine-5/icon-routine-5.component';
import { IconRoutine6Component } from './routine/icon-routine-6/icon-routine-6.component';
import { IconRoutine7Component } from './routine/icon-routine-7/icon-routine-7.component';
import { IconRoutine8Component } from './routine/icon-routine-8/icon-routine-8.component';
import { IconRoutine9Component } from './routine/icon-routine-9/icon-routine-9.component';

@NgModule({
  declarations: [
    IconTreatmentComponent,
    IconShopComponent,
    IconCalendarComponent,
    IconCartComponent,
    IconUserComponent,
    IconRegisterComponent,
    IconLoginComponent,
    IconLogoutComponent,
    IconRoutine1Component,
    IconRoutine2Component,
    IconRoutine3Component,
    IconRoutine4Component,
    IconRoutine5Component,
    IconRoutine6Component,
    IconRoutine7Component,
    IconRoutine8Component,
    IconRoutine9Component,
    IconRoutine10Component,
  ],
  imports: [CommonModule, FontAwesomeModule],
  exports: [
    IconTreatmentComponent,
    IconShopComponent,
    IconCalendarComponent,
    IconCartComponent,
    IconUserComponent,
    IconRegisterComponent,
    IconLoginComponent,
    IconLogoutComponent,
    FontAwesomeModule,
    IconRoutine1Component,
    IconRoutine2Component,
    IconRoutine3Component,
    IconRoutine4Component,
    IconRoutine5Component,
    IconRoutine6Component,
    IconRoutine7Component,
    IconRoutine8Component,
    IconRoutine9Component,
    IconRoutine10Component,
  ],
})
export class IconsModule {}
