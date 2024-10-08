import { Component } from '@angular/core';
import { Location } from '@angular/common';
import { NonNullableFormBuilder, Validators } from '@angular/forms';
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
      name: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(80)]],
      category: ['', [Validators.required]]
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
    console.log(course);
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

  getErrorMessage(fieldName: string) {
    const field = this.form.get(fieldName);

    if (field?.hasError('required')) {
      return 'Campo Obrigatório'
    }

    if (field?.hasError('minLength')) {
      const requiredLength: number = field.errors ? field.errors['minLength']['requiredLength'] : 5
      return `Tamanho minímo precisa ser de ${requiredLength} caracteres.`;
    }

    if (field?.hasError('maxLength')) {
      const requiredLength: number = field.errors ? field.errors['maxLength']['requiredLength'] : 80
      return `Tamanho maxímo excedido de ${requiredLength} caracteres.`;
    }

    return 'Campo inválido.'
  }
}
