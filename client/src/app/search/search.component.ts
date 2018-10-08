import { DataService } from './../data.service';
import { Plant } from './../../models/plant';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  plantsList: Array<Plant> = [];

  constructor( private dataService: DataService) { }

  ngOnInit() { }

  getPlants() {

  }

}
