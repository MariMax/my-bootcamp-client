import {Injectable} from '@angular/core';
import {Router, ActivatedRouteSnapshot, RouterStateSnapshot, Resolve} from '@angular/router'
import {Observable} from 'rxjs';
import {AppPaths} from '../app.routes';

@Injectable()
export class RedirectResolver implements Resolve<any> {
  constructor(private router: Router) {}
  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<any>|Promise<boolean> {
    return this.router.navigateByUrl(`${AppPaths.COURSES}/(list:list)`);
  }
}