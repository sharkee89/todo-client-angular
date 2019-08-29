import { Component, OnInit } from '@angular/core';
import { TodoService } from './todo.service';
import { DialogService } from 'ng2-bootstrap-modal';
import { ConfirmModalComponent } from '../modal/confirm-modal/confirm-modal.component';
import { Todo } from './todo.model';
import { EditTodoModalComponent } from '../modal/edit-todo-modal/edit-todo-modal.component';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.scss']
})
export class TodoComponent implements OnInit {

  todoList: Array<any>;
  isCreateStart: boolean;
  step: number;
  newTodo: Todo;
  titleFilterValue: string;

  constructor(
    private _todoService: TodoService,
    private dialogService: DialogService
  ) { }

  ngOnInit() {
    this.init();
  }

  init(): void {
    this.initConfiguration();
    this.initTodoList();
  }

  initConfiguration(): void {
    this.isCreateStart = false;
    this.step = 0;
    this.newTodo = this._todoService.getDefaultTodo();
    this.titleFilterValue = '';
  }

  initTodoList(): void {
    this._todoService.getTodoList()
      .subscribe((res) => {
        this.todoList = res;
      })
  }

  saveTodo(newTodo: any): void {
    this._todoService.saveTodo(newTodo)
      .subscribe((res) => {
        this.newTodo = this._todoService.getDefaultTodo();
        this.todoList = res;
        console.log(res);
        console.log(this.todoList);
        this.step = 0;
        this.isCreateStart = false;
      });
  }

  removeTodo(id: number): void {
    this.dialogService.addDialog(ConfirmModalComponent, {
      title: 'Delete Saving',
      question: 'Are you sure you want to remove saving?'
    }).subscribe((result) => {
      if (result) {
        this._todoService.removeTodo(id)
          .subscribe((res) => {
            this.todoList = res;
          });
      }
    });
  }

  startNewTodo(): void {
    this.isCreateStart = true;
  }

  startUpdateTodo(todo: Todo): void {
    this.dialogService.addDialog(EditTodoModalComponent, {
      updateTodo: todo
    })
      .subscribe((result) => {
        if (result) {
          this._todoService.updateTodo(result)
            .subscribe((res) => {
              this.todoList = res;
            })
        }
      });
  }

  changeStep(progress: number): void {
    this.step += progress;
  }

}
