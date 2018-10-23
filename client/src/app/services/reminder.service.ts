import { Injectable } from '@angular/core';
import { Reminder } from 'src/models/reminder';
import { Plant } from 'src/models/plant';

@Injectable({
  providedIn: 'root'
})
export class ReminderService {

  constructor() { }

  // Function to set default reminders when plant is added to user's garden
  setInitialReminders(plant: Plant): Array<Reminder> {
    const remindersArray = [];
    remindersArray.push(this.setWaterReminder(plant));

    // TODO: set Reminders functions for all other reminders
    return remindersArray;
  }

  setWaterReminder(plant: Plant): Reminder {
    const tempReminder = new Reminder();
    tempReminder.name = 'water';

    // TODO: Add conditions based off plant.stage, plant.type,
    tempReminder.date = this.addDays(new Date(), 7);

    return tempReminder;
  }

  // Function to add days to specified date. Returns Date
  addDays(date: Date, days: number): Date {
    const result = new Date(date);
    result.setDate(result.getDate() + days);
    return result;
  }
}
