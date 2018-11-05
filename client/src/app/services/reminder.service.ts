import { Injectable } from '@angular/core';
import { Reminder } from 'src/models/reminder';
import { Plant } from 'src/models/plant';
import { User } from 'src/models/user';

@Injectable({
  providedIn: 'root'
})
export class ReminderService {

  constructor() { }

  // Function to set default reminders when plant is added to user's garden
  setInitialReminders(plant: Plant, user: User): Array<Reminder> {
    const remindersArray = [];
    if (plant.stage === 0) {
      remindersArray.push(this.setSowingReminder(plant, user));
    } else {
      remindersArray.push(this.setWaterReminder(plant));
    }

    if (plant.harvestable && plant.weeksToHarvest) {
      remindersArray.push(this.setHarvestReminder(plant, user));
    }

    if(plant.isPotted){
      this.setFrostDateReminder('move-inside', user);
      this.setFrostDateReminder('move-outside', user);
      this.setRepotReminder(user, plant);
    }


  // TODO: set Reminders functions for all other reminders
    return remindersArray;
  }

  setWaterReminder(plant: Plant): Reminder {
    // Set default watering period to 7 days
    let dayIncrementer: number = 7;

    const tempReminder = new Reminder();
    tempReminder.name = 'water';

    if (plant.stage === 1) {
      tempReminder.name = 'spray';
      dayIncrementer = 2;
    } else if (plant.stage !== 1 && plant.isPotted === true) {
      if (plant.type === 'Cactus' || plant.type === 'Succulent') {
        if (plant.stage === 2) {
          dayIncrementer = plant.type === 'Cactus' ? 10 : 7;
        } else {
          dayIncrementer = plant.type === 'Cactus' ? 18 : 10;
        }
      } else {
        if (plant.stage === 2) {
          dayIncrementer = 4;
        }
      }
    } else if (plant.stage !== 1 && plant.isPotted === false) {
      if (plant.type === 'Cactus' || plant.type === 'Succulent') {
        if (plant.stage === 2) {
          dayIncrementer = plant.type === 'Cactus' ? 14 : 10;
        } else {
          dayIncrementer = plant.type === 'Cactus' ? 28 : 14;
        }
      } else {
        if (plant.stage === 2) {
          dayIncrementer = 6;
        } else {
          dayIncrementer = 9;
        }
      }
    }

    let today = new Date();

    // Reduce dayIncrementer during mid-May to mid-September
    if (today.getMonth() > 4 && today.getDate() > 15 && today.getMonth() < 8 && today.getDate() < 15) {
      dayIncrementer = dayIncrementer - 2;
    }

    tempReminder.date = this.addDays(today, dayIncrementer);
    return tempReminder;
  }

  getSowDate(user: User, plant: Plant): Date {
    // Subtracts weeksToSowBeforeLastFrost from lastFrostDate
    const sowDate = this.addDays(new Date(user.lastFrostDate), plant.weeksToSowBeforeLastFrost * 7);
    return sowDate;
  }

  setSowingReminder(plant: Plant, user: User): Reminder {
    const tempReminder = new Reminder();
    tempReminder.name = 'sow';
    tempReminder.date = this.getSowDate(user, plant);
    return tempReminder;
  }

  setHarvestReminder(plant: Plant, user: User): Reminder {
    const tempReminder = new Reminder();
    tempReminder.name = 'harvest';
    tempReminder.date = this.getHarvestDate(user, plant);
    return tempReminder;
  }

  getHarvestDate(user: User, plant: Plant): Date {
    let harvestDate = this.addDays(this.getSowDate(user, plant), plant.weeksToHarvest * 7);
    return harvestDate;
  }

  getHarvestDateString(user: User, plant: Plant): string {
    return this.getHarvestDate(user, plant).toLocaleDateString('en-US', { month: 'long', day: '2-digit' });
  }

  setRepotReminder(user: User, plant: Plant): Reminder {
    const tempReminder = new Reminder();
    tempReminder.name = 'repot';
    if(plant.stage === 1) {
      tempReminder.date = this.addDays(this.getSowDate(user, plant), );
    } else {
        tempReminder.date = this.addDays(new Date(), plant.type === 'Cactus' || plant.type === 'Succulent' ? 90 : 60);
    }
    return tempReminder;
  }

  setFrostDateReminder(name: 'move-inside' | 'move-outside', user: User): Reminder {
    const tempReminder = new Reminder();
    tempReminder.name = name;
    tempReminder.date = new Date(name === 'move-inside' ? user.firstFrostDate : user.lastFrostDate)
    return tempReminder;
  }

  // Function to add days to specified date. Returns Date
  addDays(date: Date, days: number): Date {
    const result = new Date(date);
    result.setDate(result.getDate() + days);
    return result;
  }

}
