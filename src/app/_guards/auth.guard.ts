import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from '@angular/router';
import {Observable} from 'rxjs';
import {RouteConstants} from '../utility/constants/routes';
import {SharedService} from '../utility/shared-services/shared.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private _router: Router,
              private _sharedService: SharedService) {
  }

  canActivate(next: ActivatedRouteSnapshot,
              state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {

    let activateRoute = true;
    const stateUrl = state['url'].split('?')[0];
    const isLogin = this._sharedService.isLogin();
    if (isLogin) {
      if (this.getActivatedUrl(stateUrl)) {
        activateRoute = false;
        this._router.navigate(['/' + RouteConstants.HOME]);
      } else {
        activateRoute = true;
      }
    } else {
      if (this.getActivatedUrl(stateUrl)) {
        activateRoute = true;
      } else {
        activateRoute = false;
        this._router.navigate(['/' + RouteConstants.LOGIN]);
      }
    }
    return activateRoute;
  }

  getActivatedUrl(url: string) {
    const publicUrl = ((url === '/' + RouteConstants.LOGIN) || (url === '/' + RouteConstants.REGISTRATION));
    return publicUrl;
  }
}
