import {Component, OnInit} from '@angular/core';
import {AbstractControl, FormControl, FormGroup, Validators} from '@angular/forms';
import {SharedService} from '../../utility/shared-services/shared.service';
import {Router} from '@angular/router';
import {RouteConstants} from '../../utility/constants/routes';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  // Data related variable
  message = '';

  // Form variables
  registrationForm: FormGroup;

  // State variable
  showMessage = false;

  constructor(private _sharedService: SharedService,
              private _router: Router) {
  }

  ngOnInit() {
    this.createRegistrationForm();
  }

  // Initialization methods
  createRegistrationForm() {
    this.registrationForm = new FormGroup({
      firstName: new FormControl('', [Validators.required]),
      lastName: new FormControl('', [Validators.required]),
      username: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required])
    });
  }

  // Page events
  onSubmitRegistration(form: FormGroup) {
    if (form.valid) {
      let isError = false;
      const registeredUserData: any[] = this._sharedService.getRegisteredUserData();
      if (registeredUserData.length) {
        // review changes optimization --tarang sachdev
        // again filter is not supposed to use here, instead use forEach or simple for loop
        registeredUserData.filter((data) => {
          if (data.username === form.value.username) {
            this.showMessage = true;
            this.message = 'User is already register';
            isError = true;
          }
        });
      }
      // review changes optimization --tarang sachdev
      // is that really need to createRegistrationForm() ?? if not remove
      if (!isError) {
        this._sharedService.setRegisteredUserData(form.value);
        this._sharedService.setSuccessMessage(true);
        // this.createRegistrationForm();
        this._router.navigate(['/' + RouteConstants.LOGIN]);
      }
    }
  }

  // get methods
  get firstNameField(): AbstractControl {
    return this.registrationForm.get('firstName');
  }

  get lastNameField(): AbstractControl {
    return this.registrationForm.get('lastName');
  }

  get userNameField(): AbstractControl {
    return this.registrationForm.get('username');
  }

  get passwordField(): AbstractControl {
    return this.registrationForm.get('password');
  }

  get login() {
    return ['/' + RouteConstants.LOGIN];
  }

}


// review changes optimization --tarang sachdev

/* in html page don't check error by firstNameField.value instead use firstNameField.valid
 
 2. this.showMessage = true; no need to set this instead just clear message variable value(set to blank)
 and remove ngIf from html -> showMessage and remove showMessage variable from ts file also
 */
