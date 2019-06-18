import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TextFieldModule } from '@angular/cdk/text-field';
import {
  MatIcon,
  MatCardModule,
  MatSnackBarModule
} from '@angular/material';

// App Modules

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    TextFieldModule,
    MatCardModule,
    MatSnackBarModule
  ],
  declarations: [
    MatIcon
  ],
  exports: [
    CommonModule,
    FormsModule,
    TextFieldModule,
    MatIcon,
    MatCardModule,
    MatSnackBarModule
  ]
})
export class AppSharedModule { }
