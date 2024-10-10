import { Component } from '@angular/core';
import { Location } from '@angular/common';
import { FormGroup, NonNullableFormBuilder, UntypedFormArray, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CoursesService } from '../../services/courses.service';
import { ActivatedRoute } from '@angular/router';
import { Course } from '../../model/course';
import { Lesson } from '../../model/lesson';

@Component({
  selector: 'app-course-form',
  templateUrl: './course-form.component.html',
  styleUrls: ['./course-form.component.scss']
})
export class CourseFormComponent {

  form!: FormGroup;

  constructor(private formBuilder: NonNullableFormBuilder,
              private service: CoursesService,
              private snackBar: MatSnackBar,
              private location: Location,
              private route: ActivatedRoute) {

    const course: Course = this.route.snapshot.data['course'];

    this.form = this.formBuilder.group({
      _id: [course._id],
      name: [course.name, [Validators.required, Validators.minLength(5), Validators.maxLength(80)]],
      category: [course.category, [Validators.required]],
      lessons: this.formBuilder.array(this.retrieveLessons(course), Validators.required)
  });

  }

  onSubmit() {
    if (this.form.valid) {
      this.service.save(this.form.value).subscribe(response => {
        this.onSuccess()
      }, error => this.onError());
    } else {
      alert('Invalid form')
    }
  }

  private retrieveLessons(course: Course) {
    const lessons = [];
    if (course?.lessons) {
      course.lessons.forEach(lesson => lessons.push(this.createLesson(lesson)))
    } else {
      lessons.push(this.createLesson())
    }
    return lessons;
  }

  private createLesson(lesson: Lesson = { id: '', name: '', youtubeUrl: '' }) {
    return this.formBuilder.group({
      id: [lesson.id],
      name: [lesson.name, [Validators.required, Validators.minLength(5), Validators.maxLength(40)]],
      youtubeUrl: [lesson.youtubeUrl, [Validators.required, Validators.minLength(10), Validators.maxLength(20)]]
    });
  }

  getLessonsForArray() {
    return (<UntypedFormArray>this.form.get('lessons')).controls
  }

  addNewLesson() {
    const lesson = this.form.get('lessons') as UntypedFormArray
    lesson.push(this.createLesson());
  }

  removeLesson(index: number) {
    const lesson = this.form.get('lessons') as UntypedFormArray
    lesson.removeAt(index);
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

  isFormArrayRequired() {
    const lessons = this.form.get('lessons') as UntypedFormArray
    return !lessons.valid && lessons.hasError('required') && lessons.touched;
  }
}
