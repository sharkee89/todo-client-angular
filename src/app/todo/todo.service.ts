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
  DUMMY_TODOS: Array<Todo> = [
    {id: 1, title: 'Test title', description: 'Test description', date: new Date('05-05-2019')},
    {id: 2, title: 'Test title 2', description: 'Test description 2', date: new Date('05-05-2019')},
    {id: 3, title: 'Test title 3', description: 'Test description 3', date: new Date('05-05-2019')},
    {id: 4, title: 'Test title 2', description: 'Test description 2', date: new Date('05-05-2019')},
    {id: 5, title: 'Test title 3', description: 'Test description 3', date: new Date('05-05-2019')},
  ];

  constructor(
    private http: HttpClient
  ) {
    this.TODO_SERVICE_URL = TODO_SERVICE_URL;
  }

  getTodoList(): Observable<Array<Todo>> {
    return this.http.get<Array<Todo>>('https://reqres.in/api/users?page=2')
      .pipe(
        map(response => {
          return this.DUMMY_TODOS;
        })
      );
  }

  saveTodo(newTodo: Todo): Observable<Array<Todo>> {
    return this.http.get<Array<Todo>>('https://reqres.in/api/users?page=2')
      .pipe(
        map(response => {
          newTodo.id = this.DUMMY_TODOS[this.DUMMY_TODOS.length - 1].id + 1;
          this.DUMMY_TODOS.push(newTodo);
          return this.DUMMY_TODOS;
        })
      );
  }

  updateTodo(newTodo: Todo): Observable<Array<Todo>> {
    return this.http.get<Array<Todo>>('https://reqres.in/api/users?page=2')
      .pipe(
        map(response => {
          let tempList = [];
          for (let i = 0; i < this.DUMMY_TODOS.length; i++) {
            if (newTodo.id !== this.DUMMY_TODOS[i].id) {
              tempList.push(this.DUMMY_TODOS[i]);
            } else {
              tempList.push(newTodo);
            }
          }
          this.DUMMY_TODOS = tempList;
          return this.DUMMY_TODOS;
        })
      );
  }

  removeTodo(id: number): Observable<Array<Todo>> {
    return this.http.get<Array<Todo>>('https://reqres.in/api/users?page=2')
      .pipe(
        map(response => {
          let tempList = [];
          for (let i = 0; i < this.DUMMY_TODOS.length; i++) {
            if (id !== this.DUMMY_TODOS[i].id) {
              tempList.push(this.DUMMY_TODOS[i]);
            }
          }
          this.DUMMY_TODOS = tempList;
          return this.DUMMY_TODOS;
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
