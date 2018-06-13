import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {LoginComponent} from './login/login.component';
import {RegisterComponent} from './register/register.component';
import {UserAuthRoutingModule} from './user-auth-routing/user-auth-routing.module';

@NgModule({
  imports: [
    CommonModule,
    UserAuthRoutingModule
  ],
  declarations: [LoginComponent, RegisterComponent]
})
export class UserAuthModule {
}
