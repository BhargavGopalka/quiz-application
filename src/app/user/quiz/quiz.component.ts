import {Component, OnInit} from '@angular/core';
import {SharedService} from '../../utility/shared-services/shared.service';
import {Router} from '@angular/router';
import {RouteConstants} from '../../utility/constants/routes';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs/index';
import {QuestionType} from '../../utility/constants/base-constants';

@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.css']
})
export class QuizComponent implements OnInit {

  // Constant variables
  questionType = QuestionType;

  // Data related variable
  userData: any;
  quizList: any[];
  singleQuestion = [];
  multiChoiceGridAnswers = [];
  checkboxGridAnswers = [];
  answersArray = [];
  isLessTimeLeft = false;
  finishQuizButton = 'primary';
  previousSelection = null;

  constructor(private _sharedService: SharedService,
              private _router: Router,
              private _http: HttpClient) {
  }

  ngOnInit() {
    this.userData = this._sharedService.getUserData();
    this.getQuizList();
  }

  // Initialization methods
  /* Getting quiz questions json data */
  getJsonData(): Observable<any> {
    return this._http.get('./assets/quiz-questions.json');
  }

  getQuizList() {
    this.getJsonData().subscribe((response) => {
      this.handleQuizListResponse(response);
    });
  }

  handleQuizListResponse(response: any) {
    this.quizList = response['quiz'];
    this.quizList.forEach((quizQuestions) => {
      const params = {
        quizObj: quizQuestions,
        isMarked: false,
        selectedOption: null,
        isNotAttempted: false
      };
      this.answersArray.push(params);
    });
    this.getParticularQuestion(0);
  }

  /* Getting requested question from list based on question number */
  getParticularQuestion(questionNumber: number) {
    this.singleQuestion = this.answersArray.slice(questionNumber, questionNumber + 1);
  }

