import { Component } from '@angular/core';
/* import { FormBuilder, FormGroup } from '@angular/forms'; */
import { UntypedFormBuilder,UntypedFormGroup } from '@angular/forms';
import { CoursesService } from '../services/courses.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Location } from '@angular/common';

@Component({
  selector: 'app-course-form',
  templateUrl: './course-form.component.html',
  styleUrls: ['./course-form.component.scss']
})
export class CourseFormComponent {

  form: UntypedFormGroup;

  constructor(private formBuilder: UntypedFormBuilder,
              private service: CoursesService,
              private snackBar: MatSnackBar,
              private location: Location) {
    this.form = this.formBuilder.group({
      name: [null],
      category: [null]
    });
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
