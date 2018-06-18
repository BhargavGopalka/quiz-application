import {Component, OnInit} from '@angular/core';
import {SharedService} from '../../utility/shared-services/shared.service';
import {FormControl} from '@angular/forms';
import {Router} from '@angular/router';
import {RouteConstants} from '../../utility/constants/routes';
import {HttpClient} from '@angular/common/http';
import {map} from 'rxjs/internal/operators';
import {Observable} from 'rxjs/index';

@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.css']
})
export class QuizComponent implements OnInit {

  // Data related variable
  userData: any;
  quizList: any[];
  singleQuestion = [];
  selectedOption = new FormControl();
  answersArray = [];
  isLessTimeLeft = false;
  finishQuizButton = 'primary';

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

    let previousSelection = null;

    if (!(Object.keys(quiz).length === 0 && quiz.constructor === Object)) {
      this.answersArray.filter((answerData) => {
        if (answerData['quizObj']['questionId'] === quiz['quizObj']['questionId']) {
          previousSelection = answerData['selectedOption'];
        }
      });

      const params = {
        quizObj: quiz['quizObj'],
        isMarked: quiz['isMarked'],
        selectedOption: (this.selectedOption.value || previousSelection),
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
