import { ReminderService } from './services/reminder.service';
import { DataService } from './services/data.service';
import { PlantDetailsDialogComponent } from './components/plant-details-dialog/plant-details-dialog.component';
import { Component, ViewChild } from '@angular/core';
import {Router, NavigationEnd} from '@angular/router';
import { MatDialog } from '@angular/material';
import { AuthenticationService } from './services/authentication.service';
import { User } from 'src/models/user';
import { SearchComponent } from './components/search/search.component';
import { GardenPlant } from 'src/models/gardenPlant';

declare let gtag: Function;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  currentPage: string;

  user: User;

  plantsWithActiveReminders: Array<GardenPlant> = [];

  @ViewChild(SearchComponent) searchComponent;

  constructor( public dialog: MatDialog, public router: Router, public authService: AuthenticationService,
    public dataService: DataService, public reminderService: ReminderService) {

    // Google Analytics
    // this.router.events.subscribe(event => {
      // if (event instanceof NavigationEnd) {
        gtag('send', 'pageview');
      // }
    // });

    this.currentPage = authService.isLoggedIn() ? 'garden' : 'home';

    const today = new Date();

    if (this.authService.isLoggedIn() === true) {
      this.authService.getUser().subscribe(user => {
        this.user = user;
      }, (err) => {
        console.error(err);
        this.dataService.openSnackBar('fail');
      }, () => {
      // Reset annual reminders if older than 60 days
      for (let plant of this.user.garden) {
        if(!plant.img){
          this.dataService.imageSearchByName(plant);
        }
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
      this.setPlantsWithActiveReminders();
      });
    }
  }

  setCurrentPage(page: string) {
    this.currentPage = page;
  }

  onMarkReminderDoneEvent(event){
    const plant = event.plant;
    const reminder = event.reminder;
    let successMessage: string;

    plant.reminders.splice(plant.reminders.findIndex(r => reminder === r), 1);
    if (reminder.name === 'water' || reminder.name === 'spray') {
      plant.reminders.push(this.reminderService.setWaterReminder(plant));
      successMessage = plant.commonName + ' has been ' + reminder.name + 'ed.';
    } else if (((reminder.name === 'move-inside' && plant.isPotted) || reminder.name === 'move-outside') && (plant.lifeType === 'Perennial' || plant.lifeType === 'Biennial')) {
      reminder.date = this.reminderService.addDays(reminder.name === 'move-inside' ? this.user.firstFrostDate : this.user.lastFrostDate, 364);
      plant.reminders.push(reminder);
      if(reminder.name === 'move-inside'){
        successMessage = plant.commonName + ' has been moved inside.';
      } else{
        successMessage = plant.commonName + ' has been moved outside.';
      }
    } else if (reminder.name === 'sow') {
      // Plant stage 0 -> 1 (seed to sproutling)
      plant.stage++;
      plant.reminders.push(this.reminderService.setFrostDateReminder('move-inside', this.user));
      plant.reminders.push(this.reminderService.setFrostDateReminder('move-outside', this.user));
      plant.reminders.push(this.reminderService.setRepotReminder(this.user, plant));
      successMessage = plant.commonName + ' has been planted.';
    } else if (reminder.name === 'repot' && plant.stage < 2) {
      plant.reminders.push(this.reminderService.setRepotReminder(this.user, plant));
      // Plant stage 1 -> 2 (sproutling to young plant)
      plant.stage++;
      plant.reminders.filter(r => {
        return r.name === 'spray';
      }).map(r => {
        r.name = 'water';
      });
      successMessage = plant.commonName + ' has been repotted.';
    } else if (reminder.name === 'repot' && plant.stage === 2) {
      // Plant stage 2 -> 3 (young plant to mature plant)
      plant.stage++;
      successMessage = plant.commonName + ' has been repotted.';
    } else if (reminder.name === 'harvest') {
      plant.reminders = [];
      successMessage = plant.commonName + ' has been ' + reminder.name + 'ed.';
    }
    this.authService.updateUser(this.user).subscribe( data => { }, (err) => {
      this.dataService.openSnackBar('fail');
    }, () => {
      this.dataService.openSnackBar('success', successMessage);
      this.setPlantsWithActiveReminders();
    });
  }

  setPlantsWithActiveReminders(garden?: GardenPlant[]){
    const gardenData = garden ? garden : this.user.garden;
    this.plantsWithActiveReminders = this.dataService.getPlantsWithActiveReminders(gardenData);
  }

  openPlantDetailsDialog(data) {
    const dialogRef = this.dialog.open(PlantDetailsDialogComponent, {
      height: window.innerWidth <= 600 ? '100vh' : '500px',
      width: window.innerWidth <= 600 ? '100vw' : '700px',
      panelClass: 'dialog-container',
      data: data
    });

    dialogRef.afterClosed().subscribe((data) => {
      if (data && data.plant) {
        this.searchComponent.openAddToGardenDialog(data.plant);
      }
    });
  }
}
