import { Component } from '@angular/core';
import { Location } from '@angular/common';
import { NonNullableFormBuilder } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CoursesService } from '../../services/courses.service';
import { ActivatedRoute } from '@angular/router';
import { Course } from '../../model/course';

@Component({
  selector: 'app-course-form',
  templateUrl: './course-form.component.html',
  styleUrls: ['./course-form.component.scss']
})
export class CourseFormComponent {

  form = this.formBuilder.group({
      _id: [''],
      name: [''],
      category: ['']
  });

  constructor(private formBuilder: NonNullableFormBuilder,
              private service: CoursesService,
              private snackBar: MatSnackBar,
              private location: Location,
              private route: ActivatedRoute) {

    const course: Course = this.route.snapshot.data['course'];
    this.form.setValue({
      _id: course._id,
      name: course.name,
      category: course.category
    })
  }

  onSubmit() {
    this.service.save(this.form.value).subscribe(response => {
      this.onSuccess()
    }, error => this.onError());
  }

  onCancel() {
    this.location.back();
  }

  onError() {
    this.snackBar.open('Erro ao salvar curso.', '', {duration: 3000});
  }

  onSuccess() {
    this.snackBar.open('Curso criado com sucesso!', '', {duration:3000});
    this.onCancel();
  }
}
