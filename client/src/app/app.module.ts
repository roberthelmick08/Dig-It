import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { MatIconModule, MatDialog, MatDialogModule, MatButtonModule } from '@angular/material';
import { OverlayModule } from '@angular/cdk/overlay';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { SearchComponent } from './search/search.component';
import { AddPlantDialogComponent } from './search/add-plant-dialog/add-plant-dialog.component';

@NgModule({
  declarations: [
    AppComponent,
    SearchComponent,
    AddPlantDialogComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    FormsModule,
    MatIconModule,
    MatButtonModule,
    OverlayModule,
    MatDialogModule,
    BrowserAnimationsModule
  ],
  entryComponents: [
    AddPlantDialogComponent,
  ],
  providers: [MatDialog],
  bootstrap: [AppComponent]
})
export class AppModule { }
