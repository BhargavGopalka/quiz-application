import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {HomeComponent} from './home/home.component';
import {UserRoutingModule} from './user-routing/user-routing.module';
import {AngularMaterialModule} from '../angular-material/angular-material.module';
import { QuizComponent } from './quiz/quiz.component';

@NgModule({
  imports: [
    CommonModule,
    AngularMaterialModule,
    UserRoutingModule
  ],
  declarations: [HomeComponent, QuizComponent]
})
export class UserModule {
}
