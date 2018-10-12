import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-garden',
  templateUrl: './garden.component.html',
  styleUrls: ['./garden.component.scss']
})
export class GardenComponent implements OnInit {

  userPlants = [
    {
      botanicalName: 'Peruvian Torch',
      commonName: 'San Pedro',
      reminders: ['water', 'transplant'],
      stage: 1
    },
    {
      botanicalName: 'Peruvian Torch',
      commonName: 'San Pedro',
      reminders: ['water', 'move-outside'],
      stage: 1
    },
];

  constructor() { }

  ngOnInit() {
  }
  

}
