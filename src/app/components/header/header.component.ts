import {Component, ViewEncapsulation} from '@angular/core';
import {StoreService, AuthService, SvgUrlResolverService, CoursesService} from '../../services';
import {ComponentBase} from '../componentBase';
import {SearchComponentActions} from '../searchComponent';
import {stat} from "fs";


@Component({
  selector: 'page-header',
  styleUrls: ['./styles.css'],
  templateUrl: './template.html',
  encapsulation: ViewEncapsulation.Emulated,
  host: {
    style: `display: flex;
          overflow: hidden;`
  },
})
export class PageHeader extends ComponentBase {
  store: any;
  login: string = '';
  showLogin: boolean = true;
  query: string;

  constructor(private storeService: StoreService,
              private svgUrlResolver: SvgUrlResolverService,
              private coursesService: CoursesService,
              private authService: AuthService) {
    super();

    this.store = this.storeService.getStore();

    this._subscription(
      this.store.select(state=>({
        user: state.auth.user && state.globalStorage[state.auth.user],
        filter: state[this.coursesService.storageFiled].filter
      }))
        .subscribe(res=> {
          this.login = res.user.login;
          this.query = res.filter;
        }));
  }

  logout() {
    this.authService.signout();
  }

  searchAction(event) {
    switch (event.type) {
      case SearchComponentActions.open: {
        this.showLogin = false;
        break;
      }
      case SearchComponentActions.close: {
        this.showLogin = true;
        break;
      }
      case SearchComponentActions.search: {
        this.coursesService.filterCourses(event.payload);
      }
    }
  }

  onDestroy() {
  }
}
