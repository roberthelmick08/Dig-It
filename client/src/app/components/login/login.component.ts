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

  credentials: TokenPayload = {
    email: '',
    name: '',
    password: '',
    admin: false,
    phone: 7577132191,
    zone: 9,
    zip: 75056,
    garden: []
  };

  constructor(private auth: AuthenticationService, private router: Router) {}

  login() {
    this.auth.login(this.credentials).subscribe(() => {
      console.error('NAV TO GARDEN - LOGIN comp');
      this.navigateToGardenEvent.emit(null);
    }, (err) => {
      console.error(err);
    });
  }

  navigateToRegister() {
    this.navigateToRegisterEvent.emit(null);
  }
}
