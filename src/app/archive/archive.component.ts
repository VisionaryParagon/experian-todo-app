import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material';

import { TodoList, TodoService } from '../services/todo.service';

import { FadeAnimation, TopDownAnimation } from '../animations';

@Component({
  selector: 'app-archive',
  templateUrl: './archive.component.html',
  styleUrls: ['./archive.component.scss'],
  animations: [ FadeAnimation, TopDownAnimation ]
})
export class ArchiveComponent implements OnInit {
  lists: TodoList[];
  list: TodoList = new TodoList();

  constructor(
    private todoService: TodoService,
    private snackbar: MatSnackBar
  ) { }

  ngOnInit() {
    this.getLists();
  }

  getLists() {
    this.todoService.getLists()
      .subscribe(
        res => this.lists = res,
        err => console.log(err)
      );
  }
}
