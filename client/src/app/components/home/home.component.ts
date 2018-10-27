import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  @Output()
  navigateToRegisterEvent = new EventEmitter();

  @Output()
  navigateToLoginEvent = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }

}
