import {Component, OnInit} from '@angular/core';
import {QuestionType, questionTypeArray} from '../../../../../app-user/src/app/utility/constants/base-constants';
import {FormArray, FormGroup} from "@angular/forms";

@Component({
  selector: 'app-admin-create-quiz',
  templateUrl: './create-quiz.component.html',
  styleUrls: ['./create-quiz.component.css']
})
export class CreateQuizComponent implements OnInit {

  // Form related variables
  questionForm: FormGroup;

  // Data related variables
  queType = QuestionType;
  questionTypeList = questionTypeArray;
  selectedQuestionType = QuestionType.MULTIPLE_CHOICE;

  constructor() {
  }

  ngOnInit() {
    this.createQuestionForm();
  }

  createQuestionForm() {
    this.questionForm = new FormGroup({
      questions: new FormArray([])
    });
    this.addQuestion();
  }

  addQuestion() {
  }
}
