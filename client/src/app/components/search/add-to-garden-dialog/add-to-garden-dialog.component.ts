import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-add-to-garden-dialog',
  templateUrl: './add-to-garden-dialog.component.html',
  styleUrls: ['./add-to-garden-dialog.component.scss']
})
export class AddToGardenDialogComponent {

  isPotted: boolean;

  stage: number;

  constructor( public dialogRef: MatDialogRef<AddToGardenDialogComponent>) { }

  onSubmit() {
    this.dialogRef.close({
      isPotted: this.isPotted,
      stage: this.stage
    });
  }
}
