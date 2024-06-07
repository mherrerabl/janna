import { CommonModule, registerLocaleData } from '@angular/common';
import { CUSTOM_ELEMENTS_SCHEMA, LOCALE_ID, NgModule } from '@angular/core';

import localeEs from '@angular/common/locales/es';
import { ReactiveFormsModule } from '@angular/forms';
import { MAT_DATE_LOCALE, MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { NgxPaginationModule } from 'ngx-pagination';
import { AppointmentFormComponent } from './components/appointment-form/appointment-form.component';
import { BadgeComponent } from './components/badge/badge.component';
import { BreadcrumbsComponent } from './components/breadcrumbs/breadcrumbs.component';
import { ButtonComponent } from './components/button/button.component';
import { CardSimpleComponent } from './components/card-simple/card-simple.component';
import { CardComponent } from './components/card/card.component';
import { CartDropdownComponent } from './components/cart-dropdown/cart-dropdown.component';
import { CartComponent } from './components/cart/cart.component';
import { ContactLinksComponent } from './components/contact-links/contact-links.component';
import { CounterComponent } from './components/counter/counter.component';
import { DropdownComponent } from './components/dropdown/dropdown.component';
import { FooterComponent } from './components/footer/footer.component';
import { HeaderComponent } from './components/header/header.component';
import { InputComponent } from './components/input/input.component';
import { LocationComponent } from './components/location/location.component';
import { LogoComponent } from './components/logo/logo.component';
import { MenuFooterComponent } from './components/menu-footer/menu-footer.component';
import { MenuComponent } from './components/menu/menu.component';
import { RowDetailComponent } from './components/row-detail/row-detail.component';
import { TableComponent } from './components/table/table.component';
import { IconsModule } from './icons/icons.module';
import { SanitizeHtmlPipe } from './pipes/sanitize-html.pipe';
import { ShortDescriptionPipe } from './pipes/short-description.pipe';
import { SharedRoutingModule } from './shared-routing.module';
registerLocaleData(localeEs, 'es');

@NgModule({
  declarations: [
    BadgeComponent,
    ButtonComponent,
    BreadcrumbsComponent,
    CardComponent,
    CardSimpleComponent,
    ShortDescriptionPipe,
    InputComponent,
    TableComponent,
    RowDetailComponent,
    CartComponent,
    CartDropdownComponent,
    CounterComponent,
    MenuComponent,
    MenuFooterComponent,
    FooterComponent,
    LogoComponent,
    LocationComponent,
    ContactLinksComponent,
    HeaderComponent,
    SanitizeHtmlPipe,
    DropdownComponent,
    AppointmentFormComponent,
  ],
  imports: [
    CommonModule,
    SharedRoutingModule,
    NgxPaginationModule,
    ReactiveFormsModule,
    IconsModule,
    MatDatepickerModule,
    MatNativeDateModule,
  ],
  exports: [
    BadgeComponent,
    ButtonComponent,
    BreadcrumbsComponent,
    NgxPaginationModule,
    CardComponent,
    CardSimpleComponent,
    InputComponent,
    ShortDescriptionPipe,
    TableComponent,
    RowDetailComponent,
    CartComponent,
    CartDropdownComponent,
    CounterComponent,
    MenuComponent,
    IconsModule,
    MenuFooterComponent,
    FooterComponent,
    LogoComponent,
    LocationComponent,
    ContactLinksComponent,
    HeaderComponent,
    DropdownComponent,
    AppointmentFormComponent,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  providers: [
    { provide: MAT_DATE_LOCALE, useValue: 'es-ES' },
    { provide: LOCALE_ID, useValue: 'es_ES' },
  ],
})
export class SharedModule {}
