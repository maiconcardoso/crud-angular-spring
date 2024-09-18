import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { AppMaterialModule } from '../shared/app-material/app-material.module';
import { ErrorDialogComponent } from '../shared/error-dialog/error-dialog.component';
import { CoursesRoutingModule } from './courses-routing.module';
import { CoursesComponent } from './courses.component';
import { CategoryPipe } from '../shared/pipes/category.pipe';
import { CourseFormComponent } from './course-form/course-form.component';

@NgModule({
  declarations: [
    CoursesComponent,
    ErrorDialogComponent,
    CategoryPipe,
    CourseFormComponent
  ],
  imports: [
    CommonModule,
    CoursesRoutingModule,
    AppMaterialModule,
  ]
})
export class CoursesModule { }
