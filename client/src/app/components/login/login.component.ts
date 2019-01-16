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

  setUserCredentials(){
    this.dataService.setUserCredentials(this.registerCredentials);
    this.dialogRef.close();
    this.navigateToGardenEvent.emit(null);
    this.dataService.openSnackBar('success', 'Welcome to Dig-It!');
  }

  parseZipString() {
    this.registerCredentials.zip = parseInt(this.tempZip, 10);
  }
}
