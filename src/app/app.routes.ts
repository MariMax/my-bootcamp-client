import {Routes} from '@angular/router';
import {NoContent} from './components/no-content';
import {CoursesPage} from './components/coursesPage';
import {CoursesList} from './components/coursesList';
import {LoginComponent} from './components/loginPage';
import {CoursesNew} from './components/coursesNew';
import {CoursesEdit} from './components/coursesEdit';

import {LoggedOutGuard, LoggedInGuard} from './guards'

export const AppPaths = {
  LOGIN: 'login',
  COURSES: 'courses',
  COURSES_NEW: 'new',
  COURSES_EDIT: ':id'
};

export const ROUTES: Routes = [
  {path: AppPaths.LOGIN, component: LoginComponent, canActivate:[LoggedOutGuard]},
  {path: '', redirectTo: AppPaths.COURSES, pathMatch: 'full'},
  {
    path: AppPaths.COURSES,
    component: CoursesPage,
    canActivate:[LoggedInGuard],
    children: [
      {path: '', component:CoursesList, outlet: 'list'},
      {path: AppPaths.COURSES_NEW, component: CoursesNew, outlet: 'details'},
      {path: AppPaths.COURSES_EDIT, component: CoursesEdit, outlet: 'details'}
    ]
  },
  {path: '**', component: NoContent},
];
