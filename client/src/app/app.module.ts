import { AuthenticationService } from './services/authentication.service';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { MatIconModule, MatDialog, MatDialogModule, MatButtonModule,
  MatInputModule, MatOptionModule, MatSelectModule, MatSlideToggleModule, MatToolbarModule,
  MatSidenavModule, MatMenuModule, MatRadioModule, MatCardModule, MatCheckboxModule, MatSnackBarModule, MatTooltipModule } from '@angular/material';
import { FlexLayoutModule } from '@angular/flex-layout';
import { DragDropModule } from '@angular/cdk/drag-drop';

import { OverlayModule } from '@angular/cdk/overlay';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { SearchComponent } from './components/search/search.component';
import { AddPlantDialogComponent } from './components/search/add-plant-dialog/add-plant-dialog.component';
import { EditProfileDialogComponent } from './components/edit-profile/edit-profile.component';
import { GardenComponent } from './components/garden/garden.component';
import { LoginDialogComponent } from './components/login/login.component';
import { PlantDetailsDialogComponent } from './components/plant-details-dialog/plant-details-dialog.component';
import { AuthGuardService } from './services/auth-guard.service';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { ReminderService } from './services/reminder.service';

const routes: Routes = [
  { path: '', component: AppComponent },
];

@NgModule({
  declarations: [
    AppComponent,
    SearchComponent,
    AddPlantDialogComponent,
    EditProfileDialogComponent,
    GardenComponent,
    LoginDialogComponent,
    PlantDetailsDialogComponent,
    HomeComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    HttpModule,
    DragDropModule,
    RouterModule,
    FormsModule,
    MatIconModule,
    MatCheckboxModule,
    MatCardModule,
    MatButtonModule,
    MatRadioModule,
    MatOptionModule,
    MatSelectModule,
    MatTooltipModule,
    MatMenuModule,
    OverlayModule,
    MatInputModule,
    MatSlideToggleModule,
    MatDialogModule,
    MatMenuModule,
    MatSnackBarModule,
    MatToolbarModule,
    MatSidenavModule,
    FlexLayoutModule,
    BrowserAnimationsModule,
    RouterModule.forRoot(routes),
  ],
  entryComponents: [
    AddPlantDialogComponent,
    EditProfileDialogComponent,
    PlantDetailsDialogComponent,
    LoginDialogComponent,
  ],
  providers: [MatDialog, AuthenticationService, AuthGuardService, ReminderService],
  bootstrap: [AppComponent]
})
export class AppModule { }
