import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Error404Component } from './error-pages/components/error404/error404.component';
import { LoginGuard } from './shared/guards/login.guard';

const routes: Routes = [
  {
    path: '',
    loadChildren: () =>
      import('./home/home.module').then((mod) => mod.HomeModule),
  },

  {
    path: 'tratamientos',
    loadChildren: () =>
      import('./treatments/treatments.module').then(
        (mod) => mod.TreatmentsModule
      ),
  },
  {
    path: 'tienda',
    loadChildren: () =>
      import('./products/products.module').then((mod) => mod.ProductsModule),
  },
  {
    path: 'agenda',
    loadChildren: () =>
      import('./appointments/appointments.module').then(
        (mod) => mod.AppointmentsModule
      ),
  },
  {
    path: 'perfil',
    loadChildren: () =>
      import('./profile-user/profile-user.module').then(
        (mod) => mod.ProfileUserModule
      ),
    canActivate: [LoginGuard],
  },
  {
    path: 'admin',
    loadChildren: () =>
      import('./profile-admin/profile-admin.module').then(
        (mod) => mod.ProfileAdminModule
      ),
    canActivate: [LoginGuard],
  },
  {
    path: 'checkout',
    loadChildren: () =>
      import('./checkout/checkout.module').then((mod) => mod.CheckoutModule),
  },
  {
    path: 'area-legal',
    loadChildren: () =>
      import('./legal-pages/legal-pages.module').then(
        (mod) => mod.LegalPagesModule
      ),
  },
  {
    path: '**',
    component: Error404Component,
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { scrollPositionRestoration: 'enabled' }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
