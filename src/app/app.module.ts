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
import {CoursesEdit} from './components/coursesEdit';
import {CourseEditForm} from './components/courseEditForm';
import {PageHeader} from './components/header';
import {LoaderComponent} from './components/loaderModule';
import {SearchInput} from './components/searchComponent';
import {CourseCard} from './components/courseCard';

import {ApiService, AuthService, StoreService, SvgUrlResolverService, CoursesService, AuthorsService} from './services';
import {LoaderService} from './components/loaderModule/loader.service'
import {DurationPipe} from './pipes/duration';

import {ToasterService} from './components/toaster';
import {LoggedOutGuard, LoggedInGuard, RedirectResolver} from './guards';

import {LatinLettersOnlyDirective, LettersAndNumbersDirective, Focus, NumbersOnlyDirective} from './directives';

import {useHash} from './appConfig';


@NgModule({
  bootstrap: [App],
  declarations: [
    App,
    NoContent,
    LoginComponent,
    ToasterComponent,
    CoursesList,
    CoursesEdit,
    CoursesPage,
    LatinLettersOnlyDirective,
    LettersAndNumbersDirective,
    NumbersOnlyDirective,
    Focus,
    PageHeader,
    LoaderComponent,
    SearchInput,
    CourseCard,
    CourseEditForm,
    DurationPipe
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    StoreModule.provideStore({}),
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
    RedirectResolver,
    SvgUrlResolverService,
    CoursesService,
    AuthorsService,
    LoaderService
  ]
})
export class AppModule {
}
