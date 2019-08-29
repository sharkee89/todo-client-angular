import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { TODO_SERVICE_URL } from 'src/app/utils/config';
import { Todo } from './todo.model';

@Injectable({
  providedIn: 'root'
})
export class TodoService {

  TODO_SERVICE_URL: string;

  constructor(
    private http: HttpClient
  ) {
    this.TODO_SERVICE_URL = `${TODO_SERVICE_URL}/todos`;
  }

  getTodoList(): Observable<Array<Todo>> {
    return this.http.get<Array<Todo>>(this.TODO_SERVICE_URL)
      .pipe(
        map(response => {
          return response;
        })
      );
  }

  saveTodo(newTodo: Todo): Observable<Array<Todo>> {
    return this.http.post<Array<Todo>>(this.TODO_SERVICE_URL, newTodo)
      .pipe(
        map(response => {
          return response;
        })
      );
  }

  updateTodo(newTodo: Todo): Observable<Array<Todo>> {
    return this.http.patch<Array<Todo>>(`${this.TODO_SERVICE_URL}/${newTodo['_id']}`, newTodo)
      .pipe(
        map(response => {
          return response;
        })
      );
  }

  removeTodo(id: number): Observable<Array<Todo>> {
    return this.http.delete<Array<Todo>>(`${this.TODO_SERVICE_URL}/${id}`)
      .pipe(
        map(response => {
          return response;
        })
      );
  }

  getDefaultTodo(): Todo {
    return {
      title: '',
      description: '',
      date: null
    }
  }
}
