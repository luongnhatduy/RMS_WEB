import {Injectable} from '@angular/core';
import {Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot} from '@angular/router';
import {AppSettings} from '../shared/app.setting';

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(private router: Router) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    if (localStorage.getItem('currentUser')) {
      return true;
    } else {
      this.router.navigate([AppSettings.LOGIN_ROUTE]);
      return false;
    }
  }

}
