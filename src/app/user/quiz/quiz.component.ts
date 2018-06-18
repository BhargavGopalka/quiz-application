import {Component, OnInit} from '@angular/core';
import {SharedService} from '../../utility/shared-services/shared.service';
import {Quiz} from './quiz-questions';
import {FormControl} from '@angular/forms';
import {Router} from '@angular/router';
import {RouteConstants} from '../../utility/constants/routes';

@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.css']
})
export class QuizComponent implements OnInit {

  // Data related variable
  userData: any;
  quizList = Quiz;
  singleQuestion = [];
  selectedOption = new FormControl();
  answersArray = [];
  isLessTimeLeft = false;
  finishQuizButton = 'primary';
  isMarkedReview = false;

  constructor(private _sharedService: SharedService,
              private _router: Router) {
  }

  ngOnInit() {
    this.userData = this._sharedService.getUserData();
    this.getDefaultAnswerArray();
    this.getQuestions(0);
  }

  // Initialization methods
  getDefaultAnswerArray() {
    this.quizList.map((quizQuestions) => {
      const params = {
        quizObj: quizQuestions,
        isMarked: false,
        selectedOption: null
      };
      this.answersArray.push(params);
    });
  }

  getQuestions(questionNumber: number, quiz = {}) {
    this.finishQuizButton = (questionNumber === (this.quizList.length - 1)) ? 'warn' : 'primary';

    let previousSelection = null;
    this.answersArray.filter((answerData) => {
      if (answerData['quizObj']['questionId'] === quiz['questionId']) {
        previousSelection = answerData['selectedOption'];
      }
    });

    if (!(Object.keys(quiz).length === 0 && quiz.constructor === Object)) {
      const params = {
        quizObj: quiz,
        isMarked: this.isMarkedReview,
        selectedOption: (this.selectedOption.value || previousSelection)
      };

      const index = this.answersArray.findIndex(answerData => {
        return (answerData['quizObj']['questionId'] === quiz['questionId']);
      });
      if (index !== -1) {
        this.answersArray[index] = params;
      }
    }

    if (this.quizList.length === questionNumber) {
      this.getAnswersArray();
    } else {
      this.singleQuestion = this.answersArray.slice(questionNumber, questionNumber + 1);
      this.isMarkedReview = this.singleQuestion[0]['isMarked'];
    }
    this.selectedOption = new FormControl();
  }

  getAnswersArray() {
    this._sharedService.setAnswerArray(this.answersArray);
    this._router.navigate(['/' + RouteConstants.REVIEW]);
  }

  // Page events
  onChangeCheck(event) {
    this.isMarkedReview = event.checked;
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
