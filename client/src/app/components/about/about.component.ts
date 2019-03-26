import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss']
})
export class AboutComponent implements OnInit {

  @Output() refreshAnimationsEvent = new EventEmitter();

  constructor() { }

  ngOnInit() {
    // Initialize scroll animations
    this.refreshAnimationsEvent.emit();
  }



}
