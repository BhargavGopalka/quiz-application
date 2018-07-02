import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {RouteConstants} from '../utility/constants/routes';

export const routes: Routes = [
  {
    path: '',
    redirectTo: RouteConstants.LOGIN,
    pathMatch: 'full',

  },
  {
    path: '**',
    redirectTo: RouteConstants.HOME,
    pathMatch: 'full',
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
