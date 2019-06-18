import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

// App Modules
import { AppSharedModule } from './app-shared.module';
import { AppRoutingModule } from './app-routing.module';

// Components
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { TodoListsComponent } from './todo-lists/todo-lists.component';
import { ListComponent } from './list/list.component';
import { TaskComponent } from './task/task.component';
import { ArchiveComponent } from './archive/archive.component';

@NgModule({
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppSharedModule,
    AppRoutingModule
  ],
  declarations: [
    AppComponent,
    HeaderComponent,
    TodoListsComponent,
    ListComponent,
    TaskComponent,
    ArchiveComponent
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
