import {Component, EventEmitter, Input, OnDestroy, OnInit, Output} from '@angular/core';
import {FormControl} from '@angular/forms';
import {AmazingTimePickerService} from 'amazing-time-picker';

@Component({
  selector: 'app-time',
  templateUrl: './time.component.html',
  styleUrls: ['./time.component.css']
})
export class TimeComponent implements OnInit, OnDestroy {

  // Angular variables
  @Input() quiz: any;
  @Output() updatedAnswerObject = new EventEmitter<any>();

  // Data related variables
  selectedTime = new FormControl();
  previousSelection = null;

  constructor(private atp: AmazingTimePickerService) {
  }

  ngOnInit() {
    this.previousSelection = this.quiz['selectedOption'];
    if (this.previousSelection && this.previousSelection['answer']) {
      this.selectedTime.setValue(this.previousSelection['answer']);
    }
  }

  openTimer() {
    const amazingTimePicker = this.atp.open();
    amazingTimePicker.afterClose().subscribe(time => {
      this.selectedTime.setValue(time);
    });
  }

  ngOnDestroy() {
    let selectedAnswer: any;
    if (this.selectedTime.value) {
      selectedAnswer = {
        answer: this.selectedTime.value
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
