import { AuthenticationService } from './../../services/authentication.service';
import { Plant } from './../../../models/plant';
import { DataService } from './../../services/data.service';
import { Component, Output, EventEmitter, OnInit } from '@angular/core';
import { User } from 'src/models/user';

@Component({
  selector: 'app-garden',
  templateUrl: './garden.component.html',
  styleUrls: ['./garden.component.scss']
})
export class GardenComponent implements OnInit {

  user: User;

  gardenName: string = 'My Garden';

  @Output()
  openPlantDetailsDialogEvent = new EventEmitter();

  constructor(private dataService: DataService, public authService: AuthenticationService) { }

  ngOnInit() {
    this.authService.garden().subscribe(user => {
      this.user = user;
      console.log(user);
    }, (err) => {
      console.error(err);
    });
  }

  markReminderDone(plant, reminder) {
    plant.reminders.splice(plant.reminders.findIndex(r => reminder === r), 1);
  }

  openPlantDetailsDialog(plant: Plant) {
    this.openPlantDetailsDialogEvent.emit(plant);
  }

  saveGardenName(event) {
    this.gardenName = event.path[0].innerText;
  }
}
