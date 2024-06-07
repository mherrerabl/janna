import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { SharedModule } from '../shared/shared.module';
import { CookiesComponent } from './components/cookies/cookies.component';
import { CreditsComponent } from './components/credits/credits.component';
import { LegalWarningComponent } from './components/legal-warning/legal-warning.component';
import { PrivacyComponent } from './components/privacy/privacy.component';
import { LegalPagesRoutingModule } from './legal-pages-routing.module';
import { LegalInfoComponent } from './components/legal-info/legal-info.component';

@NgModule({
  declarations: [
    PrivacyComponent,
    CreditsComponent,
    LegalWarningComponent,
    CookiesComponent,
    LegalInfoComponent,
  ],
  imports: [CommonModule, LegalPagesRoutingModule, SharedModule],
})
export class LegalPagesModule {
  constructor() {
    console.log('LegalPagesModule');
  }
}
