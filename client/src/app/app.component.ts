import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  isUserMenuOpen: boolean = false;

  currentPage: string = 'garden';

  setCurrentPage(page: string) {
    this.currentPage = page;
  }

  toggleUserMenu(){
    this.isUserMenuOpen = !this.isUserMenuOpen;
  }
}
