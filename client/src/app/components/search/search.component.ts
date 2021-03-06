import { Component, AfterViewInit, Output, EventEmitter, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatSidenav } from '@angular/material';
import { DataService } from '../../services/data.service';
import { AuthenticationService } from './../../services/authentication.service';
import { ReminderService } from './../../services/reminder.service';
import { AddPlantDialogComponent } from './add-plant-dialog/add-plant-dialog.component';
import { AddToGardenDialogComponent } from './add-to-garden-dialog/add-to-garden-dialog.component';
import { SearchFilter } from 'src/models/searchFilter';
import { Plant } from 'src/models/plant';
import { GardenPlant } from 'src/models/gardenPlant';
import { User } from 'src/models/user';


@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
  providers: [ DataService ]
})
export class SearchComponent implements AfterViewInit, OnInit {
  user: User;
  @Output() openPlantDetailsDialogEvent = new EventEmitter();
  @Output() setActiveRemindersEvent = new EventEmitter();
  @ViewChild('sidenav') sidenav: MatSidenav;
  isGridItemOnHover: boolean = false;
  hoverIndex: number;
  // Variable to store ALL plants from database
  plantsList: Array<Plant> = [];
  // Variable to store VISIBLE plants after filter is applied
  visiblePlants: Array<Plant> = [];
  searchTerm: string = '';
  searchBy: string = 'commonName';
  // Variable to store state of search. Used to toggle search warnings
  isOnSearch: boolean = false;
  // To store all active filters
  activeFilters: Array<SearchFilter> = [];
  plantTypeFilters: Array<SearchFilter> = [];
  lifeCycleFilters: Array<SearchFilter> = [];
  sunScheduleFilters: Array<SearchFilter> = [];
  plantTypes = ['Cactus', 'Flower', 'Fruit', 'Grain', 'Grass', 'Herb', 'Houseplant', 'Shrub', 'Succulent', 'Tree', 'Vegetable', 'Vine'];
  sunSchedules = ['Full Sun', 'Partial Sun', 'Partial Shade', 'Full Shade'];
  lifeCycles = ['Annual', 'Biennial', 'Perennial'];

  constructor( private dataService: DataService, public authService: AuthenticationService,
    private reminderService: ReminderService, public dialog: MatDialog ) { }

  ngOnInit(): void {
    for (let plantType of this.plantTypes) {
      this.plantTypeFilters.push({type: 'plantType', value: plantType});
    }
    for (let lifeCycle of this.lifeCycles) {
      this.lifeCycleFilters.push({type: 'lifeCycle', value: lifeCycle});
    }
    for (let sunSchedule of this.sunSchedules) {
      this.sunScheduleFilters.push({type: 'sunSchedule', value: sunSchedule});
    }

    if (this.authService.isLoggedIn() === true) {
      this.authService.getUser().subscribe(user => {
        this.user = user;
      }, (err) => {
        console.error(err);
      });
    }
  }

  ngAfterViewInit() {
    this.dataService.getAllPlants().subscribe(plants => this.plantsList = plants, (err) => {
      this.dataService.openSnackBar('fail', 'Unable to load plants. Please refresh and try again');
    });
  }

  addToGarden(plant: Plant) {
    const gardenPlant = this.setGardenPlant(plant);

    if(!this.user.garden){
      this.user.garden = [];
    }
    this.user.garden.push(gardenPlant);

    this.authService.updateUser(this.user).subscribe( result => { }, err => {
      this.dataService.openSnackBar('fail');
    }, () => {
      this.dataService.openSnackBar('success', plant.commonName + ' saved to your Garden!');
      // Refresh visiblePlants
      this.dataService.getAllPlants().subscribe(plants => this.plantsList = plants, (err) => {
        this.dataService.openSnackBar('fail', 'Unable to load plants. Please refresh and try again');
      }, () => {
        this.setActiveRemindersEvent.emit(this.user.garden);
      });
    });
  }

