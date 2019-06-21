import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';

import { TodoItem, TodoList, TodoService } from '../../services/todo.service';
import { AlertService } from 'src/app/services/alert.service';

import { NewItemComponent } from '../../modals/new-item/new-item.component';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit, OnDestroy {
  sub: Subscription
  slug: string;
  list: TodoList = new TodoList();
  item: TodoItem = new TodoItem();
  items: TodoItem[] = [];
  selectedItems: TodoItem[] = [];
  /*
  gridOptions = {
    rowSelection: 'multiple',
    suppressRowClickSelection: true,
    suppressCellSelection: true,
    columnDefs: [
      { field: '', headerName: '', cellStyle: { borderRight: '1px solid #ccc' }, checkboxSelection: true, headerCheckboxSelection: true, sortable: false, width: 57 },
      { field: 'description', headerName: 'Item', sortable: true }
    ],
    rowData: [],
    api: {
      deselectAll: () => { console.log('deselected') }
    }
  };
  */
  columns = [
    { field: 'description', name: 'Item', sort: true }
  ];

  // @ViewChild('itemTable', { static: true }) itemTable: ElementRef;
  @ViewChild('listTable', { static: true }) table: ElementRef;
  @ViewChild('newItemModal', { static: true }) modal: ElementRef;
  @ViewChild(NewItemComponent, { static: true }) itemForm: NewItemComponent;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private todoService: TodoService,
    private alertService: AlertService
  ) { }

  ngOnInit() {
    // Subscribe to route changes
    this.sub = this.route.paramMap.subscribe(params => {
      // Set new slug
      this.slug = params.get('slug');

      // Get list with new slug
      this.getList(this.slug);
    });
  }

  // Get list with slug from todo service
  getList(slug) {
    if (slug) {
      this.todoService.getList(slug)
        .subscribe(
          res => {
            if (res) {
            // If a list is returned, set list and get items
              this.list = res;
              this.getItems();
            } else {
              // If no list is returned, redirect to error page
              this.router.navigateByUrl('/error');
            }
          },
          err => console.log(err)
        );
    }
  }

  // Get items from todo service
  getItems() {
    this.todoService.getItems()
      .subscribe(
        res => {
          this.items = res.filter(item => item.list === this.list.name && !item.archived);
          // this.gridOptions.rowData = this.items;
          this.clearSelected();
        },
        err => console.log(err)
      );
  }

  // Delete list with todo service
  deleteList() {
    this.todoService.deleteList(this.list)
      .subscribe(
        res => {
          // Show success message
          this.alertService.createAlert(`Success! Your list, ${res.name}, has been deleted!`, 'success');

          // Redirect to home page
          this.router.navigateByUrl('/');
        },
        err => console.log(err)
      );
  }

  // Modal Controls
  openModal() {
    this.modal.nativeElement.show();

    // Set focus to input when modal opens
    this.itemForm.setFocus();
  }

  closeModal() {
    this.modal.nativeElement.hide();

    // Refresh items
    this.getItems();
  }

  reset() {
    this.item = new TodoItem();
    this.itemForm.hideError();
  }

  // Update selected items
  changeSelected(ev) {
    this.selectedItems = ev.detail;
  }

  clearSelected() {
    // this.itemTable.nativeElement.clearSelection();
    this.table.nativeElement.clearSelection();
  }

  // Archive selected items
  archiveItems() {
    // Set message text
    const msg = this.selectedItems.length > 1 ? 'items have' : 'item has';

    this.todoService.archiveItems(this.selectedItems)
      .subscribe(
        res => {
          // Show success message
          this.alertService.createAlert(`Success! Your ${msg} been archived!`, 'success');

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

  ngOnDestroy() {
    // Unsubscribe all subscriptions on destroy
    if (this.sub) {
      this.sub.unsubscribe();
    }
  }
}
