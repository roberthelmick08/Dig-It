import { User } from './../../../models/user';
import { ReminderService } from './../../services/reminder.service';
import { DataService } from './../../services/data.service';
import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { GardenPlant } from 'src/models/gardenPlant';
import { Reminder } from 'src/models/reminder';

@Component({
  selector: 'app-plant-details-dialog',
  templateUrl: './plant-details-dialog.component.html',
  styleUrls: ['./plant-details-dialog.component.scss']
})
export class PlantDetailsDialogComponent {
  user: User;
  plant: GardenPlant;
  // Variable used to navigate to next plant details page
  step: number = 1;
  maxSteps: number = 3;
  today = new Date();

  constructor(@Inject(MAT_DIALOG_DATA) public data, public dialogRef: MatDialogRef<PlantDetailsDialogComponent>,
  public dataService: DataService, public reminderService: ReminderService) {
    this.plant = data.plant;
    this.user = data.user;
    this.dataService.imageSearchByName(this.plant);
    if (this.plant.reminders) {
      for (let reminder of this.plant.reminders) {
        reminder.date = new Date(reminder.date);
      }
      this.plant.reminders.sort( (a, b) => {
        return new Date(a.date).getTime() - new Date(b.date).getTime();
      });
    }


    if (!this.plant.comment) {
      this.maxSteps--;
    }
    if (!this.plant.reminders) {
      this.maxSteps--;
    }
  }

  onNextStep() {
    // Skip 2nd step if no reminders are present
    if (this.step === 1 && !this.plant.reminders) {
      this.step = this.step + 2;
    } else {
      this.step++;
    }
  }

  onPreviousStep() {
    this.step--;
    if (this.step === 3 && !this.plant.reminders) {
      this.step = this.step - 2;
    }
  }

  toSentenceCase(text: string) {
    if (text) {
      let sentenceArray = text.trim().split('. ');
      sentenceArray = sentenceArray.map( sentence => {
        const charArray = sentence.split('');
        charArray[0] = charArray[0].toUpperCase();
        if (charArray[charArray.length - 1] !== '.') {
          charArray.push('.');
        }
        return charArray.join('');
      });
      return sentenceArray.join(' ');
    }
  }

  getReminderDateElement(reminder: Reminder, element: string): string {
    let payLoad;

    switch (element) {
      case('day'):
        payLoad = { day: '2-digit'};
        break;
      case('month'):
        payLoad = { month: 'short'};
        break;
      case('year'):
        payLoad = { year: 'numeric'};
        break;
    }
    let value = reminder.date.toLocaleDateString('en-US', payLoad );
    return value;
  }

  getTooltipText(type: string, value?: string): string {
    let innerHtml = 'An error has occurred';

    if (type === 'sunSchedule') {
      if (value === 'Full Sun') {
        innerHtml = 'Full Sun means the plant requires at least 6 hours of direct sunlight per day. These plants are more heat tolerant.';
      } else if (value === 'Partial Sun') {
        innerHtml = 'Partial Sun means the plant requires 3 to 6 hours of direct afternoon sunlight per day. These plants tend to be more heat tolerant.';
      } else if (value === 'Partial Shade') {
        innerHtml = 'Partial Sun means the plant requires 3 to 6 hours of direct morning sunlight per day. Since these plants are less heat tolerant, they should be shielded from the harsh afternoon sun.';
      } else if (value === 'Full Shade') {
        innerHtml = 'Full Shade means the plant can survive on less than 3 hours of direct sunlight each day. They enjoy filtered sunlight during the rest of the day.';
      }
    } else if (type === 'lifeType') {
      if (value === 'Annual') {
        innerHtml = 'The lifecycle of an annual plant is one year. They will germinate, bloom and die in one growing season.';
      } else if (value === 'Biennial') {
        innerHtml = 'The lifecycle of a biennial plant is two years. They will germinate and grow the first season, survive one winter in a dormant state, and the second growing season it will grow more, bloom and die in one season.';
      } else if (value === 'Perennial') {
        innerHtml = 'The lifecycle of a perennial plant is indefinite. They will continue to grow year after year.';
      }
    } else if (type === 'harvestDate') {
      innerHtml = 'This is an approximate date calculated by Dig-It based on the plant type and the climate in your location. This should only act as a guide, and Dig-It recommends that you research what to look for to tell that the plant is ripe before harvesting.';
    }
    return innerHtml;
  }
}
