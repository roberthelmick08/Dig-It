import { MatDialog } from '@angular/material';
import { Component, Input, Output } from '@angular/core';
import { EventEmitter } from '@angular/core';
import { AuthenticationService } from './../../services/authentication.service';
import { LoginDialogComponent } from '../login/login.component';
import { EditProfileDialogComponent } from '../edit-profile/edit-profile.component';
import { User } from 'src/models/user';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {
  @Output() setCurrentPageEvent = new EventEmitter;
  @Input() currentPage: string;
  @Input() user: User;

  constructor(public authService: AuthenticationService, public dialog: MatDialog) { }

  setCurrentPage(page: string){
    this.setCurrentPageEvent.emit(page);
  }

  openLoginDialog() {
    const dialogRef = this.dialog.open(LoginDialogComponent, {
      height: '400px',
      width: window.innerWidth <= 600 ? '100vw' : '700px',
      panelClass: ['dialog-container', 'remove-bottom-padding']
    });

    dialogRef.afterClosed().subscribe(() => { }, (err) => {}, () => {
      if (this.authService.isLoggedIn() === true) {
        this.setCurrentPageEvent.emit('garden');
      }
    });
  }

  openEditProfileDialog() {
    const dialogRef = this.dialog.open(EditProfileDialogComponent, {
      height: '450px',
      width: window.innerWidth <= 600 ? '100vw' : '700px',
      panelClass: ['dialog-container', 'remove-bottom-padding'],
      data: this.user,
    });

    dialogRef.afterClosed().subscribe(() => {
      if (dialogRef.componentInstance.isLogout) {
        this.onLogout();
      }
    });
  }

  onLogout() {
    this.authService.logout();
    this.setCurrentPageEvent.emit('home');
  }
}
