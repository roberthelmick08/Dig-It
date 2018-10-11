import { AddPlantDialogComponent } from './add-plant-dialog/add-plant-dialog.component';
import { DataService } from '../../services/data.service';
import { Plant } from './../../../models/plant';
import { Component, AfterViewInit } from '@angular/core';
import { MatDialog } from '@angular/material';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
  providers: [ DataService ]
})
export class SearchComponent implements AfterViewInit {
  // Variable to store ALL plants from database
  plantsList: Array<Plant> = [];

  // Variable to store VISIBLE plants after filter is applied
  visiblePlants: Array<Plant>;

  searchTerm: string = '';

  constructor( private dataService: DataService, public dialog: MatDialog ) { }

  ngAfterViewInit() {
    this.getPlants();
  }

  getPlants() {
    this.dataService.getAllPlants()
        .subscribe(plants => this.plantsList = plants);
  }

  onSearch() {
    this.visiblePlants = this.plantsList.filter(plant => {
      return plant.botanicalName.toLowerCase().includes(this.searchTerm.toLowerCase())
          || plant.commonName.toLowerCase().includes(this.searchTerm.toLowerCase());
    });
    console.log(this.visiblePlants);
  }

  openAddPlantDialog() {
    const dialogRef = this.dialog.open(AddPlantDialogComponent, {
      height: '80vh',
      width: '40%'
    });

    dialogRef.afterClosed().subscribe(result => {
      // TODO
    });
  }
}
