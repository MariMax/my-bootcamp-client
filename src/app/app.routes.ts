import {Routes} from '@angular/router';
import {NoContent} from './components/no-content';
import {CoursesPage} from './components/coursesPage';
import {CoursesList} from './components/coursesList';
import {LoginComponent} from './components/loginPage';
import {CoursesNew} from './components/coursesNew';
import {CoursesEdit} from './components/coursesEdit';

import {LoggedOutGuard, LoggedInGuard, RedirectResolver} from './guards'

export const AppPaths = {
  login: {path:'login'},
  courses: {
    path: 'courses',
    children: {
      list: { path: 'list' },
      edit: { path: 'edit' },
      create: { path: 'create' }
    }
  }
};

export const ROUTES: Routes = [
  { path: AppPaths.login.path, component: LoginComponent, canActivate: [LoggedOutGuard] },
  { path: '', resolve: { redirect: RedirectResolver }, component: NoContent },
  {
    path: AppPaths.courses.path,
    component: CoursesPage,
    canActivate: [LoggedInGuard],
    children: [
      { path: AppPaths.courses.children.list.path, component: CoursesList, outlet: 'list' },
      { path: `${AppPaths.courses.children.edit.path}/:id`, component: CoursesEdit, outlet: 'details' },
      { path: `${AppPaths.courses.children.create.path}/:id`, component: CoursesEdit, outlet: 'details' }
    ]
  },
  { path: '**', resolve: { redirect: RedirectResolver }, component: NoContent },
];
