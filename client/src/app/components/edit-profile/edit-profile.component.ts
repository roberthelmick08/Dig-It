import { DataService } from './../../services/data.service';
import { AuthenticationService } from './../../services/authentication.service';
import { User } from 'src/models/user';
import { Component, Inject, Output } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { EventEmitter } from 'events';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.scss']
})
export class EditProfileDialogComponent {
  user: User;
  isLogout: boolean = false;
  @Output() logoutEvent = new EventEmitter();

  constructor(@Inject(MAT_DIALOG_DATA) public data, public dialogRef: MatDialogRef<EditProfileDialogComponent>,
  public authService: AuthenticationService, public dataService: DataService) {
      this.user = data;
     }

  editUser() {
    this.authService.updateUser(this.user).subscribe( data => { }, (err) => {
      this.dataService.openSnackBar('fail');
    }, () => {
      this.dialogRef.close();
      this.dataService.openSnackBar('success', 'Account updated.');
    });
  }

  getFirstFrostDateString(): string {
    return new Date(this.user.firstFrostDate).toLocaleDateString('en-US', { month: 'long', day: '2-digit' });
  }

  getLastFrostDateString(): string {
    return new Date(this.user.lastFrostDate).toLocaleDateString('en-US', { month: 'long', day: '2-digit' });
  }

}
