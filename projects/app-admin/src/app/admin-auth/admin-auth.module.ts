import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {AdminLoginComponent} from './admin-login/admin-login.component';
import {AdminAuthRoutingModule} from './admin-auth-routing/admin-auth-routing.module';
import {ReactiveFormsModule} from '@angular/forms';
import {AngularMaterialModule} from '../../../../app-user/src/app/angular-material/angular-material.module';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    AngularMaterialModule,
    AdminAuthRoutingModule
  ],
  declarations: [AdminLoginComponent]
})
export class AdminAuthModule {
}
