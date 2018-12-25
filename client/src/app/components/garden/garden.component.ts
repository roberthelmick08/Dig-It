import { GardenPlant } from './../../../models/gardenPlant';
import { AuthenticationService } from './../../services/authentication.service';
import { DataService } from './../../services/data.service';
import { User } from 'src/models/user';
import { Component, Output, EventEmitter, OnInit } from '@angular/core';

@Component({
  selector: 'app-garden',
  templateUrl: './garden.component.html',
  styleUrls: ['./garden.component.scss']
})
export class GardenComponent implements OnInit {
  user: User;
  isGridItemOnHover: boolean = false;
  hoverIndex: number;
  @Output() openPlantDetailsDialogEvent = new EventEmitter();

  constructor(public dataService: DataService, public authService: AuthenticationService) { }

  ngOnInit() {
    this.authService.getUser().subscribe(user => {
      this.user = user;
    }, (err) => {
      console.error(err);
      this.dataService.openSnackBar('fail');
    });
  }

  openPlantDetailsDialog(plant: GardenPlant) {
    const data = {
      plant: plant,
      user: this.user
    };
    this.openPlantDetailsDialogEvent.emit(data);
  }

  removePlantFromGarden(plant: GardenPlant) {
    this.user.garden.splice(this.user.garden.findIndex(p => plant === p), 1);
    this.authService.updateUser(this.user).subscribe( data => { }, (err) => {
      this.dataService.openSnackBar('fail');
    }, () => {
      let plantName = plant.commonName ? plant.commonName : plant.botanicalName;
      this.dataService.openSnackBar('success', plantName + ' has been removed from your garden.');
    });
  }

  setGridItemHover(isHover, index: number) {
    this.isGridItemOnHover = isHover;
    this.hoverIndex = index;
  }
}
