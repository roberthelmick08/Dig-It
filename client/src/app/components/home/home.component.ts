import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  iconPath: string = '../../../assets/icons/';

  selectedSlideIndex: number = 0;

  timer: any;

  @Output() refreshAnimationsEvent = new EventEmitter();
  @Output() setCurrentPageEvent = new EventEmitter;

  // Array to store Slider Objects
  slides: Array<any> = [{
    imgSrc: this.iconPath + 'farmer.svg',
    innerHTML: 'Dig-It was created for gardeners who struggle to keep their plants strong and healthy. <br><br><span class="highlight-blue">Dig-It.  Saves.  Lives.</span>'
  },
  {
    imgSrc: this.iconPath + 'position.svg',
    innerHTML: 'Plug in your ZIP code at registration, and Dig-It will give you <span class="highlight-blue">growing tips</span> specific to your location.'
  },
  {
    imgSrc: this.iconPath + 'watering-can.svg',
    innerHTML: '<span class="highlight-blue">Never forget</span> to water, re-pot, or harvest your plants again.'
  },
  {
    imgSrc: this.iconPath + 'world.svg',
    innerHTML: 'Dig-It\'s extensive crowdsourced database gives details of <span class="highlight-blue">any plant in the world.</span>'
  }
];

  constructor() { }

  ngOnInit() {
    this.timer = setInterval( () => {
        if(this.selectedSlideIndex === this.slides.length - 1){
          this.selectedSlideIndex = 0;
        } else{
          this.selectedSlideIndex++;
        }
      }, 10000);
    // Initialize scroll animations
      this.refreshAnimationsEvent.emit();
  }

  navigateToPage(page: string){
    this.setCurrentPageEvent.emit(page);
  }

  selectOverviewItem(index: number){
    this.selectedSlideIndex = index;
    clearInterval(this.timer);
  }
}
