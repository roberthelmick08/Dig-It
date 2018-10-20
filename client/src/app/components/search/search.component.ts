import { AddPlantDialogComponent } from './add-plant-dialog/add-plant-dialog.component';
import { DataService } from '../../services/data.service';
import { Component, AfterViewInit, Input, Output, EventEmitter } from '@angular/core';
import { MatDialog } from '@angular/material';
import { Plant } from './../../../models/plant';
import { User } from 'src/models/user';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
  providers: [ DataService ]
})
export class SearchComponent implements AfterViewInit {
  @Input()
  currentUser: User;

  @Output()
  openPlantDetailsDialogEvent = new EventEmitter();

  // Variable to store ALL plants from database
  plantsList: Array<Plant> = [];

  // Variable to store VISIBLE plants after filter is applied
  visiblePlants: Array<Plant>;

  searchTerm: string = '';

  searchBy: string = 'commonName';

  constructor( private dataService: DataService, public dialog: MatDialog ) { }

  ngAfterViewInit() {
    this.getPlants();
  }

  getPlants() {
    this.dataService.getAllPlants().subscribe(plants => this.plantsList = plants);
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
    });
  }

  addToGarden(plant: Plant) {
    this.dataService.addToGarden(plant).subscribe( data => {
      if (data.n === 1) {
      }
    });
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

  openAddPlantDialog() {
    const dialogRef = this.dialog.open(AddPlantDialogComponent, {
      height: '80vh',
      width: '40%',
      panelClass: 'dialog-container'
    });

    dialogRef.afterClosed().subscribe(result => {
      // TODO
    });
  }

  openPlantDetailsDialog(plant) {
    this.openPlantDetailsDialogEvent.emit(plant);
  }
}
