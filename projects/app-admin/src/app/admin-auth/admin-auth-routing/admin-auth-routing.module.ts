import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AdminRouteConstants} from '../../../../../app-user/src/app/utility/constants/routes';
import {AdminLoginComponent} from '../admin-login/admin-login.component';
import {AdminAuthGuard} from '../../_guards/admin-auth.guard';

const routes: Routes = [
  {
    path: AdminRouteConstants.ADMIN_LOGIN,
    component: AdminLoginComponent,
    canActivate: [AdminAuthGuard]
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  declarations: []
})
export class AdminAuthRoutingModule {
}
