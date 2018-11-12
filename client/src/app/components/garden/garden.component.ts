import { ReminderService } from './../../services/reminder.service';
import { GardenPlant } from './../../../models/gardenPlant';
import { AuthenticationService } from './../../services/authentication.service';
import { Plant } from './../../../models/plant';
import { DataService } from './../../services/data.service';
import { User } from 'src/models/user';
import { Component, Output, EventEmitter, OnInit } from '@angular/core';
import { Reminder } from 'src/models/reminder';
import { text } from '@angular/core/src/render3/instructions';

@Component({
  selector: 'app-garden',
  templateUrl: './garden.component.html',
  styleUrls: ['./garden.component.scss']
})
export class GardenComponent implements OnInit {

  user: User;

  isGridItemOnHover: boolean = false;

  hoverIndex: number;

  @Output()
  openPlantDetailsDialogEvent = new EventEmitter();

  constructor(public dataService: DataService, public authService: AuthenticationService, private reminderService: ReminderService) { }

  ngOnInit() {
    this.authService.getUser().subscribe(user => {
      this.user = user;
    }, (err) => {
      console.error(err);
      this.dataService.openSnackBar('fail');
    });
  }

  markReminderDone(plant: GardenPlant, reminder: Reminder) {
    plant.reminders.splice(plant.reminders.findIndex(r => reminder === r), 1);
    if (reminder.name === 'water' || reminder.name === 'spray') {
      plant.reminders.push(this.reminderService.setWaterReminder(plant));
    } else if (((reminder.name === 'move-inside' && plant.isPotted) || reminder.name === 'move-outside') && (plant.lifeType === 'Perennial' || plant.lifeType === 'Biennial')) {
      reminder.date = this.reminderService.addDays(reminder.name === 'move-inside' ? this.user.firstFrostDate : this.user.lastFrostDate, 364);
      plant.reminders.push(reminder);
    } else if (reminder.name === 'sow') {
      // Plant stage 0 -> 1 (seed to sproutling)
      plant.stage++;
      plant.reminders.push(this.reminderService.setFrostDateReminder('move-inside', this.user));
      plant.reminders.push(this.reminderService.setFrostDateReminder('move-outside', this.user));
      plant.reminders.push(this.reminderService.setRepotReminder(this.user, plant));
    } else if (reminder.name === 'repot' && plant.stage < 2) {
      plant.reminders.push(this.reminderService.setRepotReminder(this.user, plant));
      // Plant stage 1 -> 2 (sproutling to young plant)
      plant.stage++;
      plant.reminders.filter(r => {
        return r.name === 'spray';
      }).map(r => {
        r.name = 'water';
      });
    } else if (reminder.name === 'repot' && plant.stage === 2) {
      // Plant stage 2 -> 3 (young plant to mature plant)
      plant.stage++;
    } else if (reminder.name === 'harvest') {
      plant.reminders = [];
    }
    this.authService.updateUser(this.user).subscribe( data => { }, (err) => {
      this.dataService.openSnackBar('fail');
    }, () => {
      console.log(this.user.garden);
    });
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
    this.authService.updateUser(this.user).subscribe( data => { }, (err) => {
      this.dataService.openSnackBar('fail');
    }, () => {
      let plantName = plant.commonName ? plant.commonName : plant.botanicalName;
      this.dataService.openSnackBar('success', plantName + ' has been removed from your garden.');
    });
  }

  isReminderVisible(reminder: Reminder): boolean {
    const today = new Date();
    const reminderDate = new Date(reminder.date);
    return reminderDate <= today && reminderDate > this.reminderService.addDays(today, -30);
  }

  setGridItemHover(isHover, index: number) {
    this.isGridItemOnHover = isHover;
    this.hoverIndex = index;
  }

  getReminderTooltipText(plant: Plant, reminder: Reminder): string {
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
