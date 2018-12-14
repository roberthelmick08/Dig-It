import { Component, Output, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { EventEmitter } from '@angular/core';
import { MatDialogRef } from '@angular/material';
import { DataService } from './../../services/data.service';
import { AuthenticationService, TokenPayload } from '../../services/authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})

export class LoginDialogComponent implements OnInit{

  @Output()
  navigateToRegisterEvent = new EventEmitter();
  @Output()
  navigateToGardenEvent = new EventEmitter();

  // Temp variable to store string of ZIP code used for parseInt
  tempZip: string;

  // Variable to toggle loading icon
  isLoading: boolean = false;

  // Variable to toggle login input visibility
  isLoginActive: boolean = true;

  loginCredentials: TokenPayload = {
    email: '',
    password: '',
  };

  registerCredentials: TokenPayload = {
    email: '',
    password: '',
    admin: false,
    phone: null,
    zone: null,
    zip: null,
    firstFrostDate: null,
    lastFrostDate: null,
    garden: []
  };

  activePageTab = 'login';

  constructor(public dialogRef: MatDialogRef<LoginDialogComponent>, private auth: AuthenticationService,
    private dataService: DataService, private router: Router) {}

  ngOnInit(){
    if(localStorage.getItem("first_visit") !== "1"){
      this.isLoginActive = false;
      localStorage.setItem("first_visit", "1");
    }
  }

  login() {
    this.auth.login(this.loginCredentials).subscribe(() => { }, (err) => {
      this.dataService.openSnackBar('fail', 'Unable to log in. Please try again.');
      console.error(err);
    }, () => {
      this.navigateToGardenEvent.emit(null);
      this.dialogRef.close();
    });
  }

  loginDemoUser() {
    this.isLoginActive = true;
    this.loginCredentials = {
      email: "demo@dig-it.com",
      password: "demo123"
    }
  }

  register() {
    this.auth.setUser(this.registerCredentials).subscribe((result) => { }, (err) => {
      this.dataService.openSnackBar('fail', 'Unable to register. Please try again.');
      console.error(err);
    }, () => {
      this.dialogRef.close();
      this.navigateToGardenEvent.emit(null);
      this.dataService.openSnackBar('success', 'Welcome to Dig-It!');
    });
  }

  setUserCredentials() {
    // Latitude and Longitude to use for Frostline API
    let coordinates: {lat: number, lon: number};

    this.isLoading = true;

    this.auth.doCORSRequest({
      method: 'GET',
      url: 'https://phzmapi.org/' + this.registerCredentials.zip + '.json',
    }).subscribe( result => {
      result = JSON.parse(result);
      coordinates = result.coordinates;
      this.registerCredentials.zone = result.zone.substring(0, result.zone.length - 1);
    }, (err) => {
      this.dataService.openSnackBar('fail');
      console.error(err);
    }, () => {
      this.getClosestWeatherStation(coordinates);
    });
  }

  getClosestWeatherStation(coordinates) {
    // ID of closest weather station used by FarmSense API to find frost dates
    let stationId;

    this.auth.doCORSRequest({
      method: 'GET',
      url: 'http://api.farmsense.net/v1/frostdates/stations/?lat=' + coordinates.lat + '&lon=' + coordinates.lon
    }).subscribe( result => {
      result = JSON.parse(result);
      stationId = result[0].id;
    }, (err) => {
      this.dataService.openSnackBar('fail');
      console.error(err);
    }, () => {
      this.getFrostDates(stationId, 1);
      this.getFrostDates(stationId, 2);
    });
  }

  getFrostDates(stationId: number, season: number) {
    this.auth.doCORSRequest({
      method: 'GET',
      url: 'http://api.farmsense.net/v1/frostdates/probabilities/?station=' + stationId + '&season=' + season
    }).subscribe( result => {
      result = JSON.parse(result);
      let dateString = (new Date()).getFullYear() + '-' + result[0].prob_90.toString().substr(0, 2) + '-' + result[0].prob_90.toString().substr(2, 2);
      if (season === 1) {
        this.registerCredentials.lastFrostDate = new Date(dateString);
      } else {
        this.registerCredentials.firstFrostDate = new Date(dateString);
      }
    }, (err) => {
      this.dataService.openSnackBar('fail');
      console.error(err);
    }, () => {
      if (season === 2) {
        this.register();
      }
    });
  }

  parseZipString() {
    this.registerCredentials.zip = parseInt(this.tempZip, 10);
  }
}
