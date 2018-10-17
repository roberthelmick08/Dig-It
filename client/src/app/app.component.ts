import { PlantDetailsDialogComponent } from './components/plant-details-dialog/plant-details-dialog.component';
import { Component } from '@angular/core';
import { User } from 'src/models/user';
import { MatDialog } from '@angular/material';
import { Plant } from 'src/models/plant';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  currentUser: User;

  isUserMenuOpen: boolean = false;

  currentPage: string = 'garden';

  constructor( public dialog: MatDialog) { }

  setCurrentPage(page: string) {
    this.currentPage = page;
  }

  toggleUserMenu() {
    this.isUserMenuOpen = !this.isUserMenuOpen;
  }

  openPlantDetailsDialog(plant: Plant) {
    const dialogRef = this.dialog.open(PlantDetailsDialogComponent, {
      height: '80vh',
      width: '40%',
      data: plant
    });

    dialogRef.afterClosed().subscribe(result => {
      // TODO
    });
  }
}
