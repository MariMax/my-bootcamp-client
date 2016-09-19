import {Injectable} from '@angular/core';
import {ApiService} from '../apiService/apiService';
import {Observable} from 'rxjs/Observable';
import {StoreService} from '../storeService/storeService';
import {Router} from '@angular/router';
import {AppPaths} from '../../app.routes';

import * as actions from './actions';
import {authReducer} from './reducers';

@Injectable()
export class AuthService {
  JWT_KEY: string = 'auth_token';
  USER_LOGIN_KEY = 'user_login';
  store;
  signedOut:boolean = true;

  constructor(private api: ApiService,
              private router: Router,
              private storeService: StoreService) {

    this.storeService.addReducer('auth', authReducer);

    this.store = this.storeService.getStore();
    this.store.select(state=>{
      console.log('state', state);
      return state.auth;
    })
      .subscribe(auth=> {
        if (!auth.token && !this.signedOut) {
          this.signout();
        }
      });

    const token = window.localStorage.getItem(this.JWT_KEY);
    const userData = JSON.parse(window.localStorage.getItem(this.USER_LOGIN_KEY));
    if (token) {
      this.setJwt(token, userData);
    }
  }

  setJwt(jwt: string, userData:any) {
    window.localStorage.setItem(this.JWT_KEY, jwt);
    window.localStorage.setItem(this.USER_LOGIN_KEY, JSON.stringify(userData));

    this.storeService.dispatch({type:actions.SET_TOKEN, payload:jwt});
    this.storeService.dispatch({type:actions.SET_USER, payload: userData.id});
    this.storeService.saveGlobalItem(userData, 'id');

    this.api.setHeaders({Authorization: `JWT ${jwt}`});
    this.signedOut = false;
  }

  isAuthorized(): boolean {
    return !this.signedOut;
  }

  signIn(creds): Observable<any> {
    return this.api.post(`/signin`, creds)
      .do(res => this.setJwt(res.token, res.data))
      .map(res => res.data);
  }

  register(creds): Observable<any> {
    return this.api.post(`/signup`, creds)
      .do(res => this.setJwt(res.token, res.data))
      .map(res => res.data);
  }

  fbLogin(){
    return Observable.create(observer=>{
      let accessToken;
      FB.login((response:any)=>{
        if (response.status === 'connected'){
          accessToken = response.authResponse.accessToken;
          return FB.api('/me','GET',(response:any)=>observer.next({login: response.name, token:accessToken, userId: response.id}))
        }
        return observer.error();
      })
    })
      .flatMap(res => this.api.post(`/fbLogin`, res))
      .do(res => this.setJwt(res.token, res.data))
      .map(res => res.data);
  }

  // validateToken() {
  //   const subscription = this.api.post('/validate', {})
  //     .subscribe(()=>subscription.unsubscribe(), ()=> {
  //       this.signout();
  //       subscription.unsubscribe()
  //     });
  // }

  signout() {
    window.localStorage.removeItem(this.JWT_KEY);
    window.localStorage.removeItem(this.USER_LOGIN_KEY);
    this.storeService.dispatch({type:actions.DROP_USER});
    this.storeService.dispatch({type:actions.DROP_TOKEN});
    this.storeService.dropStore();
    this.signedOut = true;
    this.router.navigate([`/${AppPaths.LOGIN}`]);
  }
}
