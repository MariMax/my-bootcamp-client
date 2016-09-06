import {Injectable} from '@angular/core';
import {CanActivate, Router} from '@angular/router';
import {AuthService} from './../services';

@Injectable()
export class LoggedOutGuard implements CanActivate {
  constructor(private authService:AuthService,
              private router:Router) {
  }

  canActivate():boolean {
    var isLoggedIn = this.authService.isAuthorized();
    if (isLoggedIn) {
      this.router.navigate(['']);
    }
    return !isLoggedIn;
  }
}
