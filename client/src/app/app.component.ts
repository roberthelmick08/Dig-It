import { DataService } from './services/data.service';
import { Component, OnInit } from '@angular/core';
import { User } from 'src/models/user';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  currentUser: User;

  isUserMenuOpen: boolean = false;

  currentPage: string = 'garden';

  constructor(private dataService: DataService) {

  }

  ngOnInit() {
    // this.dataService.getUser();
  }

  setCurrentPage(page: string) {
    this.currentPage = page;
  }

  toggleUserMenu() {
    this.isUserMenuOpen = !this.isUserMenuOpen;
  }
}
