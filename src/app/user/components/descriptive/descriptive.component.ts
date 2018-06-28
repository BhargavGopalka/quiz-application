import {Component, EventEmitter, Input, OnDestroy, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-descriptive',
  templateUrl: './descriptive.component.html',
  styleUrls: ['./descriptive.component.css']
})
export class DescriptiveComponent implements OnInit, OnDestroy {

  // Angular variables
  @Input() quiz: any;
  @Output() updatedAnswerObject = new EventEmitter<any>();

  // Data related variables
  textAnswer = '';
  previousSelection = null;

  constructor() {
  }

  ngOnInit() {
    this.previousSelection = this.quiz['selectedOption'];
    this.textAnswer = (this.previousSelection && this.previousSelection['answer'])
      ? this.previousSelection['answer'] : '';
  }

  ngOnDestroy() {
    let selectedAnswer: any;
    if (this.textAnswer) {
      selectedAnswer = {
        answer: this.textAnswer
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
