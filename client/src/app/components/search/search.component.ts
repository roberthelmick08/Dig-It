import { AddPlantDialogComponent } from './add-plant-dialog/add-plant-dialog.component';
import { Component, AfterViewInit, Output, EventEmitter, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { Plant } from './../../../models/plant';
import { GardenPlant } from './../../../models/gardenPlant';
import { User } from './../../../models/user';
import { DataService } from '../../services/data.service';
import { AuthenticationService } from './../../services/authentication.service';
import { ReminderService } from './../../services/reminder.service';


@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
  providers: [ DataService ]
})
export class SearchComponent implements AfterViewInit, OnInit {

  @Output()
  openPlantDetailsDialogEvent = new EventEmitter();

  user: User;

  // Variable to store ALL plants from database
  plantsList: Array<Plant> = [];

  // Variable to store VISIBLE plants after filter is applied
  visiblePlants: Array<Plant>;

  searchTerm: string = '';

  searchBy: string = 'commonName';

  isAddToGardenMenuVisible: boolean = false;

  activeGardenMenuIndex: number;

  constructor( private dataService: DataService, public authService: AuthenticationService,
    private reminderService: ReminderService, public dialog: MatDialog ) { }

  ngOnInit(): void {
    this.authService.getUser().subscribe(user => {
      this.user = user;
    }, (err) => {
      this.dataService.openSnackBar('fail');
      console.error(err);
    });
  }

  ngAfterViewInit() {
    this.dataService.getAllPlants().subscribe(plants => this.plantsList = plants, (err) => {
      this.dataService.openSnackBar('fail');
    });
  }

  addToGarden(plant: Plant) {
    const gardenPlant = this.setGardenPlant(plant);

    this.user.garden.push(gardenPlant);

    this.authService.updateUser(this.user).subscribe( result => { }, err => {
      this.isAddToGardenMenuVisible = false;
      this.dataService.openSnackBar('fail');
    }, () => {
      this.isAddToGardenMenuVisible = false;
      this.dataService.openSnackBar('success', 'Plant saved to your Garden!');
    });
  }

  setGardenPlant(plant: Plant): GardenPlant {
    const gardenPlant = new GardenPlant();

    if (plant.stage) {
      plant.stage = +plant.stage;
    }

    gardenPlant.stage = plant.stage ? plant.stage : 0;
    gardenPlant.isPotted = plant.isPotted;
    // SET MOCK REMINDERS
    // gardenPlant.reminders = this.reminderService.setMockReminders(plant, this.user);
    gardenPlant.reminders = this.reminderService.setInitialReminders(plant, this.user);
    gardenPlant._id = plant._id;
    gardenPlant.commonName = plant.commonName;
    gardenPlant.botanicalName = plant.botanicalName;
    gardenPlant.type = plant.type;
    gardenPlant.lifeType = plant.lifeType;
    gardenPlant.harvestable = plant.harvestable;
    gardenPlant.weeksToHarvest = plant.weeksToHarvest;
    gardenPlant.sunSchedule = plant.sunSchedule;
    gardenPlant.variety = plant.variety;
    gardenPlant.comment = plant.comment;
    gardenPlant.weeksToSowBeforeLastFrost = plant.weeksToSowBeforeLastFrost;
    gardenPlant.germEnd = plant.germEnd;
    gardenPlant.sowingMethod = plant.sowingMethod;
    gardenPlant.sowingSpace = plant.sowingSpace;
    gardenPlant.depth = plant.depth;
    gardenPlant.germStart = plant.germStart;
    gardenPlant.methodNum = plant.methodNum;
    gardenPlant.img = plant.img;
    gardenPlant.zones = plant.zones;

    return gardenPlant;
  }

  openAddPlantDialog() {
    const dialogRef = this.dialog.open(AddPlantDialogComponent, {
      height: '500px',
      width: '700px',
      panelClass: 'dialog-container'
    });

    dialogRef.afterClosed().subscribe(result => {
      this.addToGarden(result);
    });

  }

  toggleAddToGardenMenu(index: number) {
    this.isAddToGardenMenuVisible = true;
    this.activeGardenMenuIndex = index;
  }

  openPlantDetailsDialog(plant: Plant) {
    const data = {
      plant: plant,
      user: this.user
    };
    this.openPlantDetailsDialogEvent.emit(data);
  }

  onSearch() {
    this.visiblePlants = this.plantsList.filter(plant => {
      if (plant.botanicalName && !plant.commonName) {
        return plant.botanicalName.toLowerCase().indexOf(this.searchTerm.toLowerCase()) > -1;
      } else if (plant.commonName && !plant.botanicalName) {
        return plant.commonName.toLowerCase().indexOf(this.searchTerm.toLowerCase()) > -1;
      } else {
        return plant.botanicalName.toLowerCase().indexOf(this.searchTerm.toLowerCase()) > -1
            || plant.commonName.toLowerCase().indexOf(this.searchTerm.toLowerCase()) > -1;
      }
    }).sort( plant => {
      if (this.searchBy === 'commonName') {
        if (plant.commonName.substring(0, this.searchTerm.length).toLowerCase() === this.searchTerm.toLowerCase()) {
          return -1;
        } else {
          return this.levDist(plant.commonName, this.searchTerm);
        }
      } else if (this.searchBy === 'botanicalName') {
        if (plant.botanicalName.substring(0, this.searchTerm.length).toLowerCase() === this.searchTerm.toLowerCase()) {
          return -1;
        } else {
          return this.levDist(plant.botanicalName, this.searchTerm);
        }
      }
    }).slice(0, 5);

  }

  // Reorder array based on closest match to search term
  levDist(s, t) {
    const d = []; // 2d matrix

    const n = s.length;
    const m = t.length;

    if (n === 0) { return m; }
    if (m === 0) { return n; }

    // Create an array of arrays in javascript (a descending loop is quicker)
    for (let i = n; i >= 0; i--) { d[i] = []; }

    for (let i = n; i >= 0; i--) { d[i][0] = i; }
    for (let j = m; j >= 0; j--) { d[0][j] = j; }

    for (let i = 1; i <= n; i++) {
        const s_i = s.charAt(i - 1);

        for (let j = 1; j <= m; j++) {

            // Check the jagged ld total so far
            if (i === j && d[i][j] > 4) { return n; }

            const t_j = t.charAt(j - 1);
            const cost = (s_i === t_j) ? 0 : 1; // Step 5

            // Calculate the minimum
            let mi = d[i - 1][j] + 1;
            const b = d[i][j - 1] + 1;
            const c = d[i - 1][j - 1] + cost;

            if (b < mi) { mi = b; }
            if (c < mi) { mi = c; }

            d[i][j] = mi; // Step 6

            // Damerau transposition
            if (i > 1 && j > 1 && s_i === t.charAt(j - 2) && s.charAt(i - 2) === t_j) {
                d[i][j] = Math.min(d[i][j], d[i - 2][j - 2] + cost);
            }
        }
    }

    // Step 7
    return d[n][m];
}
}
