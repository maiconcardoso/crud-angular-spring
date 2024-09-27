import { Component } from '@angular/core';
import { catchError, Observable, of } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { Course } from '../../model/course';
import { CoursesService } from '../../services/courses.service';
import { ErrorDialogComponent } from 'src/app/shared/error-dialog/error-dialog.component';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.scss']
})
export class CoursesComponent {

  courses$: Observable<Course[]> | null = null;

  constructor(private courseService: CoursesService,
              private dialog: MatDialog,
              private router: Router,
              private route: ActivatedRoute,
              private snackBar: MatSnackBar) {
      this.onRefresh();
    }

    onRefresh() {
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

    onEdit(course: Course) {
      this.router.navigate(['edit', course._id], { relativeTo: this.route });
    }

    onDelete(course: Course) {
      this.courseService.remove(course._id).subscribe(
        () => {
          this.onRefresh();
          this.snackBar.open('Curso removido com sucesso!', 'X',
            { duration: 3000,
              verticalPosition: 'top',
              horizontalPosition: 'center'
            })
        },
        () => { this.onError('Não foi possível deletar o curso.') }
      )
    }
}
