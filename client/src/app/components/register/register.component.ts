
import { Component, Output, EventEmitter } from '@angular/core';
import { AuthenticationService, TokenPayload } from '../../services/authentication.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})

export class RegisterComponent {
  credentials: TokenPayload = {
    email: '',
    name: '',
    password: '',
    admin: false,
    phone: null,
    zone: null,
    zip: null,
    garden: []

  };

  @Output()
  navigateToGardenEvent = new EventEmitter();

  constructor(private auth: AuthenticationService, private router: Router) {}

  register() {
    this.auth.register(this.credentials).subscribe(() => {
      this.navigateToGardenEvent.emit(null);
    }, (err) => {
      console.error(err);
    });
  }
}
