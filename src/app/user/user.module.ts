import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {HomeComponent} from './home/home.component';
import {UserRoutingModule} from './user-routing/user-routing.module';
import {AngularMaterialModule} from '../angular-material/angular-material.module';
import {QuizComponent} from './quiz/quiz.component';
import {ReactiveFormsModule} from '@angular/forms';
import {ReviewComponent} from './review/review.component';
import {CountdownModule} from 'ngx-countdown';
import {BrowserModule} from '@angular/platform-browser';
import {HttpClientModule} from '@angular/common/http';

@NgModule({
  imports: [
    CommonModule,
    BrowserModule,
    AngularMaterialModule,
    ReactiveFormsModule,
    CountdownModule,
    HttpClientModule,
    UserRoutingModule
  ],
  declarations: [HomeComponent, QuizComponent, ReviewComponent]
})
export class UserModule {
}
