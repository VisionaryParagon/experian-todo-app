import { Component, OnInit } from '@angular/core';

import { TopDownAnimation } from '../animations';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  animations: [ TopDownAnimation ]
})
export class HeaderComponent implements OnInit {
  navActive = false;

  constructor() { }

  ngOnInit() {
  }

  toggleMenu() {
    this.navActive = !this.navActive;
  }

  closeMenu() {
    this.navActive = false;
  }
}
