import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-plant-details-dialog',
  templateUrl: './plant-details-dialog.component.html',
  styleUrls: ['./plant-details-dialog.component.scss']
})
export class PlantDetailsDialogComponent {

  constructor(public dialogRef: MatDialogRef<PlantDetailsDialogComponent>) { }


}
