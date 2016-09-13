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
    if (token) {
      this.setJwt(token);
    }
  }

  setJwt(jwt: string) {
    window.localStorage.setItem(this.JWT_KEY, jwt);
    this.storeService.dispatch({type:actions.SET_TOKEN, payload:jwt});
    this.api.setHeaders({Authorization: `Bearer ${jwt}`});
    this.signedOut = false;
  }

  isAuthorized(): boolean {
    return !this.signedOut;
  }

  signIn(creds): Observable<any> {
    return this.api.post(`/signin`, creds)
      .do(res => this.setJwt(res.token))
      .do(res => {
        this.storeService.dispatch({type:actions.SET_USER, payload: res.data._id});
        this.storeService.saveGlobalItem(res.data, '_id');
      })
      .map(res => res.data);
  }

  register(creds): Observable<any> {
    return this.api.post(`/signup`, creds)
      .do(res => this.setJwt(res.token))
      .do(res => this.storeService.saveGlobalItem(res.data, '_id'))
      .map(res => res.data);
  }

  fbLogin(){
    return Observable.fromPromise(new Promise((resolve, reject)=>{
      let accessToken, userLogin;
      FB.login((response:any)=>{
        if (response.status === 'connected'){
          accessToken = response.authResponse.accessToken;
          return FB.api('/me','GET',(response:any)=>resolve({login: response.name, token:accessToken, userId: response.id}))
        }
        return reject();
      })
    }))
      .flatMap(res => {
        console.log(res);
        return this.api.post(`/fbLogin`, res)
      })
      .do(res => this.setJwt(res.token))
      .do(res => this.storeService.saveGlobalItem(res.data, '_id'))
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
    this.storeService.dispatch({type:actions.DROP_USER});
    this.storeService.dispatch({type:actions.DROP_TOKEN});
    this.storeService.dropStore();
    this.signedOut = true;
    this.router.navigate([`/${AppPaths.LOGIN}`]);
  }
}
