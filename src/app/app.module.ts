import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpModule} from '@angular/http';
import {RouterModule} from '@angular/router';
import {StoreModule} from '@ngrx/store';

import {ROUTES} from './app.routes';

import {App} from './app.component';
import {NoContent} from './components/no-content';
import {LoginComponent} from './components/loginPage';
import {ToasterComponent} from './components/toaster';
import {CoursesPage} from './components/coursesPage';
import {CoursesList} from './components/coursesList';
import {CoursesNew} from './components/coursesNew';
import {CoursesEdit} from './components/coursesEdit';
import {PageHeader} from './components/header';
import {LoaderComponent} from './components/loader';
import {SearchInput} from './components/searchComponent';


import {globalStorageReducer} from './services/storeService/reducers';
import {ApiService, AuthService, StoreService, SvgUrlResolverService, CoursesService} from './services';
import {ToasterService} from './components/toaster';
import {LoggedOutGuard, LoggedInGuard} from './guards';

import {LatinLettersOnlyDirective, LettersAndNumbersDirective, Focus} from './directives'

import {combineReducers} from "@ngrx/store";
import {compose} from "@ngrx/core/compose";

import {useHash} from './appConfig';

let reducerSettings;
const eraseStore = (reducer: Function) => (state, action) => {
  if (action.type === 'ERASE_STORE') {
    debugger;
    //does not work :'(
    state = {};
  }
  return reducer(state, action);
};

reducerSettings = compose(eraseStore, combineReducers);


@NgModule({
  bootstrap: [App],
  declarations: [
    App,
    NoContent,
    LoginComponent,
    ToasterComponent,
    CoursesList,
    CoursesNew,
    CoursesEdit,
    CoursesPage,
    LatinLettersOnlyDirective,
    LettersAndNumbersDirective,
    Focus,
    PageHeader,
    LoaderComponent,
    SearchInput
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    StoreModule.provideStore(reducerSettings({globalStorage: globalStorageReducer})),
    HttpModule,
    RouterModule.forRoot(ROUTES, {useHash: useHash})
  ],
  providers: [
    ApiService,
    AuthService,
    StoreService,
    ToasterService,
    LoggedOutGuard,
    LoggedInGuard,
    SvgUrlResolverService,
    CoursesService
  ]
})
export class AppModule {
}
