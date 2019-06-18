import { Component, ElementRef, HostListener, Input, OnInit, ViewChild } from '@angular/core';
import { MatSnackBar } from '@angular/material';

import { TodoTask, TodoList, TodoService } from '../services/todo.service';

import { TopDownAnimation } from '../animations';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
  animations: [ TopDownAnimation ]
})
export class ListComponent implements OnInit {
  @Input() list: TodoList;
  @Input() archive: boolean;
  tasks: TodoTask[];
  task: TodoTask = new TodoTask();
  dropdown = false;
  new = false;

  @ViewChild('dropdownMenu', { static: false }) dropdownMenu: ElementRef;

  constructor(
    private todoService: TodoService,
    private snackbar: MatSnackBar
  ) { }

  ngOnInit() {
    this.getTasks();
  }

  @HostListener('document:click', ['$event']) clickout(event) {
    if (!this.dropdownMenu.nativeElement.contains(event.target)) {
      this.dropdown = false;
    }
  }

  toggleDropdown() {
    this.dropdown = !this.dropdown;
  }

  deleteList() {
    this.todoService.deleteList(this.list)
      .subscribe(
        res => {
          this.snackbar.open(`Success! Your list, ${res.name}, has been deleted!`, '', {
            duration: 2000,
            panelClass: 'success'
          });
        },
        err => console.log(err)
      );
  }

  getTasks() {
    this.todoService.getTasks()
      .subscribe(
        res => {
          if (!this.archive) {
            this.tasks = res.filter(task => task.list === this.list.name && !task.archived);
          } else {
            this.tasks = res.filter(task => task.list === this.list.name && task.archived)
          }
        },
        err => console.log(err)
      );
  }

  newTask() {
    this.new = true;
    this.task.list = this.list.name;
  }

  cancel() {
    this.new = false;
  }

  checkVal(e) {
    if (!e.target.value.length) {
      this.cancel();
    }
  }

  submit(data) {
    this.todoService.addTask(data)
      .subscribe(
        res => {
          this.snackbar.open(`Success! Your new task, ${res.description}, has been added!`, '', {
            duration: 2000,
            panelClass: 'success'
          });
          this.getTasks();
          this.reset();
        },
        err => console.log(err)
      );

    return false;
  }

  reset() {
    this.task = new TodoTask();
    this.new = false;
  }
}
