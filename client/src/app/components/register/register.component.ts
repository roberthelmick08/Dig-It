
import { Component, Output, EventEmitter } from '@angular/core';
import { AuthenticationService, TokenPayload } from '../../services/authentication.service';
import { Router } from '@angular/router';
import { DataService } from 'src/app/services/data.service';

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
    zone: 8,
    zip: null,
    garden: []
  };

  constructor(private auth: AuthenticationService, private dataService: DataService, private router: Router) { }

register() {
  this.auth.setUser(this.credentials);
}

}
