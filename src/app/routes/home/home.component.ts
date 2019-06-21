import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';

import { User, TodoList, TodoService } from '../../services/todo.service';

import { NewListComponent } from '../../modals/new-list/new-list.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  user: User = new User();
  list: TodoList = new TodoList();

  @ViewChild('newListModal', { static: true }) modal: ElementRef;
  @ViewChild(NewListComponent, { static: true }) listForm: NewListComponent;

  constructor(
    private router: Router,
    private todoService: TodoService
  ) { }

  ngOnInit() {
    // Get user data on init
    if (!this.user.details.firstName) {
      this.getUser();
    }
  }

  // Get user from todo service
  getUser() {
    this.todoService.getUser()
      .subscribe(
        res => this.user = res,
        err => console.log(err)
      );
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
