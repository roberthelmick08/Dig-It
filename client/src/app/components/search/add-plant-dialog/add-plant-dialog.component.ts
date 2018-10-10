import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material';
import { FormGroup } from '@angular/forms';
import { Plant } from '../../../../models/plant';

@Component({
  selector: 'app-add-plant-dialog',
  templateUrl: './add-plant-dialog.component.html',
  styleUrls: ['./add-plant-dialog.component.css']
})
export class AddPlantDialogComponent implements OnInit {
  // Variable used to navigate Add Plant screens
  step: number = 0;

  newPlant: Plant;

  constructor( public dialogRef: MatDialogRef<AddPlantDialogComponent> ) {
    this.newPlant = new Plant();
  }

  ngOnInit() { }

  // Navigate to next page
  onNextStep() {
    this.step++;
  }

  // Navigate to next page
  onPreviousStep() {
    this.step--;
  }

  // Cancel
  closeDialog(): void {
    this.dialogRef.close();
  }

  // Save Plant
  onSubmit(plant: Plant) {
    if (!this.newPlant.botanicalName) {
      this.newPlant.botanicalName = this.newPlant.commonName;
    } else if (!this.newPlant.commonName) {
      this.newPlant.commonName = this.newPlant.botanicalName;
    }
  }
}
