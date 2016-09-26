import {Component, ViewEncapsulation} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';

import {equalValidator} from '../../validators';
import {AuthService, StoreService, SvgUrlResolverService} from '../../services';
import {ComponentBase} from '../componentBase/componentBase';
import {loginFormReducer} from './reducers';
import * as actions from './actions';
import {AppPaths} from '../../app.routes';

@Component({
  selector: 'login',
  styleUrls: ['./styles.css'],
  templateUrl: './template.html',
  encapsulation: ViewEncapsulation.Emulated,
  host: {
    style: `flex: 1;
                    display: flex;
                    overflow: hidden;`
  }
})
export class LoginComponent extends ComponentBase {
  registerForm: FormGroup;
  loginForm: FormGroup;
  actions: any;
  currentForm: any;
  store: any;
  submitPending: boolean = false;


  constructor(private authService: AuthService,
              private formBuilder: FormBuilder,
              private router: Router,
              private svgUrlResolver: SvgUrlResolverService,
              private storeService: StoreService) {
    super();

    this.storeService.addReducer('loginForm', loginFormReducer);
    this.actions = actions;
    this.store = this.storeService.getStore();

    this._subscription(this.store.select('loginForm')
      .subscribe(value=> {
        this.currentForm = value
      }));

    this.loginForm = this.formBuilder.group({
      login: ['', Validators.required],
      password: ['', Validators.required]
    });

    this.registerForm = this.formBuilder.group({
      login: ['', Validators.required],
      passwords: this.formBuilder.group({
        password: ['', Validators.required],
        confirmation: ['', Validators.required]
      }, {validator: equalValidator})
    })
  }

  toggleRegister($event?) {
    $event && $event.preventDefault();
    if (this.currentForm === this.actions.LOGIN_FORM) {
      return this.storeService.dispatch({type: this.actions.REGISTER_FORM})
    }

    if (this.currentForm === this.actions.REGISTER_FORM) {
      return this.storeService.dispatch({type: this.actions.LOGIN_FORM})
    }
  }

  showError(field, error) {
    return field.errors && field.errors[error] && field.touched;
  }

  logIn(creds) {
    this.submitPending = true;
    const subscription = this.authService.signIn(creds)
      .subscribe(() => {
        subscription.unsubscribe();
        this.submitPending = false;
        this.router.navigateByUrl(`${AppPaths.COURSES}/(list:list)`);
      }, ()=> {
        this.loginForm.controls['password']['setValue']('');
        this.submitPending = false;
        subscription.unsubscribe()
      });
    return false;
  }

  fbLogin($event?) {
    this.submitPending = true;
    $event && $event.preventDefault();
    const subscription = this.authService.fbLogin()
      .subscribe(() => {
        subscription.unsubscribe();
        this.submitPending = false;
        this.router.navigateByUrl(`${AppPaths.COURSES}/(list:list)`);
      },()=> {
        this.submitPending = false;
        subscription.unsubscribe()
      });


  }

  register(creds) {
    this.submitPending = true;
    const subscription = this.authService.register({
      login: creds.login,
      password: creds.passwords.password,
      confirmation: creds.passwords.confirmation
    })
      .subscribe(() => {
        subscription.unsubscribe();
        this.submitPending = false;
        this.router.navigateByUrl(`${AppPaths.COURSES}/(list:list)`);
        this.toggleRegister()
      }, ()=> {
        subscription.unsubscribe();
        this.submitPending = false;
      });
    return false;
  }

  onDestroy() {

  }
}
