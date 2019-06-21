import { Component, ElementRef, EventEmitter, Input, OnInit, ViewChild, Output } from '@angular/core';

import { TodoList, TodoService } from '../../services/todo.service';
import { AlertService } from 'src/app/services/alert.service';

@Component({
  selector: 'app-new-list',
  templateUrl: './new-list.component.html',
  styleUrls: ['./new-list.component.scss']
})
export class NewListComponent implements OnInit {
  @Input() list: TodoList = new TodoList();
  @Output() close = new EventEmitter<string>();
  isFocused = false;
  invalid = false;

  @ViewChild('listName', { static: true }) listName: ElementRef;

  constructor(
    private todoService: TodoService,
    private alertService: AlertService
  ) { }

  ngOnInit() {
  }

  // Input focus controls
  setFocus() {
    this.listName.nativeElement.focus();
  }

  toggleFocus() {
    this.isFocused = !this.isFocused;
  }

  // Error controls
  showError() {
    this.invalid = true;
  }

  hideError() {
    this.invalid = false;
  }

  goTo(name) {
    this.close.emit(this.createSlug(name));
    this.hideError();
  }

  // Convert list name into kebab case for slug
  createSlug(string) {
    if (string) {
      return string
        .match(/[A-Z]{2,}(?=[A-Z][a-z]+[0-9]*|\b)|[A-Z]?[a-z]+[0-9]*|[A-Z]|[0-9]+/g)
        .map(x => x.toLowerCase())
        .join('-');
    }
    return '';
  }

  // Create new list
  submit(name) {
    // Validate list name
    this.todoService.validateList(name)
      .subscribe(
        res => {
          if (res) {
            // If validation returns list data, set form error
            this.showError();
          } else {
            // If validation returns no data, create new list
            this.list.slug = this.createSlug(name);
            this.todoService.addList(this.list)
              .subscribe(
                res => {
                  // Show success message
                  this.alertService.createAlert(`Success! Your new list, ${res.name}, has been added!`, 'success');

                  // Emit modal closure and redirect to new list
                  this.close.emit(res.slug);
                },
                err => console.log(err)
              );
          }
        },
        err => console.log(err)
      );

    return false;
  }

  cancel() {
    this.close.emit();
  }
}
