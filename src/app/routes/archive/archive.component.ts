import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';

import { TodoItem, TodoService } from '../../services/todo.service';
import { AlertService } from 'src/app/services/alert.service';

@Component({
  selector: 'app-archive',
  templateUrl: './archive.component.html',
  styleUrls: ['./archive.component.scss']
})
export class ArchiveComponent implements OnInit {
  items: TodoItem[] = [];
  selectedItems: TodoItem[] = [];
  columns = [
    { field: 'description', name: 'Item', sortable: true },
    { field: 'list', name: 'List', sortable: true }
  ];

  @ViewChild('listTable', { static: true }) table: ElementRef;

  constructor(
    private todoService: TodoService,
    private alertService: AlertService
  ) { }

  ngOnInit() {
    this.getItems();
  }

  getItems() {
    this.todoService.getItems()
      .subscribe(
        res => {
          this.items = res.filter(item => item.archived);
          this.clearSelected();
        },
        err => console.log(err)
      );
  }

  // Update selected items
  changeSelected(ev) {
    this.selectedItems = ev.detail;
  }

  clearSelected() {
    this.table.nativeElement.clearSelection();
  }

  // Unarchive selected items
  unarchiveItems() {
    // Set message text
    const msg = this.selectedItems.length > 1 ? 'items have' : 'item has';

    this.todoService.unarchiveItems(this.selectedItems)
      .subscribe(
        res => {
          // Show success message
          this.alertService.createAlert(`Success! Your ${msg} been unarchived!`, 'success');

          // Refresh items
          this.getItems();
        },
        err => console.log(err)
      );
  }

  // Delete selected items
  deleteItems() {
    // Set message text
    const msg = this.selectedItems.length > 1 ? 'items have' : 'item has';

    this.todoService.deleteItems(this.selectedItems)
      .subscribe(
        res => {
          // Show success message
          this.alertService.createAlert(`Success! Your ${msg} been deleted!`, 'success');

          // Refresh items
          this.getItems();
        },
        err => console.log(err)
      );
  }
}
