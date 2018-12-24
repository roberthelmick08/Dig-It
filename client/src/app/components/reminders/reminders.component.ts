import { Component, OnInit, Input } from '@angular/core';
import { User } from 'src/models/user';
import { GardenPlant } from 'src/models/gardenPlant';
import { ReminderService } from 'src/app/services/reminder.service';

@Component({
  selector: 'app-reminders',
  templateUrl: './reminders.component.html',
  styleUrls: ['./reminders.component.scss']
})
export class RemindersComponent implements OnInit {
  @Input() user: User;
  plantsWithActiveReminders: Array<GardenPlant> = [];

  constructor(private reminderService: ReminderService) { }

  ngOnInit() {
    const today = new Date();

    for(let plant of this.user.garden){
      let tempReminders = plant.reminders.filter(reminder => {
          const reminderDate = new Date(reminder.date);
          return reminderDate <= today && reminderDate > this.reminderService.addDays(today, -30);
      });
      if(tempReminders.length > 0){
        this.plantsWithActiveReminders.push(plant);
      }
    }
    console.log(this.plantsWithActiveReminders);
  }

  loadUser(){
    console.log(this.user)
  }
}
