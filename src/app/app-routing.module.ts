import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// Route Components
import { HomeComponent } from './routes/home/home.component';
import { ListComponent } from './routes/list/list.component';
import { ArchiveComponent } from './routes/archive/archive.component';
import { ErrorComponent } from './routes/error/error.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'list/:slug',
    component: ListComponent
  },
  {
    path: 'archive',
    component: ArchiveComponent
  },
  {
    path: 'error',
    component: ErrorComponent
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
