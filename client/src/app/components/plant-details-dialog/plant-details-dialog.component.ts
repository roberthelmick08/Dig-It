import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Plant } from 'src/models/plant';

@Component({
  selector: 'app-plant-details-dialog',
  templateUrl: './plant-details-dialog.component.html',
  styleUrls: ['./plant-details-dialog.component.scss']
})
export class PlantDetailsDialogComponent {

  // Variable used to navigate to next plant details page
  step: number = 0;

  constructor(@Inject(MAT_DIALOG_DATA) public plant: Plant, public dialogRef: MatDialogRef<PlantDetailsDialogComponent>) { }

  onNextStep() {
    this.step++;
  }

  onPreviousStep() {
    this.step--;
  }

}
