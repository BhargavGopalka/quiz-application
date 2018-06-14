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

  constructor(private _sharedService: SharedService,
              private _router: Router) {
  }

  ngOnInit() {
    this.userData = this._sharedService.getUserData();
    this.getQuestions(0);
  }

  // Initialization methods
  getQuestions(questionNumber: number, quiz = {}) {
    if (!(Object.keys(quiz).length === 0 && quiz.constructor === Object)) {
      const params = {
        quizObj: quiz,
        selectedOption: this.selectedOption.value
      };
      this.answersArray.push(params);
    }

    if (this.quizList.length === questionNumber) {
      this._sharedService.setAnswerArray(this.answersArray);
      this._router.navigate(['/' + RouteConstants.REVIEW]);
    } else {
      this.singleQuestion = this.quizList.slice(questionNumber, questionNumber + 1);
    }
    this.selectedOption = new FormControl();
  }

  // Page events
  onLogout() {
    this._sharedService.logout();
  }

}
