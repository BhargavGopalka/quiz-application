import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {SharedService} from '../../../../../app-user/src/app/utility/shared-services/shared.service';
import {AdminRouteConstants} from '../../../../../app-user/src/app/utility/constants/routes';

@Component({
  selector: 'app-admin-admin-home',
  templateUrl: './admin-home.component.html',
  styleUrls: ['./admin-home.component.css']
})
export class AdminHomeComponent implements OnInit {

  // Data related variable
  userData: any;

  constructor(private _sharedService: SharedService,
              private _router: Router) {
  }

  ngOnInit() {
    this.userData = this._sharedService.getUserData();
  }

  // Page events
  onClickQuiz() {
    this._router.navigate(['/' + AdminRouteConstants.ADMIN_QUIZ_LIST]);
  }

  onLogout() {
    this._sharedService.adminLogout();
  }


}
