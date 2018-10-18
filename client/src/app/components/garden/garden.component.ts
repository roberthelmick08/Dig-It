import { Plant } from './../../../models/plant';
import { DataService } from './../../services/data.service';
import { Component, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-garden',
  templateUrl: './garden.component.html',
  styleUrls: ['./garden.component.scss']
})
export class GardenComponent {

  @Output()
  openPlantDetailsDialogEvent = new EventEmitter();

  userPlants = [
    {
      botanicalName: 'Peruvian Torch',
      commonName: 'San Pedro',
      reminders: ['water', 'repot'],
      stage: 2
    },
    {
      botanicalName: 'Peruvian Torch',
      commonName: 'San Pedro',
      reminders: ['water', 'repot'],
      stage: 1
    },
    {
      botanicalName: 'Peruvian Torch',
      commonName: 'San Pedro',
      reminders: ['water', 'repot'],
      stage: 4
    },
    {
      botanicalName: 'Peruvian Torch',
      commonName: 'San Pedro',
      reminders: ['water', 'repot'],
      stage: 3
    },
    {
      botanicalName: 'Peruvian Torch',
      commonName: 'San Pedro',
      reminders: ['water', 'repot'],
      stage: 5
    },
    {
      botanicalName: 'Peruvian Torch',
      commonName: 'San Pedro',
      reminders: ['water', 'repot'],
      stage: 1
    },
    {
      botanicalName: 'Peruvian Torch',
      commonName: 'San Pedro',
      reminders: ['water', 'repot'],
      stage: 1
    },
    {
      botanicalName: 'Peruvian Torch',
      commonName: 'San Pedro',
      reminders: ['water', 'repot'],
      stage: 1
    },
];

  constructor(private dataService: DataService) { }

  markReminderDone(plant, reminder) {
    plant.reminders.splice(plant.reminders.findIndex(r => reminder === r), 1);
  }

  openPlantDetailsDialog(plant: Plant) {
    this.openPlantDetailsDialogEvent.emit(plant);
  }
}
