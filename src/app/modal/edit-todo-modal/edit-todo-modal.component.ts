import { Component, OnInit } from '@angular/core';
import { DialogComponent, DialogService } from 'ng2-bootstrap-modal';
import { Todo } from 'src/app/todo/todo.model';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

export interface EditTodoModalModel {
  updateTodo: Todo;
}

@Component({
  selector: 'app-edit-todo-modal',
  templateUrl: './edit-todo-modal.component.html',
  styleUrls: ['./edit-todo-modal.component.scss']
})
export class EditTodoModalComponent extends DialogComponent<EditTodoModalModel, Todo> implements EditTodoModalModel, OnInit {

  updateTodo: Todo;
  tempTodo: Todo;

  editTodoForm: FormGroup;

  constructor(
    fb: FormBuilder,
    dialogService: DialogService
  ) {
    super(dialogService);
    this.editTodoForm = fb.group({
        title: ['', Validators.required],
        description: ['', Validators.required],
        date: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.init();
  }

  init(): void {
    this.tempTodo = JSON.parse(JSON.stringify(this.updateTodo));
  }

  apply(): void {
    this.result = this.tempTodo;
    this.close();
  }

}
