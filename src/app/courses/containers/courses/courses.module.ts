import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { CoursesComponent } from './courses.component';
import { ReactiveFormsModule } from '@angular/forms';
import { CategoryPipe } from 'src/app/shared/pipes/category.pipe';
import { CourseFormComponent } from '../../components/course-form/course-form.component';
import { CoursesListComponent } from '../courses-list/courses-list.component';
import { CoursesRoutingModule } from './courses-routing.module';
import { AppMaterialModule } from 'src/app/shared/app-material/app-material.module';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  declarations: [
    CoursesComponent,
    CategoryPipe,
    CourseFormComponent,
    CoursesListComponent
  ],
  imports: [
    CommonModule,
    CoursesRoutingModule,
    AppMaterialModule,
    ReactiveFormsModule,
    SharedModule
  ]
})
export class CoursesModule { }
