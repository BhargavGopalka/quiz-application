import {Component, EventEmitter, Input, OnDestroy, OnInit, Output} from '@angular/core';
import {FormControl} from '@angular/forms';

@Component({
  selector: 'app-multiple-choice',
  templateUrl: './multiple-choice.component.html',
  styleUrls: ['./multiple-choice.component.css']
})
export class MultipleChoiceComponent implements OnInit, OnDestroy {

  // Angular variables
  @Input() quiz: any;
  @Output() multipleChoiceSelection = new EventEmitter<any>();

  // Data related variables
  selection = new FormControl();
  previousSelection = null;

  constructor() {
  }

  ngOnInit() {
    this.previousSelection = this.quiz['selectedOption'];
  }

  /* In the single option and true/false question type, getting status if particular option is previously selected */
  checkSelectedOption(option: any) {
    let isSelected = false;
    if (this.previousSelection && (this.previousSelection['optionId'] === option['optionId'])) {
      isSelected = true;
    }
    return isSelected;
  }

  ngOnDestroy() {
    this.multipleChoiceSelection.emit(this.selection.value || this.previousSelection);
  }
}
