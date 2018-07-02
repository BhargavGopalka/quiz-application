import {Component, EventEmitter, Input, OnDestroy, OnInit, Output} from '@angular/core';
import {FormControl} from '@angular/forms';

@Component({
  selector: 'app-linear-scale',
  templateUrl: './linear-scale.component.html',
  styleUrls: ['./linear-scale.component.css']
})
export class LinearScaleComponent implements OnInit, OnDestroy {

  // Angular variables
  @Input() quiz: any;
  @Output() updatedAnswerObject = new EventEmitter<any>();

  // Data related variables
  numberArray = [];
  selectedScale = new FormControl();
  previousSelection = null;

  constructor() {
  }

  ngOnInit() {
    this.previousSelection = this.quiz['selectedOption'];
    this.createScaleArray();
  }

  createScaleArray() {
    const min = this.quiz['quizObj']['min_scale'];
    const max = this.quiz['quizObj']['max_scale'];
    for (let i = min; i <= max; i++) {
      this.numberArray.push(i);
    }
    if (this.previousSelection && this.previousSelection['answer']) {
      this.selectedScale.setValue(this.previousSelection['answer']);
    }
  }

  ngOnDestroy() {
    let selectedAnswer: any;
    if (this.selectedScale.value) {
      selectedAnswer = {
        answer: this.selectedScale.value
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
