import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {AbstractControl, FormControl, FormGroup, Validators} from '@angular/forms';
import {SharedService} from '../../../../../app-user/src/app/utility/shared-services/shared.service';
import {Router} from '@angular/router';
import {AdminRouteConstants} from '../../../../../app-user/src/app/utility/constants/routes';

@Component({
  selector: 'app-admin-login',
  templateUrl: './admin-login.component.html',
  styleUrls: ['./admin-login.component.css']
})
export class AdminLoginComponent implements OnInit {

  // Angular variables
  @ViewChild('userName') public userNameElementRef: ElementRef;

  // Data variable
  errorMessage = '';

  // Form variables
  loginForm: FormGroup;

  constructor(private _sharedService: SharedService,
              private _router: Router) {
  }

  ngOnInit() {
    this.createLoginForm();
    this.userNameElementRef.nativeElement.focus();
  }

  // Initialization methods
  createLoginForm() {
    this.loginForm = new FormGroup({
      username: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required])
    });
  }

  // Page events
  onSubmitLogin(form: FormGroup) {
    if (form.valid) {
      if ((form['value']['username'] === 'admin') && (form['value']['password'] === 'admin')) {
        this._sharedService.setUserData(form.value);
        this._sharedService.setToken('abcde12345');
        this._sharedService.setLoginRequired(true);
        this._router.navigate(['/' + AdminRouteConstants.ADMIN_HOME]);
      } else {
        this.errorMessage = 'Invalid Username or Password';
      }
    }
  }

  // get methods
  get userNameField(): AbstractControl {
    return this.loginForm.get('username');
  }

  get passwordField(): AbstractControl {
    return this.loginForm.get('password');
  }


}
