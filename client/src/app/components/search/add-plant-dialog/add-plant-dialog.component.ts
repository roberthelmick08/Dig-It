import { DataService } from './../../../services/data.service';
import { Component } from '@angular/core';
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

  plantImage: string;

  // Screen width to calculate image upload canvas width
  cropCanvasWidth: number;

  constructor( public dialogRef: MatDialogRef<AddPlantDialogComponent>, private dataService: DataService) {
    this.newPlant = new Plant();
    if(window.innerWidth <= 600){
      this.cropCanvasWidth = window.innerWidth - 48;
    } else{
      this.cropCanvasWidth = 400;
    }
    // Set default values
    this.newPlant.harvestable = false;
  }

  onNextStep() {
    this.step++;
  }

  onPreviousStep() {
    this.step--;
  }

  onImageUploadEvent(event){
    this.newPlant.img = event;
  }

  onSubmit() {
    // convert inputted values to negative numbers
    if (this.newPlant.weeksToSowBeforeLastFrost > 0) {
      this.newPlant.weeksToSowBeforeLastFrost = 0 - this.newPlant.weeksToSowBeforeLastFrost;
    }
    if (this.newPlant.germEnd > 0) {
      this.newPlant.germEnd = 0 - this.newPlant.germEnd;
    }

    // Set Default Values
    if (!this.newPlant.weeksToSowBeforeLastFrost) {
      this.newPlant.weeksToSowBeforeLastFrost = 4;
    }
    if (!this.newPlant.germEnd) {
      this.newPlant.germEnd = 2;
    }
    if (!this.newPlant.depth) {
      this.newPlant.depth = 6;
    }
    if (!this.newPlant.sowingSpace) {
      this.newPlant.sowingSpace = 9;
    }

    if(this.plantImage){
      this.newPlant.img = this.plantImage;
    }

    // Refresh Defaults
    this.newPlant.germStart = this.newPlant.weeksToSowBeforeLastFrost;

    // Format text input
    if (this.newPlant.botanicalName) this.newPlant.botanicalName = this.toTitleCase(this.newPlant.botanicalName);
    if (this.newPlant.commonName) this.newPlant.commonName = this.toTitleCase(this.newPlant.commonName);
    if (this.newPlant.variety) this.newPlant.variety = this.toSentenceCase(this.newPlant.variety);
    if (this.newPlant.comment) this.newPlant.comment = this.toSentenceCase(this.newPlant.comment);

    this.dataService.addPlant(this.newPlant).subscribe(result => { }, (err) => {
      this.dataService.openSnackBar('fail');
    }, () => {
      this.dataService.getAllPlants();
      if (!this.isSaveToGarden) {
        this.dataService.openSnackBar('success', 'Plant saved to Dig-It database!');
      }
        this.dialogRef.close({plant: this.newPlant, isSaveToGarden: this.isSaveToGarden});
    });
  }

  toTitleCase(input: string) {
    if (input) {
      input = input.split(' ').map(w => w[0].toUpperCase() + w.substr(1).toLowerCase()).join(' ');
      return input;
    }
  }

  toSentenceCase(input: string) {
    if (input) {
      input = input.trim()[0].toUpperCase() + input.substring(1, input.length);
      return input;
    }
  }
}
