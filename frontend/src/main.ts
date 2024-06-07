/// <reference types="@angular/localize" />

import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { provideHttpClient, withFetch } from '@angular/common/http';
import { enableProdMode, isDevMode } from '@angular/core';
import { register as registerSwiperElement } from 'swiper/element/bundle';
import { AppModule } from './app/app.module';

registerSwiperElement();

if (!isDevMode()) {
  enableProdMode();
}

provideHttpClient(withFetch());
platformBrowserDynamic()
  .bootstrapModule(AppModule)
  .then(() => {})
  .catch((err) => console.error(err));
