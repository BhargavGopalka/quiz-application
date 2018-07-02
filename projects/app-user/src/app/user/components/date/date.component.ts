import {Component, EventEmitter, Input, OnDestroy, OnInit, Output} from '@angular/core';
import {FormControl} from '@angular/forms';

@Component({
  selector: 'app-date',
  templateUrl: './date.component.html',
  styleUrls: ['./date.component.css']
})
export class DateComponent implements OnInit, OnDestroy {

  // Angular variables
  @Input() quiz: any;
  @Output() updatedAnswerObject = new EventEmitter<any>();

  // Data related variables
  selectedDate = new FormControl();
  previousSelection = null;

  constructor() {
  }

  ngOnInit() {
    this.previousSelection = this.quiz['selectedOption'];
    if (this.previousSelection && this.previousSelection['answer']) {
      this.selectedDate.setValue(this.previousSelection['answer']);
    }
  }

  ngOnDestroy() {
    let selectedAnswer: any;
    if (this.selectedDate.value) {
      selectedAnswer = {
        answer: this.selectedDate.value
      };
    } else {
      selectedAnswer = null;
    }
    const params = {
      quizObj: this.quiz['quizObj'],
      isMarked: this.quiz['isMarked'],
      selectedOption: selectedAnswer,
      isNotAttempted: true
    };
    this.updatedAnswerObject.emit(params);
  }

}
