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
  isListLoaded: boolean;
  isListSuccess: boolean;
  isAddTodoError: boolean;
  step: number;
  newTodo: Todo;
  titleFilterValue: string;
  required = {
    title: false,
    desc: false,
    date: false,
  };

  constructor(
    private todoService: TodoService,
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
    this.isListLoaded = false;
    this.isListSuccess = false;
    this.isAddTodoError = false;
    this.step = 0;
    this.newTodo = this.todoService.getDefaultTodo();
    this.titleFilterValue = '';
  }

  initTodoList(): void {
    this.isListLoaded = false;
    this.todoService.getTodoList()
      .subscribe((res) => {
        this.todoList = res;
        this.isListLoaded = true;
        this.isListSuccess = true;
      }, () => {
        this.isListLoaded = true;
        this.isListSuccess = false;
      });
  }

  saveTodo(newTodo: any): void {
    if (!newTodo.date) {
      this.required.date = true;
      return;
    }
    this.todoService.saveTodo(newTodo)
      .subscribe((res) => {
        this.initTodoList();
        this.newTodo = this.todoService.getDefaultTodo();
        this.step = 0;
        this.isCreateStart = false;
        this.isAddTodoError = false;
      }, () => {
        this.isAddTodoError = true;
      });
  }

  removeTodo(id: number): void {
    this.dialogService.addDialog(ConfirmModalComponent, {
      title: 'Delete Todo',
      question: 'Are you sure you want to remove todo?'
    }).subscribe((result) => {
      if (result) {
        this.todoService.removeTodo(id)
          .subscribe((res) => {
            this.initTodoList();
          });
      }
    });
  }

  startNewTodo(): void {
    this.isCreateStart = true;
  }

  startUpdateTodo(todo: Todo): void {
    const tempDate = new Date(todo.date);
    const prefixMonth = tempDate.getMonth() + 1 < 10 ? '0' : '';
    const prefixDay = tempDate.getDate() < 10 ? '0' : '';
    todo.date = `${tempDate.getFullYear()}-${prefixMonth}${tempDate.getMonth() + 1}-${prefixDay}${tempDate.getDate()}`;
    this.dialogService.addDialog(EditTodoModalComponent, {
      updateTodo: todo
    })
      .subscribe((result) => {
        if (result) {
          this.todoService.updateTodo(result)
            .subscribe((res) => {
              this.initTodoList();
              this.isListSuccess = true;
            }, () => {
              this.isListSuccess = false;
            });
        }
      });
  }

  changeStep(progress: number): void {
    if (progress === 1) {
      if (this.step === 0 && !this.newTodo.title) {
        this.required.title = true;
        return;
      }
      if (this.step === 1 && !this.newTodo.description) {
        this.required.desc = true;
        return;
      }
    }
    this.step += progress;
  }

  onRequiredChange(prop: string, value: string): void {
    this.required[prop] = !value;
  }

}
