import {Component, OnDestroy, OnInit} from '@angular/core';
import {SharedService} from '../../utility/shared-services/shared.service';
import {RouteConstants} from '../../utility/constants/routes';
import {Router} from '@angular/router';

@Component({
  selector: 'app-review',
  templateUrl: './review.component.html',
  styleUrls: ['./review.component.css']
})
export class ReviewComponent implements OnInit, OnDestroy {

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
