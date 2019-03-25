import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  iconPath: string = '../../../assets/icons/';

  selectedSlideIndex: number = 0;

  timer: any;

  isButtonOnHover: boolean = false;

  // Array to store Slider Objects
  slides: Array<any> = [{
    imgSrc: this.iconPath + 'farmer.svg',
    innerHTML: 'Dig-It was created for gardeners who struggle to keep their plants strong and healthy. <br><br>Dig-It. Saves. Lives.'
  },
  {
    imgSrc: this.iconPath + 'position.svg',
    innerHTML: 'Plug in your ZIP code at registration, and Dig-It will give you growing tips specific to your location.'
  },
  {
    imgSrc: this.iconPath + 'watering-can.svg',
    innerHTML: 'Never forget to water, re-pot, or harvest your plants again!'
  },
  {
    imgSrc: this.iconPath + 'world.svg',
    innerHTML: 'Dig-It\'s extensive crowdsourced database gives details of any plant in the world!'
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
  }

  toggleButtonHover(isOnHover: boolean){
    this.isButtonOnHover = isOnHover;
  }

  selectOverviewItem(index: number){
    this.selectedSlideIndex = index;
    clearInterval(this.timer);
  }
}
