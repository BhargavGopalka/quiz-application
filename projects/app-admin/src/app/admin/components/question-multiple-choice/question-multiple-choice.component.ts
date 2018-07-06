import {Component, OnInit} from '@angular/core';
import {FormArray, FormControl, FormGroup} from '@angular/forms';

@Component({
  selector: 'app-admin-question-multiple-choice',
  templateUrl: './question-multiple-choice.component.html',
  styleUrls: ['./question-multiple-choice.component.css']
})
export class QuestionMultipleChoiceComponent implements OnInit {

  // Form related variables
  optionForm: FormGroup;

  constructor() {
  }

  ngOnInit() {
    this.createOptionForm();
  }

  // Initialization Methods
  createOptionForm() {
    this.optionForm = new FormGroup({
      options: new FormArray([this.newOptions()])
    });
  }

  newOptions(): FormGroup {
    return new FormGroup({
      option: new FormControl(),
      isAnswer: new FormControl(false)
    });
  }

  // Page events
  addOption(): void {
    const control = <FormArray>this.optionForm.controls['options'];
    control.push(this.newOptions());
  }

  removeOption(index: number) {
    const control = <FormArray>this.optionForm.controls['options'];
    control.removeAt(index);
  }

  // helper
  getOptionsArray() {
    return (this.optionForm.controls['options'] as FormArray).controls;
  }
}
