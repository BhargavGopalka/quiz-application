import {Component, EventEmitter, Input, OnDestroy, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-multi-choice-grid',
  templateUrl: './multi-choice-grid.component.html',
  styleUrls: ['./multi-choice-grid.component.css']
})
export class MultiChoiceGridComponent implements OnInit, OnDestroy {

  // Angular variables
  @Input() quiz: any;
  @Output() updatedAnswerObject = new EventEmitter<any>();

  // Data related variables
  multiChoiceGridAnswers = [];
  previousSelection = null;

  constructor() {
  }

  ngOnInit() {
    this.previousSelection = this.quiz['selectedOption'];
    this.createMultiChoiceGridAnswerArray();
  }

  // Initialization methods
  createMultiChoiceGridAnswerArray() {
    if (!(this.previousSelection)) {
      const questions: any[] = this.quiz['quizObj']['questionArray'];
      questions.forEach((que) => {
        const params = {
          questionRow: que,
          selection: null
        };
        this.multiChoiceGridAnswers.push(params);
      });
    } else {
      this.multiChoiceGridAnswers = this.previousSelection;
    }
  }

  // Page events
  /* Multi choice grid question event - on change or on selecting any option */
  onChangeOption(quesRow: any, i: number) {
    const questionObj = this.objectWithoutProperty(quesRow, [i.toString()]);
    const params = {
      questionRow: questionObj,
      selection: quesRow[i]
    };
    const index = this.multiChoiceGridAnswers.findIndex((question) => {
      return (quesRow['questionRowId'] === question['questionRow']['questionRowId']);
    });
    this.multiChoiceGridAnswers[index] = params;
  }

  objectWithoutProperty(obj: any, keys: any[]) {
    const target = {};
    for (const i in obj) {
      if (keys.indexOf(i) >= 0) {
        continue;
      }
      if (!Object.prototype.hasOwnProperty.call(obj, i)) {
        continue;
      }
      target[i] = obj[i];
    }
    return target;
  }

  // helper
  /* In the Multi choice grid question type, getting status if particular option is previously selected */
  checkMultiChoiceGridSelectedOption(option: any, ques: any) {
    let isSelected = false;
    if (this.multiChoiceGridAnswers.length > 0) {
      this.multiChoiceGridAnswers.filter((answerData) => {
        if ((answerData['questionRow']['questionRowId'] === ques['questionRowId'])) {
          if (answerData['selection'] && (answerData['selection']['optionId'] === option['optionId'])) {
            isSelected = true;
          }
        }
      });
    }
    return isSelected;
  }

  trackByIdx(index: number, obj: any): any {
    return index;
  }

  ngOnDestroy() {
    const params = {
      quizObj: this.quiz['quizObj'],
      isMarked: this.quiz['isMarked'],
      selectedOption: this.multiChoiceGridAnswers,
      isNotAttempted: true
    };
    this.updatedAnswerObject.emit(params);
  }

}
