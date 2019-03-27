import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { ReminderFactor } from 'src/models/reminderFactor';
import reminderFactorsJSON from './json/reminderFactors.js';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss']
})
export class AboutComponent implements OnInit {
  reminders: Array<string> = ['Water', 'Sow Seeds', 'Repot', 'Move Outdoors / Indoors', 'Harvest'];

  reminderFactors: Array<ReminderFactor> = reminderFactorsJSON.factorsArray;

  selectedReminderType: number;

  @Output() refreshAnimationsEvent = new EventEmitter();

  constructor() { }

  ngOnInit() {
    // Initialize animations
    this.refreshAnimationsEvent.emit();

    setTimeout(() => {
      document.getElementById("about-line-top").classList.add('active-animation');
        document.getElementById("fade-in-1").classList.add('active-animation');
    }, 500);
  }

  onSelectReminder(index: number){
    this.selectedReminderType = index;
    // TODO: set active reminderFactors
  }

  isFactorActive(factorIndex: number){
    let activeIndex = this.reminderFactors[factorIndex].activeRemindersIndexes.findIndex( idx => {
      console.log(this.reminderFactors[factorIndex]);
      return this.selectedReminderType === idx;
    });

    return activeIndex > -1;
  }

  onPageDown(){
    document.getElementById('page-content').scrollBy({
      top: window.innerHeight - 64,
      left: 0,
      behavior: 'smooth'
    });
  }

  toggleExpansion(factorIndex: number){
    this.reminderFactors[factorIndex].expanded = !this.reminderFactors[factorIndex].expanded;
  }
}
