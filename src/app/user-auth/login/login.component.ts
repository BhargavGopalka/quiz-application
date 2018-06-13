import {Component, OnDestroy, OnInit} from '@angular/core';
import {AbstractControl, FormControl, FormGroup, Validators} from '@angular/forms';
import {SharedService} from '../../utility/shared-services/shared.service';
import {Router} from '@angular/router';
import {RouteConstants} from '../../utility/constants/routes';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, OnDestroy {

  // Data variable
  message = '';
  successMessageSubscriber: any;

  // Form variables
  loginForm: FormGroup;

  // State variable
  showMessage = false;
  error = false;
  success = false;

  constructor(private _sharedService: SharedService,
              private _router: Router) {
  }

  ngOnInit() {
    this.createLoginForm();
    this.successMessageSubscriber = this._sharedService.getSuccessMessage().subscribe((flag) => {
      if (flag) {
        this.success = true;
        this.message = 'Registration successful';
        this.showMessage = true;
      }
    });
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
      const registeredUserData: any[] = this._sharedService.getRegisteredUserData();
      let isUser = false;
      let userData;
      registeredUserData.filter(data => {
          if ((data['username'] === form.value.username && data['password'] === form.value.password)) {
            isUser = true;
            userData = data;
          }
        }
      );
      if (isUser) {
        this._sharedService.setUserData(userData);
        this._sharedService.setToken('12345abcde');
        this._sharedService.setLoginRequired(true);
        this._router.navigate(['/' + RouteConstants.HOME]);
      } else {
        this.showMessage = true;
        this.error = true;
        this.message = 'Invalid Username or Password';
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

  ngOnDestroy() {
    if (this.successMessageSubscriber) {
      this.successMessageSubscriber.unsubscribe();
    }
  }

}
