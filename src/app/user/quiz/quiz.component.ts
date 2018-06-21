import {Component, OnInit} from '@angular/core';
import {SharedService} from '../../utility/shared-services/shared.service';
import {FormControl} from '@angular/forms';
import {Router} from '@angular/router';
import {RouteConstants} from '../../utility/constants/routes';
import {HttpClient} from '@angular/common/http';
import {map} from 'rxjs/internal/operators';
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
  selectedOption = new FormControl();
  selectedDropDown = new FormControl();
  selectedScale = new FormControl();
  textAnswer = '';
  answersArray = [];
  numberArray = [];
  isLessTimeLeft = false;
  finishQuizButton = 'primary';
  multipleAnswers = [];
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
    return this._http.get('./assets/quiz-questions.json').pipe(
      map((res: any) => res)
    );
  }

  getQuizList() {
    this.getJsonData().subscribe((response) => {
      this.handleQuizListResponse(response);
    });
  }

  handleQuizListResponse(response: any) {
    this.quizList = response['quiz'];
    this.quizList.map((quizQuestions) => {
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
    if (!(Object.keys(quiz).length === 0 && quiz.constructor === Object)) {
      this.updateAnswerArray(quiz);
    }

    this.selectedOption = new FormControl();
    this.selectedDropDown = new FormControl();
    this.selectedScale = new FormControl();
    /* Getting upcoming question data or if quiz is complete - redirect to review page */
    if (this.quizList.length === questionNumber) {
      this.onFinishQuiz();
    } else {
      this.getParticularQuestion(questionNumber);
      this.previousSelection = this.singleQuestion[0]['selectedOption'];

      if (this.singleQuestion[0]['quizObj']['questionType'] === QuestionType.MULTIPLE_ANSWER_SELECTION) {
        this.multipleAnswers = this.previousSelection || [];
      } else {
        this.multipleAnswers = [];
      }

      if (this.singleQuestion[0]['quizObj']['questionType'] === QuestionType.DESCRIPTIVE) {
        this.textAnswer = (this.previousSelection && this.previousSelection['answer'])
          ? this.previousSelection['answer'] : '';
      } else {
        this.textAnswer = '';
      }

      if (this.singleQuestion[0]['quizObj']['questionType'] === QuestionType.DROP_DOWN) {
        if (this.previousSelection) {
          this.selectedDropDown.setValue(this.previousSelection);
        }
      }

      if (this.singleQuestion[0]['quizObj']['questionType'] === QuestionType.LINEAR_SCALE) {
        this.numberArray = [];
        const min = this.singleQuestion[0]['quizObj']['min_scale'];
        const max = this.singleQuestion[0]['quizObj']['max_scale'];
        for (let i = min; i <= max; i++) {
          this.numberArray.push(i);
        }
        if (this.previousSelection && this.previousSelection['answer']) {
          this.selectedScale.setValue(this.previousSelection['answer']);
        }
      }

    }
  }

  /* Updating answerArray before getting requested question */
  updateAnswerArray(quiz: any) {
    let selectedAnswer: any;
    if ((quiz['quizObj']['questionType'] === QuestionType.MULTIPLE_CHOICE) ||
      (quiz['quizObj']['questionType'] === QuestionType.TRUE_FALSE)) {
      selectedAnswer = (this.selectedOption.value || this.previousSelection);
    } else if (quiz['quizObj']['questionType'] === QuestionType.MULTIPLE_ANSWER_SELECTION) {
      selectedAnswer = this.multipleAnswers;
    } else if (quiz['quizObj']['questionType'] === QuestionType.DESCRIPTIVE) {
      if (this.textAnswer) {
        selectedAnswer = {
          answer: this.textAnswer
        };
      } else {
        selectedAnswer = null;
      }
    } else if (quiz['quizObj']['questionType'] === QuestionType.DROP_DOWN) {
      selectedAnswer = this.selectedDropDown.value;
    } else if (quiz['quizObj']['questionType'] === QuestionType.LINEAR_SCALE) {
      if (this.selectedScale.value) {
        selectedAnswer = {
          answer: this.selectedScale.value
        };
      }
    }

    const params = {
      quizObj: quiz['quizObj'],
      isMarked: quiz['isMarked'],
      selectedOption: selectedAnswer,
      isNotAttempted: true
    };
    const index = this.answersArray.findIndex(answerData => {
      return (answerData['quizObj']['questionId'] === quiz['quizObj']['questionId']);
    });
    if (index !== -1) {
      this.answersArray[index] = params;
    }
  }

  onFinishQuiz() {
    this._sharedService.setAnswerArray(this.answersArray);
    this._router.navigate(['/' + RouteConstants.REVIEW]);
  }

  onChangeMarkedForReviewStatus(quiz, event) {
    quiz.isMarked = event.checked;
  }

  /* For multiple answer selection */
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

  /* In the single option and true/false question type, getting status if particular option is previously selected */
  checkSelectedOption(option) {
    let isSelected = false;
    this.answersArray.filter((answerData) => {
      if (answerData['selectedOption'] && (answerData['selectedOption']['optionId'] === option['optionId'])) {
        isSelected = true;
      }
    });
    return isSelected;
  }

  /* In the multi answer question type, getting status if particular option is previously selected or not */
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

  /* Getting status if user has selected any answer for this particular question */
  getAnswerStatus(quiz: any) {
    let isAnswered = false;
    if ((quiz['quizObj']['questionType'] === QuestionType.TRUE_FALSE) ||
      (quiz['quizObj']['questionType'] === QuestionType.MULTIPLE_CHOICE) ||
      (quiz['quizObj']['questionType'] === QuestionType.DESCRIPTIVE) ||
      (quiz['quizObj']['questionType'] === QuestionType.DROP_DOWN) ||
      (quiz['quizObj']['questionType'] === QuestionType.LINEAR_SCALE)) {
      isAnswered = !!(quiz['selectedOption']);
    } else if ((quiz['quizObj']['questionType'] === QuestionType.MULTIPLE_ANSWER_SELECTION)) {
      if (quiz['selectedOption'] && quiz['selectedOption']['length'] > 0) {
        isAnswered = true;
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
        (quiz['quizObj']['questionType'] === QuestionType.LINEAR_SCALE)) {
        isNotAnswered = !(quiz['selectedOption']);
      } else if ((quiz['quizObj']['questionType'] === QuestionType.MULTIPLE_ANSWER_SELECTION)) {
        if (quiz['selectedOption'] && quiz['selectedOption']['length'] === 0) {
          isNotAnswered = true;
        }
      }
    }
    return isNotAnswered;
  }

  onNotify() {
    this.isLessTimeLeft = true;
  }

  onLogout() {
    this._sharedService.logout();
  }

}
