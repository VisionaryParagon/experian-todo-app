import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// App Routes
import { TodoListsComponent } from './todo-lists/todo-lists.component';
import { ArchiveComponent } from './archive/archive.component';

const routes: Routes = [
  {
    path: '',
    component: TodoListsComponent
  },
  {
    path: 'archive',
    component: ArchiveComponent
  },
  {
    path: '**',
    redirectTo: '/'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
