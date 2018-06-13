import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {RouteConstants} from '../../utility/constants/routes';
import {LoginComponent} from '../login/login.component';
import {AuthGuard} from '../../_guards/auth.guard';
import {RegisterComponent} from '../register/register.component';

const routes: Routes = [
  {
    path: RouteConstants.LOGIN,
    component: LoginComponent,
    canActivate: [AuthGuard]
  },
  {
    path: RouteConstants.REGISTRATION,
    component: RegisterComponent,
    canActivate: [AuthGuard]
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  declarations: []
})
export class UserAuthRoutingModule {
}
