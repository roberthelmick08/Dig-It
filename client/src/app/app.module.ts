import { AuthenticationService } from './services/authentication.service';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { MatIconModule, MatDialog, MatDialogModule, MatButtonModule,
  MatInputModule, MatOptionModule, MatSelectModule, MatSlideToggleModule, MatToolbarModule,
  MatSidenavModule, MatMenuModule, MatRadioModule, MatCardModule, MatCheckboxModule } from '@angular/material';
import { FlexLayoutModule } from '@angular/flex-layout';

import { OverlayModule } from '@angular/cdk/overlay';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { SearchComponent } from './components/search/search.component';
import { AddPlantDialogComponent } from './components/search/add-plant-dialog/add-plant-dialog.component';
import { EditProfileComponent } from './components/edit-profile/edit-profile.component';
import { GardenComponent } from './components/garden/garden.component';
import { RemindersComponent } from './components/reminders/reminders.component';
import { LoginComponent } from './components/login/login.component';
import { PlantDetailsDialogComponent } from './components/plant-details-dialog/plant-details-dialog.component';
import { RegisterComponent } from './components/register/register.component';
import { AuthGuardService } from './services/auth-guard.service';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', component: AppComponent },
];

@NgModule({
  declarations: [
    AppComponent,
    SearchComponent,
    AddPlantDialogComponent,
    EditProfileComponent,
    GardenComponent,
    LoginComponent,
    RemindersComponent,
    PlantDetailsDialogComponent,
    RegisterComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    HttpModule,
    RouterModule,
    FormsModule,
    MatIconModule,
    MatCheckboxModule,
    MatCardModule,
    MatButtonModule,
    MatRadioModule,
    MatOptionModule,
    MatSelectModule,
    OverlayModule,
    MatInputModule,
    MatSlideToggleModule,
    MatDialogModule,
    MatMenuModule,
    MatToolbarModule,
    MatSidenavModule,
    FlexLayoutModule,
    BrowserAnimationsModule,
    RouterModule.forRoot(routes),
  ],
  entryComponents: [
    AddPlantDialogComponent,
  ],
  providers: [MatDialog, AuthenticationService, AuthGuardService],
  bootstrap: [AppComponent]
})
export class AppModule { }
