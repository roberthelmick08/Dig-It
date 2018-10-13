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
import { PlantDetailsDialogComponent } from './components/plant-details-dialog/plant-details-dialog.component';

@NgModule({
  declarations: [
    AppComponent,
    SearchComponent,
    AddPlantDialogComponent,
    EditProfileComponent,
    GardenComponent,
    RemindersComponent,
    PlantDetailsDialogComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
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
    BrowserAnimationsModule
  ],
  entryComponents: [
    AddPlantDialogComponent,
  ],
  providers: [MatDialog],
  bootstrap: [AppComponent]
})
export class AppModule { }
