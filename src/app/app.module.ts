import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

// App Modules
import { AppSharedModule } from './app-shared.module';
import { AppRoutingModule } from './app-routing.module';

// Components
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { SidebarComponent } from './sidebar/sidebar.component';

// Routes
import { HomeComponent } from './routes/home/home.component';
import { ListComponent } from './routes/list/list.component';
import { ArchiveComponent } from './routes/archive/archive.component';
import { ErrorComponent } from './routes/error/error.component';

// Modals
import { NewListComponent } from './modals/new-list/new-list.component';
import { NewItemComponent } from './modals/new-item/new-item.component';

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
    SidebarComponent,
    HomeComponent,
    ListComponent,
    ArchiveComponent,
    ErrorComponent,
    NewListComponent,
    NewItemComponent
  ],
  entryComponents: [
    NewListComponent,
    NewItemComponent
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
