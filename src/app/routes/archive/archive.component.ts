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
  gridOptions = {
    rowSelection: 'multiple',
    suppressRowClickSelection: true,
    suppressCellSelection: true,
    columnDefs: [
      { field: '', headerName: '', cellStyle: { borderRight: '1px solid #ccc' }, checkboxSelection: true, headerCheckboxSelection: true, sortable: false, width: 57 },
      { field: 'description', headerName: 'Item', cellStyle: { borderRight: '1px solid #ccc' }, sortable: true },
      { field: 'list', headerName: 'List', cellStyle: { borderRight: '1px solid #ccc' }, sortable: true }
    ],
    rowData: this.items
  };

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
          // Set items to apply to archived only
          this.items = res.filter(item => item.archived);

          // Set grid options data
          this.gridOptions.rowData = this.items;

          // Clear table selections
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
    this.table.nativeElement.refresh();
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
