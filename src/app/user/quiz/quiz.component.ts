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

  constructor(private _sharedService: SharedService,
              private _router: Router) {
  }

  ngOnInit() {
    this.userData = this._sharedService.getUserData();
    this.getQuestions(0);
  }

  // Initialization methods
  getQuestions(questionNumber: number, quiz = {}) {
    this.finishQuizButton = (questionNumber === (this.quizList.length - 1)) ? 'warn' : 'primary';
    if (!(Object.keys(quiz).length === 0 && quiz.constructor === Object)) {
      const params = {
        quizObj: quiz,
        selectedOption: (this.selectedOption.value || null)
      };

      if (this.answersArray.length === 0) {
        this.answersArray.push(params);
      } else {
        const index = this.answersArray.findIndex(answerData => {
          return (answerData['quizObj']['questionId'] === quiz['questionId']);
        });

        if (index === -1) {
          this.answersArray.push(params);
        } else {
          this.answersArray[index] = params;
        }
      }
    }

    if (this.quizList.length === questionNumber) {
      this.getAnswersArray();
    } else {
      this.singleQuestion = this.quizList.slice(questionNumber, questionNumber + 1);
    }
    this.selectedOption = new FormControl();
  }

  getAnswersArray() {
    this._sharedService.setAnswerArray(this.answersArray);
    this._router.navigate(['/' + RouteConstants.REVIEW]);
  }

  // Page events
  onNotify() {
    this.isLessTimeLeft = true;
  }

  onFinished() {
    const queArrayLength = this.quizList.length;
    const ansArrayLength = this.answersArray.length;
    if (queArrayLength !== ansArrayLength) {
      for (let i = ansArrayLength; i !== queArrayLength; i++) {
        const params = {
          quizObj: this.quizList[i],
          selectedOption: null
        };
        this.answersArray.push(params);
      }
    }
    this.getAnswersArray();
  }

  onLogout() {
    this._sharedService.logout();
  }

}
