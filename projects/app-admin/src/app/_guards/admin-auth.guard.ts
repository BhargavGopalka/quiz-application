import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from '@angular/router';
import {Observable} from 'rxjs';
import {SharedService} from '../../../../app-user/src/app/utility/shared-services/shared.service';
import {AdminRouteConstants} from '../../../../app-user/src/app/utility/constants/routes';

@Injectable({
  providedIn: 'root'
})
export class AdminAuthGuard implements CanActivate {

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
        this._router.navigate(['/' + AdminRouteConstants.ADMIN_HOME]);
      } else {
        activateRoute = true;
      }
    } else {
      if (this.getActivatedUrl(stateUrl)) {
        activateRoute = true;
      } else {
        activateRoute = false;
        this._router.navigate(['/' + AdminRouteConstants.ADMIN_LOGIN]);
      }
    }
    return activateRoute;
  }

  getActivatedUrl(url: string) {
    const publicUrl = ((url === '/' + AdminRouteConstants.ADMIN_LOGIN));
    return publicUrl;
  }
}