  // Page events
  getQuestions(questionNumber: number, quiz = {}) {
    this.finishQuizButton = (questionNumber === (this.quizList.length - 1)) ? 'warn' : 'primary';

    /* To check if quiz isn't empty and is Object */
    if ((quiz.constructor === Object) && (Object.keys(quiz).length !== 0)) {
      this.updateAnswerArray(quiz);
    }

    this.multiChoiceGridAnswers = [];
    this.checkboxGridAnswers = [];
    /* Getting upcoming question data or if quiz is complete - redirect to review page */
    if (this.quizList.length === questionNumber) {
      this.onFinishQuiz();
    } else {
      this.getParticularQuestion(questionNumber);
      this.previousSelection = this.singleQuestion[0]['selectedOption'];

      if (this.singleQuestion[0]['quizObj']['questionType'] === QuestionType.MULTI_CHOICE_GRID) {
        if (!(this.previousSelection)) {
          const questions: any[] = this.singleQuestion[0]['quizObj']['questionArray'];
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

      if (this.singleQuestion[0]['quizObj']['questionType'] === QuestionType.CHECKBOX_GRID) {
        if (!(this.previousSelection)) {
          const questions: any[] = this.singleQuestion[0]['quizObj']['questionArray'];
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
    }
  }

  /* Updating answerArray before getting requested question */
  updateAnswerArray(quiz: any) {
    let selectedAnswer: any;
    if (quiz['quizObj']['questionType'] === QuestionType.MULTI_CHOICE_GRID) {
      selectedAnswer = this.multiChoiceGridAnswers;
    } else if (quiz['quizObj']['questionType'] === QuestionType.CHECKBOX_GRID) {
      selectedAnswer = this.checkboxGridAnswers;
    }

    const params = {
      quizObj: quiz['quizObj'],
      isMarked: quiz['isMarked'],
      selectedOption: selectedAnswer,
      isNotAttempted: true
    };
    this.onUpdatingAnswerArray(params);
  }

  onUpdatingAnswerArray(value: any) {
    const index = this.answersArray.findIndex(answerData => {
      return (answerData['quizObj']['questionId'] === value['quizObj']['questionId']);
    });
    if (index !== -1) {
      this.answersArray[index] = value;
    }
  }

  onFinishQuiz() {
    this._sharedService.setAnswerArray(this.answersArray);
    this._router.navigate(['/' + RouteConstants.REVIEW]);
  }

  onChangeMarkedForReviewStatus(quiz, event) {
    quiz.isMarked = event.checked;
  }

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

  /* Getting status if user has selected any answer for this particular question */
  getAnswerStatus(quiz: any) {
    let isAnswered = false;
    if ((quiz['quizObj']['questionType'] === QuestionType.TRUE_FALSE) ||
      (quiz['quizObj']['questionType'] === QuestionType.MULTIPLE_CHOICE) ||
      (quiz['quizObj']['questionType'] === QuestionType.DESCRIPTIVE) ||
      (quiz['quizObj']['questionType'] === QuestionType.DROP_DOWN) ||
      (quiz['quizObj']['questionType'] === QuestionType.LINEAR_SCALE) ||
      (quiz['quizObj']['questionType'] === QuestionType.DATE) ||
      (quiz['quizObj']['questionType'] === QuestionType.TIME)) {
      isAnswered = !!(quiz['selectedOption']);
    } else if ((quiz['quizObj']['questionType'] === QuestionType.MULTIPLE_ANSWER_SELECTION)) {
      if (quiz['selectedOption'] && quiz['selectedOption']['length'] > 0) {
        isAnswered = true;
      }
    } else if ((quiz['quizObj']['questionType'] === QuestionType.MULTI_CHOICE_GRID)) {
      const selectedOptions = quiz['selectedOption'];
      if (selectedOptions && selectedOptions['length'] > 0) {
        selectedOptions.forEach((answer) => {
          if (answer['selection']) {
            isAnswered = true;
          }
        });
      }
    } else if ((quiz['quizObj']['questionType'] === QuestionType.CHECKBOX_GRID)) {
      const selectedOptions = quiz['selectedOption'] || [];
      if (selectedOptions['length'] > 0) {
        selectedOptions.forEach((answer) => {
          const selectedAnswersArray = answer['selection'] || [];
          if (selectedAnswersArray['length'] > 0) {
            isAnswered = true;
          }
        });
      }
    }
    return isAnswered;
  }

  /* Getting status if user has attempted the question but not answer it */
  getNotAnswerStatus(quiz: any) {
    let isNotAnswered = false;
    if (quiz['isNotAttempted']) {
      if ((quiz['quizObj']['questionType'] === QuestionType.TRUE_FALSE) ||
        (quiz['quizObj']['questionType'] === QuestionType.MULTIPLE_CHOICE) ||
        (quiz['quizObj']['questionType'] === QuestionType.DESCRIPTIVE) ||
        (quiz['quizObj']['questionType'] === QuestionType.DROP_DOWN) ||
        (quiz['quizObj']['questionType'] === QuestionType.LINEAR_SCALE) ||
        (quiz['quizObj']['questionType'] === QuestionType.DATE) ||
        (quiz['quizObj']['questionType'] === QuestionType.TIME)) {
        isNotAnswered = !(quiz['selectedOption']);
      } else if ((quiz['quizObj']['questionType'] === QuestionType.MULTIPLE_ANSWER_SELECTION)) {
        if (quiz['selectedOption'] && quiz['selectedOption']['length'] === 0) {
          isNotAnswered = true;
        }
      } else if ((quiz['quizObj']['questionType'] === QuestionType.MULTI_CHOICE_GRID)) {
        const selectedOptions = quiz['selectedOption'];
        let internalIsAnswered = false;
        if (selectedOptions && selectedOptions['length'] > 0) {
          selectedOptions.forEach((answer) => {
            if (answer['selection']) {
              internalIsAnswered = true;
            }
          });
        }
        isNotAnswered = !internalIsAnswered;
      } else if ((quiz['quizObj']['questionType'] === QuestionType.CHECKBOX_GRID)) {
        const selectedOptions = quiz['selectedOption'] || [];
        let internalIsAnswered = false;
        if (selectedOptions['length'] > 0) {
          selectedOptions.forEach((answer) => {
            const selectedAnswerArray = answer['selection'] || [];
            if (selectedAnswerArray['length'] > 0) {
              internalIsAnswered = true;
            }
          });
        }
        isNotAnswered = !internalIsAnswered;
      }
    }
    return isNotAnswered;
  }

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

  trackByIdx(index: number, obj: any): any {
    return index;
  }

  onNotify() {
    this.isLessTimeLeft = true;
  }

  onLogout() {
    this._sharedService.logout();
  }

}
