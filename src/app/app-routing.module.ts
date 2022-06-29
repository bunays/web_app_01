import { NgModule } from '@angular/core';
import { Routes, RouterModule, CanActivate } from '@angular/router';
import { LayoutComponent } from './layouts/layout/layout.component';



const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    loadChildren: () =>
      import('./pages/pages.module').then((m) => m.PagesModule),
      /*canActivate: [AuthGuardService]*/
  },
  // {
  //   path: "",
  //   loadChildren: () => import("./account/account.module").then((m) => m.AccountModule),
  // },
  // {
  //   path: "account",
  //   loadChildren: () => import("./account/account.module").then((m) => m.AccountModule),
  // },
  // {
  //   path: "",
  //   loadChildren: () => import('./pages/pages.module').then(m => m.PagesModule)
  // }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {scrollPositionRestoration: 'enabled'})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
