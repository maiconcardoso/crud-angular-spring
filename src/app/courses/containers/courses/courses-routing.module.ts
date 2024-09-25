import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CoursesComponent } from './courses.component';
import { CourseFormComponent } from '../../components/course-form/course-form.component';
import { CourseResolver } from '../../guard/course.resolver';

const routes: Routes = [
  {
    path: '',
    component: CoursesComponent
  },
  {
    path: 'new',
    component: CourseFormComponent, resolve: {course: CourseResolver}
  },
  {
    path: 'edit/:id',
    component: CourseFormComponent, resolve: {course: CourseResolver}
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CoursesRoutingModule { }
