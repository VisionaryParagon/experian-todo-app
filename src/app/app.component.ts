import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';

import { User, TodoService } from './services/todo.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  user: User = new User();
  slug: string;

  constructor(
    private router: Router,
    private todoService: TodoService
  ) {}

  ngOnInit() {
    // get user data on init
    this.getUser();

    // subscribe to route changes and update slug
    this.router.events.subscribe((ev: any) => {
      if (ev instanceof NavigationEnd) {
        this.slug = ev.url.split('/').pop();
      }
    });
  }

  // get user from todo service
  getUser() {
    this.todoService.getUser()
      .subscribe(
        res => this.user = res,
        err => console.log(err)
      );
  }
}
