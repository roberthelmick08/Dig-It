import { Component, Output } from '@angular/core';
import { AuthenticationService, TokenPayload } from '../../services/authentication.service';
import { Router } from '@angular/router';
import { EventEmitter } from '@angular/core';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})

export class LoginComponent {

  @Output()
  navigateToRegisterEvent = new EventEmitter();
  @Output()
  navigateToGardenEvent = new EventEmitter();

  loginCredentials: TokenPayload = {
    email: '',
    password: '',
  };

  registerCredentials: TokenPayload = {
    email: '',
    name: '',
    password: '',
    admin: false,
    phone: null,
    zone: 8,
    zip: null,
    garden: []
  };

  activePageTab: 'login' | 'register' = 'login';

  constructor(private auth: AuthenticationService, private router: Router) {}

  login() {
    this.auth.login(this.loginCredentials).subscribe(() => {
      this.navigateToGardenEvent.emit(null);
    }, (err) => {
      console.error(err);
    });
  }

  register() {    
    // Latitude and Longitude to use for Frostline API
    let coordinates: {lat: number, lon: number};

    let res;

    // this.auth.doCORSRequest({
    //   method: 'GET',
    //   url: 'https://phzmapi.org/' + this.registerCredentials + '.json',
    // }, function printResult(result) {
    //   res = JSON.parse(result);
    // });

    this.auth.doCORSRequest({
      method: 'GET',
      url: 'https://phzmapi.org/' + this.registerCredentials + '.json',
    }).subscribe( result => {
      res = JSON.parse(result);
      this.navigateToGardenEvent.emit(null);
    }, (err) => {
      console.error(err);
    });
  }
}
