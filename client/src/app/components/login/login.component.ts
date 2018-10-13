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
    password: ''
  };

  constructor(private auth: AuthenticationService, private router: Router) {}

  login() {
    this.auth.login(this.credentials).subscribe(() => {
    this.navigateToGardenEvent.emit(null);
    }, (err) => {
      console.error(err);
    });
  }

  navigateToRegister() {
    this.navigateToRegisterEvent.emit(null);
  }
}
