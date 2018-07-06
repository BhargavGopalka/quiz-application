import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {AdminHomeComponent} from './admin-home/admin-home.component';
import {AdminAppRoutingModule} from './admin-app-routing/admin-app-routing.module';
import {AngularMaterialModule} from '../../../../app-user/src/app/angular-material/angular-material.module';
import {CreateQuizComponent} from './create-quiz/create-quiz.component';
import {QuizListComponent} from './quiz-list/quiz-list.component';
import {ReactiveFormsModule} from '@angular/forms';
import { QuestionMultipleChoiceComponent } from './components/question-multiple-choice/question-multiple-choice.component';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    AngularMaterialModule,
    AdminAppRoutingModule
  ],
  declarations: [AdminHomeComponent, CreateQuizComponent, QuizListComponent, QuestionMultipleChoiceComponent]
})
export class AdminModule {
}
