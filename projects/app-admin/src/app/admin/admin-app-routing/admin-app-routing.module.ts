import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AdminRouteConstants} from '../../../../../app-user/src/app/utility/constants/routes';
import {AdminHomeComponent} from '../admin-home/admin-home.component';
import {AdminAuthGuard} from '../../_guards/admin-auth.guard';
import {CreateQuizComponent} from '../create-quiz/create-quiz.component';

const routes: Routes = [
  {
    path: AdminRouteConstants.ADMIN_HOME,
    component: AdminHomeComponent,
    canActivate: [AdminAuthGuard]
  },
  {
    path: AdminRouteConstants.ADMIN_CREATE_QUIZ,
    component: CreateQuizComponent,
    canActivate: [AdminAuthGuard]
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  declarations: []
})
export class AdminAppRoutingModule {
}
