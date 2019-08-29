import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { EditTodoModalComponent } from './edit-todo-modal.component';
import { DialogService } from 'ng2-bootstrap-modal';

describe('EditTodoModalComponent', () => {
  let component: EditTodoModalComponent;
  let fixture: ComponentFixture<EditTodoModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditTodoModalComponent ],
      imports: [
        FormsModule,
        ReactiveFormsModule
      ],
      providers: [DialogService]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditTodoModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  // it('should create', () => {
  //   expect(component).toBeTruthy();
  // });
});
