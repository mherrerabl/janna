import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CookiesComponent } from './components/cookies/cookies.component';
import { CreditsComponent } from './components/credits/credits.component';
import { LegalInfoComponent } from './components/legal-info/legal-info.component';
import { LegalWarningComponent } from './components/legal-warning/legal-warning.component';
import { PrivacyComponent } from './components/privacy/privacy.component';

const routes: Routes = [
  {
    path: '',
    component: LegalInfoComponent,
  },
  {
    path: 'privacidad',
    component: PrivacyComponent,
  },
  {
    path: 'cookies',
    component: CookiesComponent,
  },
  {
    path: 'aviso-legal',
    component: LegalWarningComponent,
  },
  {
    path: 'creditos',
    component: CreditsComponent,
  },
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LegalPagesRoutingModule {}
