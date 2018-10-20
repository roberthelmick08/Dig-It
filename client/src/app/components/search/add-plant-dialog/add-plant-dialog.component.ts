import { DataService } from './../../../services/data.service';
import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { MatDialogRef } from '@angular/material';
import { Plant } from '../../../../models/plant';

@Component({
  selector: 'app-add-plant-dialog',
  templateUrl: './add-plant-dialog.component.html',
  styleUrls: ['./add-plant-dialog.component.scss']
})
export class AddPlantDialogComponent {
  // Variable used to navigate Add Plant screens
  step: number = 0;

  newPlant: Plant;

  isSaveToGarden: boolean = true;

  @Output()
  getPlantsEvent: EventEmitter<any> = new EventEmitter();

  constructor( public dialogRef: MatDialogRef<AddPlantDialogComponent>, private dataService: DataService) {
    this.newPlant = new Plant();

    // Set default values
    this.newPlant.harvestable = false;
    this.newPlant.weeksToSowBeforeLastFrost = 4;
    this.newPlant.stage = 0;
    this.newPlant.germEnd = 2;
  }

  onNextStep() {
    this.step++;
  }

  onPreviousStep() {
    this.step--;
  }

  closeDialog(): void {
    this.dialogRef.close();
  }

  onSubmit() {
    // convert inputted values to negative numbers
    if (this.newPlant.weeksToSowBeforeLastFrost > 0) {
      this.newPlant.weeksToSowBeforeLastFrost = 0 - this.newPlant.weeksToSowBeforeLastFrost;
    } else if (this.newPlant.germEnd > 0) {
      this.newPlant.germEnd = 0 - this.newPlant.germEnd;
    }

    // Refresh Defaults
    this.newPlant.germStart = this.newPlant.weeksToSowBeforeLastFrost;

    // Format text input
    if (this.newPlant.botanicalName) this.newPlant.botanicalName = this.toTitleCase(this.newPlant.botanicalName);
    if (this.newPlant.commonName) this.newPlant.commonName = this.toTitleCase(this.newPlant.commonName);
    if (this.newPlant.variety) this.newPlant.variety = this.toSentenceCase(this.newPlant.variety);
    if (this.newPlant.comment) this.newPlant.comment = this.toSentenceCase(this.newPlant.comment);

    this.dataService.addPlant(this.newPlant)
    .subscribe(item => {
      this.dataService.getAllPlants();
    });

    // this.closeDialog();
  }

  toTitleCase(input: string) {
    if (input) {
      input = input.split(' ').map(w => w[0].toUpperCase() + w.substr(1).toLowerCase()).join(' ');
      return input;
    }
  }

  toSentenceCase(input: string) {
    if (input) {
      input = input.trim()[0].toUpperCase() + input.substring(1, input.length - 1);
      return input;
    }
  }
}
