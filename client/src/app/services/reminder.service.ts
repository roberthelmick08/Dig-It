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
    if(plant.stage !== 0){
      remindersArray.push(this.setWaterReminder(plant));
    }

    // TODO: set Reminders functions for all other reminders
    return remindersArray;
  }

  setWaterReminder(plant: Plant): Reminder {
    // Set default watering period to 7 days
    let dayIncrementer: number = 7;
    
    const tempReminder = new Reminder();
    tempReminder.name = 'water';

    if(plant.stage === 1){
      tempReminder.name = 'spray';
      dayIncrementer = 2;
    } else if(plant.stage !== 1 && plant.isPotted === true){
      if(plant.type === 'Cactus' || plant.type === 'Succulent'){
        if(plant.stage === 2){
          dayIncrementer = plant.type === 'Cactus' ? 10 : 7;
        } else{
          dayIncrementer = plant.type === 'Cactus' ? 18 : 10;
        }
      } else{
        if(plant.stage === 2){
          dayIncrementer = 4;
        }
      }
    } else if(plant.stage !== 1 && plant.isPotted === false){
      if(plant.type === 'Cactus' || plant.type === 'Succulent'){
        if(plant.stage === 2){
          dayIncrementer = plant.type === 'Cactus' ? 14 : 10;
        } else{
          dayIncrementer = plant.type === 'Cactus' ? 28 : 14;
        }
      } else{
        if(plant.stage === 2){
          dayIncrementer = 6;
        } else{
          dayIncrementer = 9;
        }
      }
    }

    // TODO: Add conditions based off season (more often during summer)

    tempReminder.date = this.addDays(new Date(), dayIncrementer);
    return tempReminder;
  }

  // Function to add days to specified date. Returns Date
  addDays(date: Date, days: number): Date {
    const result = new Date(date);
    result.setDate(result.getDate() + days);
    return result;
  }
}
