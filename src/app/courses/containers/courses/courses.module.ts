import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { CoursesComponent } from './courses.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ErrorDialogComponent } from 'src/app/shared/error-dialog/error-dialog.component';
import { CategoryPipe } from 'src/app/shared/pipes/category.pipe';
import { CourseFormComponent } from '../../components/course-form/course-form.component';
import { CoursesListComponent } from '../courses-list/courses-list.component';
import { CoursesRoutingModule } from './courses-routing.module';
import { AppMaterialModule } from 'src/app/shared/app-material/app-material.module';

@NgModule({
  declarations: [
    CoursesComponent,
    ErrorDialogComponent,
    CategoryPipe,
    CourseFormComponent,
    CoursesListComponent
  ],
  imports: [
    CommonModule,
    CoursesRoutingModule,
    AppMaterialModule,
    ReactiveFormsModule
  ]
})
export class CoursesModule { }
