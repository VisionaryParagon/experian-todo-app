import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material';

import { TodoList, TodoService } from '../services/todo.service';

import { FadeAnimation, TopDownAnimation } from '../animations';

@Component({
  selector: 'app-todo-lists',
  templateUrl: './todo-lists.component.html',
  styleUrls: ['./todo-lists.component.scss'],
  animations: [ FadeAnimation, TopDownAnimation ]
})
export class TodoListsComponent implements OnInit {
  lists: TodoList[];
  list: TodoList = new TodoList();
  new = false;

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

  newList() {
    this.new = true;
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
    this.todoService.addList(data)
      .subscribe(
        res => {
          this.snackbar.open(`Success! Your new list, ${res.name}, has been added!`, '', {
            duration: 2000,
            panelClass: 'success'
          });
          this.reset();
        },
        err => console.log(err)
      );

    return false;
  }

  reset() {
    this.list = new TodoList();
    this.new = false;
  }
}
