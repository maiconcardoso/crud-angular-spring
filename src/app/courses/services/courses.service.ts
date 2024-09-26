import { Injectable } from '@angular/core';
import { Course } from '../model/course';

import { HttpClient } from '@angular/common/http';
import { delay, first, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CoursesService {

  private readonly API = 'api/courses';

  constructor(private httpClient: HttpClient) { }

  findAll() {
    return this.httpClient.get<Course[]>(this.API)
      .pipe(
        first(),
        delay(1300),
        tap(course => console.log(course))
      );
  }

  save(course: Partial<Course>) {
    if (course._id) {
      console.log('Update')
      return this.update(course);
    }
    console.log('create')
    return this.create(course);
  }

  private create(course: Partial<Course>) {
    return this.httpClient.post<Course>(this.API, course);
  }

  private update(course: Partial<Course>) {
    return this.httpClient.put<Course>(`${this.API}/${course._id}`, course);
  }

  findById(id: string) {
    return this.httpClient.get<Course>(`${this.API}/${id}`);
  }
}
