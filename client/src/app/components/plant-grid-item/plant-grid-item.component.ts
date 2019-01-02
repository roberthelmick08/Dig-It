import { AuthenticationService } from './../../services/authentication.service';
import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Plant } from 'src/models/plant';
import { GardenPlant } from 'src/models/gardenPlant';
import { DataService } from 'src/app/services/data.service';
import { User } from 'src/models/user';

@Component({
  selector: 'app-plant-grid-item',
  templateUrl: './plant-grid-item.component.html',
  styleUrls: ['./plant-grid-item.component.scss']
})
export class PlantGridItemComponent {
  @Input() plant;
  @Input() user: User;
  // Index of grid item on hover
  @Input() index: number;
  // Toggles hover state to show/hide delete button
  @Input() hoverIndex: number;
  // Index of grid item in array
  @Input() isGridItemOnHover: boolean;

  @Output() openPlantDetailsDialogEvent = new EventEmitter();
  @Output() openAddToGardenDialogEvent = new EventEmitter();
  @Output() removePlantFromGardenEvent = new EventEmitter();

  constructor(public dataService: DataService, public authService: AuthenticationService) { }

  openPlantDetailsDialog(plant) {
    const data = {
      plant: plant,
      user: this.user
    };
    this.openPlantDetailsDialogEvent.emit(data);
  }

  openAddToGardenDialog(){
    this.openAddToGardenDialogEvent.emit(this.plant);
  }

  removePlantFromGarden(plant) {
    this.removePlantFromGardenEvent.emit(plant);
  }
}
