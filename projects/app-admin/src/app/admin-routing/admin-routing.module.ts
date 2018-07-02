import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AdminRouteConstants} from '../../../../app-user/src/app/utility/constants/routes';

export const routes: Routes = [
  {
    path: '',
    redirectTo: AdminRouteConstants.ADMIN_LOGIN,
    pathMatch: 'full',
  },
  {
    path: '**',
    redirectTo: AdminRouteConstants.ADMIN_HOME,
    pathMatch: 'full',
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class AdminRoutingModule {
}
