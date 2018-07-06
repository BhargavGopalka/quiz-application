import {Component, OnInit} from '@angular/core';
import {QuestionType, questionTypeArray} from '../../../../../app-user/src/app/utility/constants/base-constants';
import {FormArray, FormControl, FormGroup} from '@angular/forms';

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

  constructor() {
  }

  ngOnInit() {
    this.createQuestionForm();
  }

  createQuestionForm() {
    this.questionForm = new FormGroup({
      questions: new FormArray([this.newQuestion()])
    });
  }

  newQuestion(): FormGroup {
    return new FormGroup({
      question: new FormControl(),
      questionType: new FormControl(QuestionType.MULTIPLE_CHOICE)
    });
  }

  // Page events
  addQuestion(): void {
    const control = <FormArray>this.questionForm.controls['questions'];
    control.push(this.newQuestion());
  }

  removeQuestion(index: number) {
    const control = <FormArray>this.questionForm.controls['questions'];
    control.removeAt(index);
  }

  onSelectionChange(event, isSelect, index) {
    if (isSelect) {
      const questionInput = this.getQuestionsArray()[index].value['question'];
      const params = {
        question: questionInput,
        questionType: event.value
      };
      this.getQuestionsArray()[index].setValue(params);
    }
  }

  // helper
  getQuestionsArray() {
    return (this.questionForm.controls['questions'] as FormArray).controls;
  }
}
