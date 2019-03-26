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
    // Initialize scroll animations
    this.refreshAnimationsEvent.emit();
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

  toggleExpansion(factorIndex: number){
    this.reminderFactors[factorIndex].expanded = !this.reminderFactors[factorIndex].expanded;
  }
}
