import { Component, OnInit } from '@angular/core';

export interface QuizElement {
  title: string;
  position: number;
  section: number;
  action: string;
}

const QUIZ_DATA: QuizElement[] = [
  {position: 1, title: 'Angular Quiz', section: 4, action: ''},
  {position: 1, title: 'Typescript Quiz', section: 4, action: ''}
];

@Component({
  selector: 'app-admin-quiz-list',
  templateUrl: './quiz-list.component.html',
  styleUrls: ['./quiz-list.component.css']
})
export class QuizListComponent implements OnInit {

  displayedColumns: string[] = ['position', 'title', 'section', 'action'];
  dataSource = QUIZ_DATA;

  constructor() { }

  ngOnInit() {
  }

}
