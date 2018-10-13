import { DataService } from './../../../services/data.service';
import { Component } from '@angular/core';
import { MatDialogRef, MatSnackBar } from '@angular/material';
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

  constructor( public dialogRef: MatDialogRef<AddPlantDialogComponent>,
    private dataService: DataService, public snackBar: MatSnackBar) {
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
    this.newPlant.botanicalName = this.toTitleCase(this.newPlant.botanicalName);
    this.newPlant.commonName = this.toTitleCase(this.newPlant.commonName);
    this.newPlant.variety = this.toSentenceCase(this.newPlant.variety);
    this.newPlant.comment = this.toSentenceCase(this.newPlant.comment);

    this.dataService.addPlant(this.newPlant)
    .subscribe(item => {
      if (this.isSaveToGarden) {
        // TODO: save to garden logic
        this.snackBar.open('Plant added to garden');
      } else {
        this.snackBar.open('Plant saved successfully');
      }
      this.dataService.getAllPlants();
    });

    this.closeDialog();
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
