import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {AdminHomeComponent} from './admin-home/admin-home.component';
import {AdminAppRoutingModule} from './admin-app-routing/admin-app-routing.module';
import {AngularMaterialModule} from '../../../../app-user/src/app/angular-material/angular-material.module';
import { CreateQuizComponent } from './create-quiz/create-quiz.component';

@NgModule({
  imports: [
    CommonModule,
    AngularMaterialModule,
    AdminAppRoutingModule
  ],
  declarations: [AdminHomeComponent, CreateQuizComponent]
})
export class AdminModule {
}