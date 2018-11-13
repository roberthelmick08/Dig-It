import { ReminderService } from './services/reminder.service';
import { DataService } from './services/data.service';
import { LoginDialogComponent } from './components/login/login.component';
import { PlantDetailsDialogComponent } from './components/plant-details-dialog/plant-details-dialog.component';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { AuthenticationService } from './services/authentication.service';
import { EditProfileDialogComponent } from './components/edit-profile/edit-profile.component';
import { User } from 'src/models/user';
import { AddPlantDialogComponent } from './components/search/add-plant-dialog/add-plant-dialog.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  isUserMenuOpen: boolean = false;

  currentPage: string;

  user: User;

  constructor( public dialog: MatDialog, public authService: AuthenticationService, public dataService: DataService, public reminderService: ReminderService) {
    this.currentPage = authService.isLoggedIn() ? 'garden' : 'home';
  }


ngOnInit(): void {
  let today = new Date();

  if (this.authService.isLoggedIn() === true) {
    this.authService.getUser().subscribe(user => {
      this.user = user;
    }, (err) => {
      console.error(err);
      this.dataService.openSnackBar('fail');
    }, () => {
    // Reset annual reminders if older than 60 days
    for (let plant of this.user.garden) {
      this.dataService.imageSearchByName(plant);
      let tempPlant =  plant.reminders.filter(reminder => {
        return (reminder.name === 'move-inside' || reminder.name === 'move-outside' || reminder.name === 'repot') && new Date(reminder.date) < this.reminderService.addDays(today, -60);
      });
      tempPlant.map(reminder => {
        reminder.date = this.reminderService.addDays(reminder.date, 365);
      });
    }

    // Refresh frost dates if passed
    if (new Date(this.user.lastFrostDate) < this.reminderService.addDays(today, -30)) {
      this.user.lastFrostDate = this.reminderService.addDays(this.user.lastFrostDate, 365);
    } else if (new Date(this.user.firstFrostDate) < this.reminderService.addDays(today, -30)) {
      this.user.firstFrostDate = this.reminderService.addDays(this.user.firstFrostDate, 365);
    }
    this.authService.updateUser(this.user).subscribe();
    });
  }
}

  setCurrentPage(page: string) {
    this.currentPage = page;
  }

  toggleUserMenu() {
    this.isUserMenuOpen = !this.isUserMenuOpen;
  }

  openPlantDetailsDialog(data) {
    this.dialog.open(PlantDetailsDialogComponent, {
      height: window.innerWidth <= 600 ? '100vh' : '500px',
      width: window.innerWidth <= 600 ? '100vw' : '700px',
      panelClass: 'dialog-container',
      data: data
    });
  }

  openEditProfileDialog() {
    this.dialog.open(EditProfileDialogComponent, {
      height: window.innerWidth <= 600 ? '100vh' : '450px',
      width: window.innerWidth <= 600 ? '100vw' : '700px',
      panelClass: ['dialog-container', 'remove-bottom-padding'],
      data: this.user,
    });
  }

  onScroll(event) {
    console.log('event', event);
    console.log('document.documentElement.offsetHeight', document.documentElement.offsetHeight);
  }

  onLogout() {
    this.authService.logout();
    this.currentPage = 'home';
  }

  openLoginDialog() {
    this.dialog.open(LoginDialogComponent, {
      height: '400px',
      width: window.innerWidth <= 600 ? '100vw' : '700px',
      panelClass: ['dialog-container', 'remove-bottom-padding']
    });
  }
}
