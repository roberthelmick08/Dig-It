import { ReminderService } from './../../services/reminder.service';
import { GardenPlant } from './../../../models/gardenPlant';
import { AuthenticationService } from './../../services/authentication.service';
import { Plant } from './../../../models/plant';
import { DataService } from './../../services/data.service';
import { User } from 'src/models/user';
import { Component, Output, EventEmitter, OnInit } from '@angular/core';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { Reminder } from 'src/models/reminder';

@Component({
  selector: 'app-garden',
  templateUrl: './garden.component.html',
  styleUrls: ['./garden.component.scss']
})
export class GardenComponent implements OnInit {

  user: User;

  @Output()
  openPlantDetailsDialogEvent = new EventEmitter();

  constructor(public dataService: DataService, public authService: AuthenticationService, private reminderService: ReminderService) { }

  ngOnInit() {
    this.authService.getUser().subscribe(user => {
      this.user = user;
    }, (err) => {
      console.error(err);
    });
  }

  markReminderDone(plant: GardenPlant, reminder: Reminder) {
    if (reminder.name === 'water' || reminder.name === 'sow') {
      // this.reminderService.setWaterReminder
    } else {
      plant.reminders.splice(plant.reminders.findIndex(r => reminder === r), 1);
    }
    this.authService.updateUser(this.user).subscribe( data => { });
  }

  openPlantDetailsDialog(plant: Plant) {
    const data = {
      plant: plant,
      user: this.user
    };
    this.openPlantDetailsDialogEvent.emit(data);
  }

  removePlantFromGarden(plant: GardenPlant) {
    this.user.garden.splice(this.user.garden.findIndex(p => plant === p), 1);
    this.authService.updateUser(this.user).subscribe( data => {
    });
  }

  // To handle drag and drop event
  onDrop(event: CdkDragDrop<string[]>) {
    moveItemInArray(
       this.user.garden,
       event.previousIndex,
       event.currentIndex
      );
    }
}
