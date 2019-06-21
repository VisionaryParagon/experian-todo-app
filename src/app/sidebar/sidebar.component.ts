import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';

import { User, TodoList } from '../services/todo.service';

import { NewListComponent } from '../modals/new-list/new-list.component';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {
  @Input() slug: string;
  @Input() user: User = new User();
  list: TodoList = new TodoList();

  @ViewChild('newListModal', { static: true }) modal: ElementRef;
  @ViewChild(NewListComponent, { static: true }) listForm: NewListComponent;

  constructor(
    private router: Router
  ) { }

  ngOnInit() {
  }

  // Modal Controls
  openModal() {
    this.modal.nativeElement.show();

    // Set focus to input when modal opens
    this.listForm.setFocus();
  }

  closeModal(slug?: string) {
    this.modal.nativeElement.hide();

    // Redirect if modal outputs slug
    if (slug) {
      this.router.navigateByUrl(`/list/${slug}`);
    }
  }

  reset() {
    this.list = new TodoList();
    this.listForm.hideError();
  }
}
