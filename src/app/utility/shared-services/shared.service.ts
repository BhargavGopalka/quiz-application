import {Injectable} from '@angular/core';
import {Router} from '@angular/router';
import {APPStorage} from '../constants/storage';
import {RouteConstants} from '../constants/routes';
import {BehaviorSubject, Observable} from 'rxjs/index';

@Injectable({
  providedIn: 'root'
})
export class SharedService {

  private isLoginRequired: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  private answerArray: BehaviorSubject<Array<any>> = new BehaviorSubject<Array<any>>([]);
  private isRegistrationSuccessfully: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  constructor(private _router: Router) {
  }

  /* Token Data */
  getToken(): any {
    return localStorage.getItem(APPStorage.TOKEN);
  }

  setToken(value: any): void {
    localStorage.setItem(APPStorage.TOKEN, value);
  }

  /* User Data */
  getUserData(): any {
    return JSON.parse(localStorage.getItem(APPStorage.USER));
  }

  setUserData(value: any): void {
    localStorage.setItem(APPStorage.USER, JSON.stringify(value));
  }

  /* List of registered users */
  getRegisteredUserData(): any {
    let registeredUserData: any[] = JSON.parse(localStorage.getItem(APPStorage.REGISTERED_USERS));
    if (!registeredUserData) {
      registeredUserData = [];
    }
    return registeredUserData;
  }

  setRegisteredUserData(value: any): void {
    const registeredUserData: any[] = this.getRegisteredUserData();
    registeredUserData.push(value);
    localStorage.setItem(APPStorage.REGISTERED_USERS, JSON.stringify(registeredUserData));
  }

  /* Login Required */
  getLoginRequired(): Observable<boolean> {
    return this.isLoginRequired.asObservable();
  }

  setLoginRequired(value: boolean): void {
    this.isLoginRequired.next(value);
  }

  /* Quiz Answer array */
  getAnswerArray(): Observable<Array<any>> {
    return this.answerArray.asObservable();
  }

  setAnswerArray(value: any[]): void {
    this.answerArray.next(value);
  }

  /* Successful registration */
  getSuccessMessage(): Observable<boolean> {
    return this.isRegistrationSuccessfully.asObservable();
  }

  setSuccessMessage(value: boolean): void {
    this.isRegistrationSuccessfully.next(value);
  }

  /* Check login state */
  isLogin() {
    return !!(this.getToken() && this.getUserData());
  }

  /* Logout */
  logout() {
    const registeredUserData: any[] = this.getRegisteredUserData();
    localStorage.clear();
    localStorage.setItem(APPStorage.REGISTERED_USERS, JSON.stringify(registeredUserData));
    this.setLoginRequired(false);
    this._router.navigate(['/' + RouteConstants.LOGIN]);
  }
}
