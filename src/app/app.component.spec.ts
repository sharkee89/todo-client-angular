import { TestBed, async } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';

describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule
      ],
      declarations: [
        AppComponent
      ],
    }).compileComponents();
  }));

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have as title 'todo-app'`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app.title).toEqual('todo-app');
  });

  it('should render title', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('.fix-image').textContent).toBeDefined();
    expect(compiled.querySelector('.fix-image .first').textContent).toBeDefined();
    expect(compiled.querySelector('.fix-image .second').textContent).toBeDefined();
    expect(compiled.querySelector('.fix-image .third').textContent).toBeDefined();
    expect(compiled.querySelector('.fix-image .fourth').textContent).toBeDefined();
    expect(compiled.querySelector('.fix-image .fifth').textContent).toBeDefined();
  });

});
