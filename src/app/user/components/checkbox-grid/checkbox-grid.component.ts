import {Component, EventEmitter, Input, OnDestroy, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-checkbox-grid',
  templateUrl: './checkbox-grid.component.html',
  styleUrls: ['./checkbox-grid.component.css']
})
export class CheckboxGridComponent implements OnInit, OnDestroy {

  // Angular variables
  @Input() quiz: any;
  @Output() updatedAnswerObject = new EventEmitter<any>();

  // Data related variables
  checkboxGridAnswers = [];
  previousSelection = null;

  constructor() {
  }

  ngOnInit() {
    this.previousSelection = this.quiz['selectedOption'];
    this.createCheckboxGridAnswerArray();
  }

  // Initialization methods
  createCheckboxGridAnswerArray() {
    if (!(this.previousSelection)) {
      const questions: any[] = this.quiz['quizObj']['questionArray'];
      questions.forEach((que) => {
        const params = {
          questionRow: que,
          selection: null
        };
        this.checkboxGridAnswers.push(params);
      });
    } else {
      this.checkboxGridAnswers = this.previousSelection;
    }
  }

  // Page events
  /* Checkbox grid question event - on checking any option */
  onCheckOption(event: any, quesRow: any, option: any) {
    this.checkboxGridAnswers.filter((answerData) => {
      if (quesRow['questionRowId'] === answerData['questionRow']['questionRowId']) {
        const selection = answerData['selection'] || [];
        if (selection['length'] > 0) {
          const index = selection.findIndex((selectedAnswer) => {
            return (selectedAnswer['optionId'] === option['optionId']);
          });
          if (event && (index === -1)) {
            selection.push(option);
          } else if (!(event) && (index !== -1)) {
            selection.splice(index, 1);
          }
        } else {
          selection.push(option);
        }
        answerData['selection'] = selection;
      }
    });
  }

  // Helper
  /* In the checkbox grid question type, getting status if particular option is previously selected */
  checkCheckBoxGridSelectedOption(option: any, ques: any) {
    let isSelected = false;
    this.checkboxGridAnswers.forEach((answerData) => {
      if ((answerData['questionRow']['questionRowId'] === ques['questionRowId'])) {
        const selection = answerData['selection'] || [];
        if (selection['length'] > 0) {
          const index = selection.findIndex((optionData) => {
            return (option['optionId'] === optionData['optionId']);
          });
          if (index !== -1) {
            isSelected = true;
          }
        }
      }
    });
    return isSelected;
  }

  trackByIdx(index: number, obj: any): any {
    return index;
  }

  ngOnDestroy() {
    const params = {
      quizObj: this.quiz['quizObj'],
      isMarked: this.quiz['isMarked'],
      selectedOption: this.checkboxGridAnswers,
      isNotAttempted: true
    };
    this.updatedAnswerObject.emit(params);
  }

}
