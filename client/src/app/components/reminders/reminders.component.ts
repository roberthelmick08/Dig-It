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

  constructor(private reminderService: ReminderService, private dataService: DataService) { }

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
    return reminderDate <= this.today && reminderDate > this.reminderService.addDays(this.today, -30);
  }

  getReminderTooltipText(plant: GardenPlant, reminder: Reminder): string {
    let tempText = 'Something went wrong!';
    let plantName = plant.commonName ? plant.commonName : plant.botanicalName;

    if (reminder.name === 'repot') {
      if (plant.stage === 1) {
        tempText = 'Repot your ' + plantName + '. It\'s strong enough to be put in a small-medium pot. You can start watering it like normal instead of using a spraybottle.';
      } else {
        tempText = 'Repot your ' + plantName + '. Put it in a medium or large pot. It\'s roots probably need more space to spread out.';
      }
    } else if (reminder.name === 'sow') {
      tempText = 'Time to sow your ' + plantName + ' seeds. Keep the sproutling inside in the warmth until Dig-It instructs you to move it outside.' + this.dataService.getSowingMethodString(plant.methodNum) + ' Seeds should be sown ' + plant.depth + ' inches deep and ' + plant.sowingSpace + ' inches apart.';
    } else if (reminder.name === 'water') {
      tempText = 'Water your ' + plantName + '.';
    } else if (reminder.name === 'spray') {
      tempText = 'Gently spray your ' + plantName + ' with water.';
    } else if (reminder.name === 'move-inside') {
      tempText = 'It\'s about to start hitting freezing temps at night in your area. It\'s time to bring your ' + plantName + ' inside for the winter.';
    } else if (reminder.name === 'move-outside') {
      tempText = 'It\'s finally starting to get warm enough in your area to move your ' + plantName + ' outside.';
    } else if (reminder.name === 'harvest') {
      tempText = 'It\'s just about time to harvest your ' + plantName + '. Look up what signs to look for to ensure your ' + plantName + ' is ripe for harvesting.';
    }
    return tempText;
  }
}
