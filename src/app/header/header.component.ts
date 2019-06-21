import { Component, Input, OnInit } from '@angular/core';

import { User } from '../services/todo.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  @Input() user: User = new User();
  theme: 'dark'|'light' = 'light';

  constructor() { }

  ngOnInit() {
  }

  changeTheme(color) {
    this.theme = color;
  }
}
