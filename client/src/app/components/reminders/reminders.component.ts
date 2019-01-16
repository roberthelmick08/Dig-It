import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { User } from 'src/models/user';
import { GardenPlant } from 'src/models/gardenPlant';
import { ReminderService } from 'src/app/services/reminder.service';
import { Reminder } from 'src/models/reminder';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-reminders',
  templateUrl: './reminders.component.html',
  styleUrls: ['./reminders.component.scss']
})
export class RemindersComponent implements OnInit {
  @Input() user: User;
  @Output() markReminderDoneEvent = new EventEmitter();
  @Output() openPlantDetailsDialogEvent = new EventEmitter();
  plantsWithActiveReminders: Array<GardenPlant> = [];
  today: Date = new Date();
  // Reminder hover state toggles
  isOnHover: boolean = false;
  plantIndex: number;
  reminderIndex: number;

  constructor(private reminderService: ReminderService, public dataService: DataService) { }

  ngOnInit() {
    for(let plant of this.user.garden){
      let tempReminders = plant.reminders.filter(reminder => {
          return this.isReminderVisible(reminder);
      });
      if(tempReminders.length > 0){
        this.plantsWithActiveReminders.push(plant);
      }
    }
  }

  onMouseEnter(plantIndex: number, reminderIndex: number){
    this.isOnHover = true;
    this.reminderIndex = reminderIndex;
    this.plantIndex = plantIndex
  }

  onMouseLeave(){
    this.isOnHover = false;
    this.reminderIndex = null;
    this.plantIndex = null;
  }

  getRemindersTabHeight(){
    const gridItemWidth: number = 200;
    const gridItemRightPadding: number = 16;
    const remindersWidth = this.plantsWithActiveReminders.length * (gridItemWidth + gridItemRightPadding);
    let elem =  document.getElementById("remindersList");

    if(remindersWidth < elem.offsetWidth){
      return 166;
    } else{
      return 182;
    }
  }

  markReminderDone(plant: GardenPlant, reminder: Reminder){
    this.plantsWithActiveReminders.splice(this.plantsWithActiveReminders.findIndex(tempPlant => {
      return tempPlant._id === plant._id;
    }), 1);

    const data = {
      plant: plant,
      reminder: reminder
    }
    this.markReminderDoneEvent.emit(data);
  }

  openPlantDetailsDialog(plant: GardenPlant){
    const data = {
      plant: plant,
      user: this.user
    }
    this.openPlantDetailsDialogEvent.emit(data);
  }

  isReminderVisible(reminder: Reminder): boolean {
    const reminderDate = new Date(reminder.date);
    return this.today >= reminderDate && reminderDate > this.reminderService.addDays(this.today, -30);
  }
}
