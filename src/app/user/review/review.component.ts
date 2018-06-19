import {Component, OnDestroy, OnInit} from '@angular/core';
import {SharedService} from '../../utility/shared-services/shared.service';
import {RouteConstants} from '../../utility/constants/routes';
import {Router} from '@angular/router';
import {QuestionType} from '../../utility/constants/base-constants';

@Component({
  selector: 'app-review',
  templateUrl: './review.component.html',
  styleUrls: ['./review.component.css']
})
export class ReviewComponent implements OnInit, OnDestroy {

  // Constant variables
  questionType = QuestionType;

  // Data related variable
  answerArraySubscriber: any;
  answerArray = [];
  userData: any;
  points = 0;

  constructor(private _sharedService: SharedService,
              private _router: Router) {
  }

  ngOnInit() {
    this.userData = this._sharedService.getUserData();
    this.answerArraySubscriber = this._sharedService.getAnswerArray().subscribe((response) => {
      this.answerArray = response;
    });
    this.getFinalPoints();
    console.log(this.answerArray);
  }

  // Initialization methods
  getFinalPoints() {
    this.answerArray.map((option) => {
      if (option['selectedOption'] && option['selectedOption']['isAnswer']) {
        this.points = this.points + 10;
      }
    });
  }

  // Page events
  getAnswerStatus(quiz: any) {
    let isRightAnswer = true;
    if ((quiz['quizObj']['questionType'] === QuestionType.TRUE_FALSE) ||
      (quiz['quizObj']['questionType'] === QuestionType.MULTIPLE_CHOICE)) {
      isRightAnswer = quiz['selectedOption']['isAnswer'];
    } else if ((quiz['quizObj']['questionType'] === QuestionType.MULTIPLE_ANSWER_SELECTION)) {
      const selectedOptions = quiz['selectedOption'];
      const optionsArray = quiz['quizObj']['options'];
      if (selectedOptions['length'] > 0) {

        /* For loop to check if all the selected option are true/right or not */
        for (let i = 0; i < selectedOptions['length']; i++) {
          if (selectedOptions[i]['isAnswer'] === false) {
            isRightAnswer = false;
            break;
          }
        }

        /* To check if true/right option are included inside the selectedOption array */
        optionsArray.forEach((option) => {
          if (option['isAnswer'] === true) {
            const index = selectedOptions.findIndex((answerOption) => {
              return answerOption['optionId'] === option['optionId'];
            });
            if (index === -1) {
              isRightAnswer = false;
            }
          }
        });
      }
    }
    return isRightAnswer;
  }

  getAttemptStatus(quiz: any) {
    let isAttempted = false;
    if ((quiz['quizObj']['questionType'] === QuestionType.TRUE_FALSE) ||
      (quiz['quizObj']['questionType'] === QuestionType.MULTIPLE_CHOICE)) {
      isAttempted = !!(quiz['selectedOption']);
    } else if ((quiz['quizObj']['questionType'] === QuestionType.MULTIPLE_ANSWER_SELECTION)) {
      if (quiz['selectedOption']['length'] > 0) {
        isAttempted = true;
      }
    }
    return isAttempted;
  }

  onClickQuiz() {
    this._router.navigate(['/' + RouteConstants.QUIZ]);
  }

  onLogout() {
    this._sharedService.logout();
  }

  ngOnDestroy() {
    if (this.answerArraySubscriber) {
      this.answerArraySubscriber.unsubscribe();
    }
  }

}
