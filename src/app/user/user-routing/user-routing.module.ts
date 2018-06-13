import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {RouteConstants} from '../../utility/constants/routes';
import {HomeComponent} from '../home/home.component';
import {AuthGuard} from '../../_guards/auth.guard';
import {QuizComponent} from '../quiz/quiz.component';

const routes: Routes = [
  {
    path: RouteConstants.HOME,
    component: HomeComponent,
    canActivate: [AuthGuard]
  },
  {
    path: RouteConstants.QUIZ,
    component: QuizComponent,
    canActivate: [AuthGuard]
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  declarations: []
})
export class UserRoutingModule {
}
