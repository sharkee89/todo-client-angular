import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { TodoComponent } from './todo.component';
import { TitlePipe } from 'src/app/pipes/title.pipe';
import { DialogService } from 'ng2-bootstrap-modal';
import { TodoService } from './todo.service';
import { Observable } from 'rxjs';
import { of } from 'rxjs';

class TodoServiceStub {
  constructor(){}

  getTodoList() { return of({});}
}

describe('TodoComponent', () => {
  let component: TodoComponent;
  let fixture: ComponentFixture<TodoComponent>;
  let mockedTodoService;
  let mockedDialogService;
  const defaultTodo = {
    title: '',
    description: '',
    date: null
  };

  mockedTodoService = {
    getTodoList: () => {
      return of([])
    },
    getDefaultTodo: () => {
      return 
    },
    saveTodo: () => {
      return of({
        id: '123'
      });
    },
    removeTodo: () => {
      return of('');
    },
    updateTodo: () => {
      return of({
        id: '123'
      });
    },
  }

  mockedDialogService = {
    addDialog: () => {
      return of(true)
    }
  }

  beforeEach(async(() => {
    spyOn(mockedTodoService, 'getTodoList').and.returnValue(of([]));
    spyOn(mockedTodoService, 'getDefaultTodo').and.returnValue(of(defaultTodo));
    spyOn(mockedTodoService, 'saveTodo').and.returnValue(of({id: '123'}));
    spyOn(mockedTodoService, 'updateTodo').and.returnValue(of({id: '123'}));
    spyOn(mockedTodoService, 'removeTodo').and.returnValue(of(''));
    spyOn(mockedDialogService, 'addDialog').and.returnValue(of(true));
    TestBed.configureTestingModule({
      declarations: [ TodoComponent, TitlePipe ],
      imports: [
        FormsModule,
        ReactiveFormsModule,
        HttpClientTestingModule
      ],
      providers: [
        {provide: DialogService, useValue: mockedDialogService},
        {provide: TodoService, useValue: mockedTodoService}
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TodoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should init correcly', () => {
    spyOn(component, 'initConfiguration');
    spyOn(component, 'initTodoList');
    component.init();
    expect(component.initConfiguration).toHaveBeenCalled();
    expect(component.initTodoList).toHaveBeenCalled();
  });

  it('should initConfiguration correctly', () => {
    component.initConfiguration();
    expect(component.isCreateStart).toBeFalsy();
    expect(component.step).toEqual(0);
    expect(component.titleFilterValue).toEqual('');
  });

  it('should initTodoList correctly', () => {
    component.initTodoList();
    expect(mockedTodoService.getTodoList).toHaveBeenCalled();
  });

  it('should saveTodo correctly', () => {
    let newTodo = {title: '', description: '', date: null};
    component.saveTodo(newTodo);
    expect(component.required.date).toBeTruthy();
    component.required.date = false;
    newTodo.date = '2019-05-05';
    component.saveTodo(newTodo);
    expect(component.required.date).toBeFalsy();
  });

  it('should removeTodo correctly', () => {
    component.removeTodo(1);
    expect(mockedDialogService.addDialog).toHaveBeenCalled();
  });

  it('should startNewTodo correctly', () => {
    component.startNewTodo();
    expect(component.isCreateStart).toBeTruthy();
  });

  it('should startUpdateTodo correctly', () => {
    const todo = {title: 'Test', description: 'Test', date: '2019-05-05'};
    component.startUpdateTodo(todo);
    expect(mockedDialogService.addDialog).toHaveBeenCalled();
  });

  it('should changeStep correctly', () => {
    component.newTodo = {
      title: '',
      description: '',
      date: ''
    }
    component.step = 0;
    component.changeStep(1);
    expect(component.required.title).toBeTruthy();
    component.required.title = false;
    component.newTodo.title = 'Test';
    component.changeStep(1);
    expect(component.required.title).toBeFalsy();
    expect(component.step).toEqual(1);
    
    component.changeStep(1);
    expect(component.required.desc).toBeTruthy();
    component.required.desc = false;
    component.newTodo.description = 'Test';
    component.changeStep(1);
    expect(component.required.title).toBeFalsy();
    expect(component.step).toEqual(2);
  });

  it('should onRequiredChange correctly', () => {
    component.onRequiredChange('title', 'Some test');
    expect(component.required.title).toBeFalsy();
    component.onRequiredChange('title', null);
    expect(component.required.title).toBeTruthy();
  });

});
