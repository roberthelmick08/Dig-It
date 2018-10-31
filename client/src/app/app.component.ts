import { LoginDialogComponent } from './components/login/login.component';
import { PlantDetailsDialogComponent } from './components/plant-details-dialog/plant-details-dialog.component';
import { Component } from '@angular/core';
import { User } from 'src/models/user';
import { MatDialog } from '@angular/material';
import { Plant } from 'src/models/plant';
import { AuthenticationService } from './services/authentication.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  currentUser: User;

  isUserMenuOpen: boolean = false;

  currentPage: string;

  constructor( public dialog: MatDialog, public authService: AuthenticationService) {
    this.currentPage = authService.isLoggedIn() ? 'garden' : 'home';
  }

  setCurrentPage(page: string) {
    this.currentPage = page;
  }

  toggleUserMenu() {
    this.isUserMenuOpen = !this.isUserMenuOpen;
  }

  openPlantDetailsDialog(plant: Plant) {
    const dialogRef = this.dialog.open(PlantDetailsDialogComponent, {
      height: '500px',
      width: '700px',
      panelClass: 'dialog-container',
      data: plant,
    });

    dialogRef.afterClosed().subscribe(result => {
      // TODO
    });
  }

  openLoginDialog(){
    const dialogRef = this.dialog.open(LoginDialogComponent, {
      height: '500px',
      width: '700px',
      panelClass: 'dialog-container'
    });
  }
}
