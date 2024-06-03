import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { GameListComponent, NewGameDialogComponent } from './game-list/game-list.component';
import { TopBarComponent } from './top-bar/top-bar.component';
import { HttpClientModule } from '@angular/common/http';
import { MatTableModule } from '@angular/material/table';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatToolbarModule} from '@angular/material/toolbar'
import {MatSelectModule} from '@angular/material/select';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';



@NgModule({
    declarations: [
        AppComponent,
        GameListComponent,
        NewGameDialogComponent,
        TopBarComponent
    ],
    imports: [
        BrowserModule,
        MatTableModule,
        MatToolbarModule,
        MatIconModule,
        MatButtonModule,
        MatSelectModule,
        MatInputModule,
        MatFormFieldModule,
        HttpClientModule,
        BrowserAnimationsModule,
        FormsModule
    ],
    providers: [],
    bootstrap: [AppComponent],
})
export class AppModule { }
