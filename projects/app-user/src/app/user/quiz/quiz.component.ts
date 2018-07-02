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
  getQuestions(questionNumber: number) {
    this.finishQuizButton = (questionNumber === (this.quizList.length - 1)) ? 'warn' : 'primary';
    /* Getting upcoming question data or if quiz is complete - redirect to review page */
    if (this.quizList.length === questionNumber) {
      this.onFinishQuiz();
    } else {
      this.getParticularQuestion(questionNumber);
    }
  }

  onFinishQuiz() {
    this._sharedService.setAnswerArray(this.answersArray);
    this._router.navigate(['/' + RouteConstants.REVIEW]);
  }

  onUpdatingAnswerArray(value: any) {
    const index = this.answersArray.findIndex(answerData => {
      return (answerData['quizObj']['questionId'] === value['quizObj']['questionId']);
    });
    if (index !== -1) {
      this.answersArray[index] = value;
    }
  }

  onChangeMarkedForReviewStatus(quiz, event) {
    quiz.isMarked = event.checked;
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

  onNotify() {
    this.isLessTimeLeft = true;
  }

  onLogout() {
    this._sharedService.logout();
  }

}
