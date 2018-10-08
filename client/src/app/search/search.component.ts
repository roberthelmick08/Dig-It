import { DataService } from './../data.service';
import { Plant } from './../../models/plant';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css'],
  providers: [DataService]
})
export class SearchComponent implements OnInit {

  plantsList: Array<Plant> = [];

  constructor( private dataService: DataService) { }

  ngOnInit() { this.getPlants(); }

  getPlants() {
    this.dataService.getAllPlants()
        .subscribe(plants => this.plantsList = plants);
    console.log('Data from dataService', this.plantsList);
  }

}