  setGardenPlant(plant): GardenPlant {
    const gardenPlant = new GardenPlant();

    gardenPlant.stage = plant.stage ? plant.stage : 0;
    gardenPlant.isPotted = Boolean(plant.isPotted);
    gardenPlant._id = plant._id;
    gardenPlant.commonName = plant.commonName;
    gardenPlant.botanicalName = plant.botanicalName;
    gardenPlant.type = plant.type;
    gardenPlant.lifeType = plant.lifeType;
    gardenPlant.harvestable = plant.harvestable;
    gardenPlant.weeksToHarvest = plant.time_to_harvest ? plant.time_to_harvest : 16;
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
    // SET MOCK REMINDERS
    // gardenPlant.reminders = this.reminderService.setMockReminders(plant, this.user);
    gardenPlant.reminders = this.reminderService.setInitialReminders(gardenPlant, this.user);

    return gardenPlant;
  }

  openAddPlantDialog() {
    const dialogRef = this.dialog.open(AddPlantDialogComponent, {
      height: window.innerWidth <= 600 ? '100vh' : '500px',
      width: window.innerWidth <= 600 ? '100vw' : '700px',
      panelClass: ['dialog-container', 'remove-bottom-padding']
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result && result.isSaveToGarden === true) {
        this.addToGarden(result.plant);
      }
    });
  }

  openPlantDetailsDialog(event) {
    this.openPlantDetailsDialogEvent.emit(event);
  }

  openAddToGardenDialog(plant: Plant) {
    const dialogRef = this.dialog.open(AddToGardenDialogComponent, {
      panelClass: ['dialog-container']
    });

    dialogRef.afterClosed().subscribe(result => {
      plant.isPotted = result.isPotted;
      plant.stage = result.stage;
    }, (err) => {
      this.dataService.openSnackBar('fail');
      console.log(err);
     }, () => {
      this.addToGarden(plant);
    });
  }

  setGridItemHover(isHover, index: number) {
    this.isGridItemOnHover = isHover;
    this.hoverIndex = index;
  }

  applyFilters() {
    this.activeFilters = [];
    this.plantTypeFilters.filter(filter => filter.isActive === true).map(filter => { this.activeFilters.push(filter); });
    this.lifeCycleFilters.filter(filter => filter.isActive === true).map(filter => { this.activeFilters.push(filter); });
    this.sunScheduleFilters.filter(filter => filter.isActive === true).map(filter => { this.activeFilters.push(filter); });
    this.sidenav.close();

    if (this.activeFilters.length > 0) {
      let plantTypeFilters = this.activeFilters.filter(f => {
        return f.type === 'plantType';
      });
      let sunScheduleFilters = this.activeFilters.filter(f => {
        return f.type === 'sunSchedule';
      });
      let lifeCycleFilters = this.activeFilters.filter(f => {
        return f.type === 'lifeCycle';
      });

      this.visiblePlants = this.visiblePlants.filter(plant => {
        let retVal = false;
        let plantTypeRetVal = false;
        let sunScheduleRetVal = false;
          for (let plantTypeFilter of plantTypeFilters) {
            if (plantTypeFilter.value === plant.type) {
              plantTypeRetVal = true;
              retVal = true;
            }
          }
          for (let sunScheduleFilter of sunScheduleFilters) {
            if ((sunScheduleFilter.value === plant.sunSchedule && plantTypeRetVal === true && plantTypeFilters.length > 0)
            || (sunScheduleFilter.value === plant.sunSchedule && plantTypeRetVal === false && plantTypeFilters.length === 0)) {
              sunScheduleRetVal = true;
              retVal = true;
            } else {
              retVal = false;
            }
          }
          for (let lifeCycleFilter of lifeCycleFilters) {
            if ((lifeCycleFilter.value === plant.lifeType && sunScheduleRetVal === true && plantTypeFilters.length > 0)
            || (lifeCycleFilter.value === plant.lifeType && sunScheduleRetVal === false && plantTypeFilters.length === 0)
            || (lifeCycleFilter.value === plant.lifeType && plantTypeRetVal === true && plantTypeFilters.length > 0)
            || (lifeCycleFilter.value === plant.lifeType && plantTypeRetVal === false && plantTypeFilters.length === 0)) {
              retVal = true;
            } else {
              retVal = false;
            }
          }
        return retVal;
      });
    }
  }

  deselectAllFilters(filterType: 'plantType' | 'lifeCycle' | 'sunSchedule') {
    if (filterType === 'plantType') {
      this.plantTypeFilters.map(filter => { filter.isActive = false; });
    } else if (filterType === 'lifeCycle') {
      this.lifeCycleFilters.map(filter => { filter.isActive = false; });
    } else if (filterType === 'sunSchedule') {
      this.sunScheduleFilters.map(filter => { filter.isActive = false; });
    }
  }

  isClearFiltersVisible(filterType: string): boolean {
    if (filterType === 'plantType') {
      return this.plantTypeFilters.filter(filter => filter.isActive === true ).length > 0;
    } else if (filterType === 'lifeCycle') {
      return this.lifeCycleFilters.filter(filter => filter.isActive === true ).length > 0;
    } else if (filterType === 'sunSchedule') {
      return this.sunScheduleFilters.filter(filter => filter.isActive === true).length > 0;
    }
  }

  removeFilter(filter: SearchFilter) {
    this.activeFilters.splice(this.activeFilters.findIndex(f => filter === f), 1);
    if (filter.type === 'plantType') {
      this.plantTypeFilters.filter(f => filter === f).map(f => { f.isActive = false; });
    } else if (filter.type === 'lifeCycle') {
      this.lifeCycleFilters.filter(f => filter === f).map(f => { f.isActive = false; });
    } else if (filter.type === 'sunSchedule') {
      this.sunScheduleFilters.filter(f => filter === f).map(f => { f.isActive = false; });
    }
    this.onSearch();
  }

  onCancelFilters() {
    this.plantTypeFilters.filter(filter => {
      return this.activeFilters.findIndex(f => f === filter) === -1;
    }).map(f => { f.isActive = false; });
    this.lifeCycleFilters.filter(filter => {
      return this.activeFilters.findIndex(f => f === filter) === -1;
    }).map(f => { f.isActive = false; });
    this.sunScheduleFilters.filter(filter => {
      return this.activeFilters.findIndex(f => f === filter) === -1;
    }).map(f => { f.isActive = false; });
    this.sidenav.close();
  }

  onSearch() {
    this.isOnSearch = true;
    this.visiblePlants = this.plantsList.filter(plant => {
      if (this.searchTerm === '') {
        return true;
      } else {
        if (plant.botanicalName && !plant.commonName) {
          return plant.botanicalName.toLowerCase().indexOf(this.searchTerm.toLowerCase()) > -1;
        } else if (plant.commonName && !plant.botanicalName) {
          return plant.commonName.toLowerCase().indexOf(this.searchTerm.toLowerCase()) > -1;
        } else {
          return plant.botanicalName.toLowerCase().indexOf(this.searchTerm.toLowerCase()) > -1
              || plant.commonName.toLowerCase().indexOf(this.searchTerm.toLowerCase()) > -1;
        }
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
    }).slice(0, 100);

    for (let plant of this.visiblePlants) {
      if(!plant.img){
        this.dataService.imageSearchByName(plant);
      }
    }

    this.applyFilters();
  }

  // Reorder array based on closest match to search term
  levDist(s, t) {
    const d = [];

    const n = s.length;
    const m = t.length;

    if (n === 0) { return m; }
    if (m === 0) { return n; }

    for (let i = n; i >= 0; i--) { d[i] = []; }
    for (let i = n; i >= 0; i--) { d[i][0] = i; }
    for (let j = m; j >= 0; j--) { d[0][j] = j; }

    for (let i = 1; i <= n; i++) {
        const s_i = s.charAt(i - 1);

        for (let j = 1; j <= m; j++) {

            // Check the jagged ld total so far
            if (i === j && d[i][j] > 4) { return n; }

            const t_j = t.charAt(j - 1);
            const cost = (s_i === t_j) ? 0 : 1;

            // Calculate the minimum
            let mi = d[i - 1][j] + 1;
            const b = d[i][j - 1] + 1;
            const c = d[i - 1][j - 1] + cost;

            if (b < mi) { mi = b; }
            if (c < mi) { mi = c; }

            d[i][j] = mi;

            // Damerau transposition
            if (i > 1 && j > 1 && s_i === t.charAt(j - 2) && s.charAt(i - 2) === t_j) {
                d[i][j] = Math.min(d[i][j], d[i - 2][j - 2] + cost);
            }
        }
    }
    return d[n][m];
  }
}
