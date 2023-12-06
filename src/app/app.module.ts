import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { GameListComponent } from './game-list/game-list.component';
import { TopBarComponent } from './top-bar/top-bar.component';
import { MatLegacyTableModule as MatTableModule } from '@angular/material/legacy-table';
import { MatToolbar, MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatLegacyButtonModule as MatButtonModule } from '@angular/material/legacy-button';
import { MatLegacyFormField as MatFormField } from '@angular/material/legacy-form-field';
import { MatLegacyDialog as MatDialog } from '@angular/material/legacy-dialog';

@NgModule({
  declarations: [
    AppComponent,
    GameListComponent,
    TopBarComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatTableModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
