import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {HomeComponent} from './home/home.component';
import {UserRoutingModule} from './user-routing/user-routing.module';
import {AngularMaterialModule} from '../angular-material/angular-material.module';
import {QuizComponent} from './quiz/quiz.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {ReviewComponent} from './review/review.component';
import {CountdownModule} from 'ngx-countdown';
import {BrowserModule} from '@angular/platform-browser';
import {HttpClientModule} from '@angular/common/http';
import {UtilityModule} from '../utility/utility.module';
import {MultipleChoiceComponent} from './components/multiple-choice/multiple-choice.component';
import {CheckboxComponent} from './components/checkbox/checkbox.component';
import {DescriptiveComponent} from './components/descriptive/descriptive.component';
import {DropDownComponent} from './components/drop-down/drop-down.component';
import { LinearScaleComponent } from './components/linear-scale/linear-scale.component';
import { DateComponent } from './components/date/date.component';
import { TimeComponent } from './components/time/time.component';
import { MultiChoiceGridComponent } from './components/multi-choice-grid/multi-choice-grid.component';
import { CheckboxGridComponent } from './components/checkbox-grid/checkbox-grid.component';

@NgModule({
  imports: [
    CommonModule,
    BrowserModule,
    AngularMaterialModule,
    ReactiveFormsModule,
    CountdownModule,
    HttpClientModule,
    UtilityModule,
    FormsModule,
    UserRoutingModule
  ],
  declarations: [
    HomeComponent,
    QuizComponent,
    ReviewComponent,
    MultipleChoiceComponent,
    CheckboxComponent,
    DescriptiveComponent,
    DropDownComponent,
    LinearScaleComponent,
    DateComponent,
    TimeComponent,
    MultiChoiceGridComponent,
    CheckboxGridComponent
  ]
})
export class UserModule {
}
