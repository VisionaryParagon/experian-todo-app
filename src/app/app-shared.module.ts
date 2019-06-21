import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

// EDS Components
import '@experian/eds-components/src/eds-core';
import '@experian/eds-components/dist/eds-alert';
import '@experian/eds-components/dist/eds-button';
import '@experian/eds-components/dist/eds-checkbox';
import '@experian/eds-components/dist/eds-data-grid';
import '@experian/eds-components/dist/eds-icon';
import '@experian/eds-components/dist/eds-menu-item';
import '@experian/eds-components/dist/eds-modal';
import '@experian/eds-components/dist/eds-popover';
import '@experian/eds-components/dist/eds-primary-header';
import '@experian/eds-components/dist/eds-sidebar';
import '@experian/eds-components/dist/eds-table';
import '@experian/eds-components/dist/eds-textbox';
import '@experian/eds-components/dist/eds-toolbar';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [],
  exports: [
    CommonModule,
    FormsModule
  ]
})
export class AppSharedModule { }
