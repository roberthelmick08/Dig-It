import { AddPlantDialogComponent } from './add-plant-dialog/add-plant-dialog.component';
import { DataService } from './../data.service';
import { Plant } from './../../models/plant';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css'],
  providers: [ DataService ]
})
export class SearchComponent implements OnInit {

  plantsList: Array<Plant> = [];

  constructor( private dataService: DataService, public dialog: MatDialog ) { }

  ngOnInit() {
    this.getPlants();
  }

  getPlants() {
    this.dataService.getAllPlants()
        .subscribe(plants => this.plantsList = plants);
  }

  openAddPlantDialog() {
    const dialogRef = this.dialog.open(AddPlantDialogComponent, {
      height: '60vh',
      width: '40%'
    });

    dialogRef.afterClosed().subscribe(result => {
      // TODO
    });
  }
}
