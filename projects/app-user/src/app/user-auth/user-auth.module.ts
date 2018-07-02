import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {LoginComponent} from './login/login.component';
import {RegisterComponent} from './register/register.component';
import {UserAuthRoutingModule} from './user-auth-routing/user-auth-routing.module';
import {ReactiveFormsModule} from '@angular/forms';
import {AngularMaterialModule} from '../angular-material/angular-material.module';
import {RouterModule} from '@angular/router';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    AngularMaterialModule,
    RouterModule,
    UserAuthRoutingModule
  ],
  declarations: [LoginComponent, RegisterComponent]
})
export class UserAuthModule {
}
