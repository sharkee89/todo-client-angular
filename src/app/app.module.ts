import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { BootstrapModalModule } from 'ng2-bootstrap-modal';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TodoComponent } from './todo/todo.component';
import { ConfirmModalComponent } from './modal/confirm-modal/confirm-modal.component';
import { EditTodoModalComponent } from './modal/edit-todo-modal/edit-todo-modal.component';
import { TitlePipe } from './pipes/title.pipe';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';

@NgModule({
  declarations: [
    AppComponent,
    TodoComponent,
    ConfirmModalComponent,
    EditTodoModalComponent,
    TitlePipe
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    BootstrapModalModule.forRoot({container: document.body}),
    AppRoutingModule,
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production })
  ],
  providers: [],
  entryComponents: [
      ConfirmModalComponent,
      EditTodoModalComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
