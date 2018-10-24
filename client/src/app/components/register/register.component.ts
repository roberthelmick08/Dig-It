
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

  @Output()
  navigateToGardenEvent = new EventEmitter();

  constructor(private auth: AuthenticationService, private dataService: DataService, private router: Router) {}

  register() {

    // TODO: API calls to determine zone, first frost date and last frost date from zip
    // this.dataService.getZoneFromZip(this.credentials.zip).subscribe(zone => {
    //   this.credentials.zone = zone;
    //   console.log(this.credentials.zone);
    // }, (err) => {
    //   console.error(err);
    // });

    this.auth.register(this.credentials).subscribe(() => {
      this.navigateToGardenEvent.emit(null);
    }, (err) => {
      console.error(err);
    });
  }
}
