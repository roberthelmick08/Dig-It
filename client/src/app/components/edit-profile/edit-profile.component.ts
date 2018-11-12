import { DataService } from './../../services/data.service';
import { AuthenticationService } from './../../services/authentication.service';
import { Component, OnInit } from '@angular/core';
import { User } from 'src/models/user';
import { MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.scss']
})
export class EditProfileDialogComponent implements OnInit {

  user: User;

  constructor(public dialogRef: MatDialogRef<EditProfileDialogComponent>, public authService: AuthenticationService, 
    public dataService: DataService) { }

  ngOnInit() {
    this.authService.getUser().subscribe(user => {
      this.user = user;
    }, (err) => {
      console.error(err);
      this.dataService.openSnackBar('fail');
    });
  }

  editUser() {
    this.authService.setUser(this.user).subscribe((result) => { }, (err) => {
      this.dataService.openSnackBar('fail');
      console.error(err);
    }, () => {
      this.dialogRef.close();
      this.dataService.openSnackBar('success', 'Account updated.');
    });
  }

  getFirstFrostDateString(): string {
    return this.user.firstFrostDate.toLocaleDateString('en-US', { month: 'long', day: '2-digit' });
  }

  getLastFrostDateString(): string {
    return this.user.lastFrostDate.toLocaleDateString('en-US', { month: 'long', day: '2-digit' });
  }
}