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
    return this.router.navigate([`/${AppPaths.courses.path}`, { outlets: { list: [AppPaths.courses.children.list.path] } }]);
  }
}