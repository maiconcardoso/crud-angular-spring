import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CoursesRoutingModule } from './courses-routing.module';
import { CoursesComponent } from './courses.component';
import { AppMaterialModule } from '../shared/app-material/app-material.module';
import { ErrorDialogComponent } from '../shared/error-dialog/error-dialog.component';

@NgModule({
  declarations: [
    CoursesComponent,
    ErrorDialogComponent
  ],
  imports: [
    CommonModule,
    CoursesRoutingModule,
    AppMaterialModule,

  ]
})
export class CoursesModule { }
