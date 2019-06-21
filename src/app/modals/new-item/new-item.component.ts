import { Component, ElementRef, EventEmitter, Input, OnInit, ViewChild, Output } from '@angular/core';

import { TodoItem, TodoService } from 'src/app/services/todo.service';
import { AlertService } from 'src/app/services/alert.service';

@Component({
  selector: 'app-new-item',
  templateUrl: './new-item.component.html',
  styleUrls: ['./new-item.component.scss']
})
export class NewItemComponent implements OnInit {
  @Input() list: string;
  @Input() item: TodoItem = new TodoItem();
  @Output() close = new EventEmitter();
  isFocused = false;
  invalid = false;

  @ViewChild('description', { static: true }) itemDescription: ElementRef;

  constructor(
    private todoService: TodoService,
    private alertService: AlertService
  ) { }

  ngOnInit() {
  }

  // Input focus controls
  setFocus() {
    this.itemDescription.nativeElement.focus();
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

  submit() {
    // Set item's list
    this.item.list = this.list;

    // Validate item
    this.todoService.validateItem(this.item)
      .subscribe(
        res => {
          if (res) {
            // If validation returns item data, set form error
            this.showError();
          } else {
            // If validation returns no data, create new item
            this.item.list = this.list;
            this.todoService.addItem(this.item)
              .subscribe(
                res => {
                  // Show success message
                  this.alertService.createAlert(`Success! Your new item, ${res.description}, has been added!`, 'success');

                  // Emit modal closure
                  this.close.emit();
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
