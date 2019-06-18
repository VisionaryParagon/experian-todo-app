import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatSnackBar } from '@angular/material';

import { TodoTask, TodoService } from '../services/todo.service';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.scss']
})
export class TaskComponent implements OnInit {
  @Input() task: TodoTask;
  @Input() archive: boolean;
  @Output() change = new EventEmitter();

  constructor(
    private snackbar: MatSnackBar,
    private todoService: TodoService
  ) { }

  ngOnInit() {
  }

  updateTask(e) {
    this.task.description = e.target.value;
    this.todoService.updateTask(this.task)
      .subscribe(
        res => {
          this.task = res;
          this.change.emit(null);
        },
        err => console.log(err)
      );
  }

  archiveTask() {
    this.todoService.archiveTask(this.task)
      .subscribe(
        res => {
          this.snackbar.open(`Success! Your task, ${res.description}, has been archived!`, '', {
            duration: 2000,
            panelClass: 'success'
          });
          this.change.emit(null);
        },
        err => console.log(err)
      );
  }

  unarchiveTask() {
    this.todoService.unarchiveTask(this.task)
      .subscribe(
        res => {
          this.snackbar.open(`Success! Your task, ${res.description}, has been unarchived!`, '', {
            duration: 2000,
            panelClass: 'success'
          });
          this.change.emit(null);
        },
        err => console.log(err)
      );
  }

  deleteTask() {
    this.todoService.deleteTask(this.task)
      .subscribe(
        res => {
          this.snackbar.open(`Success! Your task, ${res.description}, has been deleted!`, '', {
            duration: 2000,
            panelClass: 'success'
          });
          this.change.emit(null);
        },
        err => console.log(err)
      );
  }
}
