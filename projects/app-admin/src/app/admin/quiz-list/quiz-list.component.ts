import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {AdminRouteConstants} from "../../../../../app-user/src/app/utility/constants/routes";

export interface QuizElement {
  title: string;
  position: number;
  section: number;
  action: string;
}

const QUIZ_DATA: QuizElement[] = [
  {position: 1, title: 'Angular Quiz', section: 4, action: ''},
  {position: 2, title: 'Typescript Quiz', section: 4, action: ''},
  {position: 3, title: 'React Quiz', section: 2, action: ''},
  {position: 4, title: 'Database Quiz', section: 3, action: ''}
];

@Component({
  selector: 'app-admin-quiz-list',
  templateUrl: './quiz-list.component.html',
  styleUrls: ['./quiz-list.component.css']
})
export class QuizListComponent implements OnInit {

  // Data related variables
  displayedColumns: string[] = ['position', 'title', 'section', 'action'];
  quizDataSource = QUIZ_DATA;

  constructor(private _router: Router) {
  }

  ngOnInit() {
  }

  // Page events
  onClickAddQuiz() {
    this._router.navigate(['/' + AdminRouteConstants.ADMIN_CREATE_QUIZ]);
  }

}
