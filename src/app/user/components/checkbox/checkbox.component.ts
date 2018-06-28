import {Component, EventEmitter, Input, OnDestroy, OnInit, Output} from '@angular/core';
import {FormControl} from '@angular/forms';

@Component({
  selector: 'app-checkbox',
  templateUrl: './checkbox.component.html',
  styleUrls: ['./checkbox.component.css']
})
export class CheckboxComponent implements OnInit, OnDestroy {

  // Angular variables
  @Input() quiz: any;
  @Output() updatedAnswerObject = new EventEmitter<any>();

  // Data related variables
  selection = new FormControl();
  multipleAnswers = [];

  constructor() {
  }

  ngOnInit() {
    this.multipleAnswers = this.quiz['selectedOption'] || [];
  }

  /* On changing answer selection */
  onChangeMultipleAnswers(event, option) {
    if (event) {
      this.multipleAnswers.push(option);
    } else {
      const index = this.multipleAnswers.findIndex(answerData => {
        return (answerData['optionId'] === option['optionId']);
      });
      if (index > -1) {
        this.multipleAnswers.splice(index, 1);
      }
    }
  }

  /* In the multi answer/checkbox question type, getting status regarding previously selected options */
  getPreviouslySelectedAnswers(option: any, quiz: any) {
    const selectedAnswersArray = quiz['selectedOption'] || [];
    let isSelected = false;
    if (selectedAnswersArray.length > 0) {
      selectedAnswersArray.filter((opt) => {
        if (opt['optionId'] === option['optionId']) {
          isSelected = true;
        }
      });
    }
    return isSelected;
  }

  ngOnDestroy() {
    const params = {
      quizObj: this.quiz['quizObj'],
      isMarked: this.quiz['isMarked'],
      selectedOption: this.multipleAnswers,
      isNotAttempted: true
    };
    this.updatedAnswerObject.emit(params);
  }
}
