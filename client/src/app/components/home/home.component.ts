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

  iconPath: string = "../../../assets/icons/";

  // Used to trigger slide-out animation
  isSlideOut: boolean = false;
  // Used to trigger slider animation
  sliderStep: number = 0;

  // Array to store Slider Objects
  slides: Array<any> = [{
    imgSrc: this.iconPath + 'gardening-tools.svg',
    innerHTML: "Dig-It was created for gardeners who struggle to keep their plants strong and healthy. <br><br><span class='highlight'>Dig-It. Saves. Lives.</span>"
  },
  {
    imgSrc: this.iconPath + 'reminders/repot.svg',
    innerHTML: "Plug in your ZIP code at registration, and Dig-It will give you growing tips <span class='highlight'>specific to your location.</span>"
  },
  {
    imgSrc: this.iconPath + 'watering-can.svg',
    innerHTML: "Never forget to <span class='highlight'>water</span>, re-pot, or harvest your plants again!"
  },
  {
    imgSrc: this.iconPath + 'ecology.svg',
    innerHTML: "Dig-It's extensive crowdsourced database gives details of <span class='highlight'>any plant in the world!</span>"
  }
]

  constructor() { }

  ngOnInit() {
    this.toggleSliderAnimation();
  }

  toggleSliderAnimation(){
    setTimeout( () => {
      if(this.sliderStep === this.slides.length - 1){
        this.sliderStep = 0;
      } else{
        this.sliderStep++;
      }
      this.isSlideOut = true;
          setTimeout( () => {
            this.isSlideOut = false;
            this.toggleSliderAnimation();
          }, 500);
    }, 10000);
  }
}
