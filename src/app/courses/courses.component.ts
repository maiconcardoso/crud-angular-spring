import { Component } from '@angular/core';
import { Course } from './model/course';
import { CoursesService } from './services/courses.service';
import { catchError, Observable, of } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { ErrorDialogComponent } from '../shared/error-dialog/error-dialog.component';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.scss']
})
export class CoursesComponent {

  courses$: Observable<Course[]>;
  displayedColumns = ['_id' ,'name', 'category', 'actions'];

  constructor(private courseService: CoursesService,
              private dialog: MatDialog,
              private router: Router,
              private route: ActivatedRoute) {
    this.courses$ = this.courseService.findAll()
      .pipe(
        catchError(error => {
          this.onError('Erro ao carregar cursos.')
          return of([])
        })
      );

    }
    onError(errorMsg: string) {
      this.dialog.open(ErrorDialogComponent, {
        data: errorMsg
      });
    }

    onAdd() {
      this.router.navigate(['new'], {relativeTo: this.route});
    }
}
