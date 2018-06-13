import {Component, OnInit} from '@angular/core';
import {SharedService} from '../../utility/shared-services/shared.service';
import {Quiz} from "./quiz-questions";

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

  constructor(private _sharedService: SharedService) {
  }

  ngOnInit() {
    this.userData = this._sharedService.getUserData();
    this.getQuestions(0);
  }

  // Initialization methods
  getQuestions(questionNumber: number) {
    this.singleQuestion = this.quizList.slice(questionNumber, questionNumber + 1);
  }

  // Page events
  onLogout() {
    this._sharedService.logout();
  }

}
