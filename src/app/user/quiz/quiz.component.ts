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
  answersArray = [];
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
    this.getQuestions(0);
  }

  getQuestions(questionNumber: number, quiz = {}) {
    this.finishQuizButton = (questionNumber === (this.quizList.length - 1)) ? 'warn' : 'primary';


    if (!(Object.keys(quiz).length === 0 && quiz.constructor === Object)) {

      let selectedAnswer: any;
      if ((quiz['quizObj']['questionType'] === QuestionType.MULTIPLE_CHOICE) ||
        (quiz['quizObj']['questionType'] === QuestionType.TRUE_FALSE)) {
        selectedAnswer = (this.selectedOption.value || this.previousSelection);
      } else if (quiz['quizObj']['questionType'] === QuestionType.MULTIPLE_ANSWER_SELECTION) {
        selectedAnswer = this.multipleAnswers;
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

    if (this.quizList.length === questionNumber) {
      this.getAnswersArray();
    } else {
      this.singleQuestion = this.answersArray.slice(questionNumber, questionNumber + 1);
      this.previousSelection = this.singleQuestion[0]['selectedOption'];
      if (this.singleQuestion[0]['quizObj']['questionType'] === QuestionType.MULTIPLE_ANSWER_SELECTION) {
        this.multipleAnswers = this.previousSelection || [];
      } else {
        this.multipleAnswers = [];
      }
    }
    this.selectedOption = new FormControl();
  }

  getAnswersArray() {
    this._sharedService.setAnswerArray(this.answersArray);
    this._router.navigate(['/' + RouteConstants.REVIEW]);
  }

  // Page events
  onChangeCheck(quiz, event) {
    quiz.isMarked = event.checked;
  }

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

  checkSelectedOption(option) {
    let isSelected = false;
    this.answersArray.filter((answerData) => {
      if (answerData['selectedOption'] && (answerData['selectedOption']['optionId'] === option['optionId'])) {
        isSelected = true;
      }
    });
    return isSelected;
  }

  onNotify() {
    this.isLessTimeLeft = true;
  }

  onLogout() {
    this._sharedService.logout();
  }

}
