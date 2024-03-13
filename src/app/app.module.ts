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
import { HlmTableComponent } from "../../libs/ui/ui-table-helm/src/lib/hlm-table.component";
import { HlmCaptionComponent } from "../../libs/ui/ui-table-helm/src/lib/hlm-caption.component";
import { HlmThComponent } from "../../libs/ui/ui-table-helm/src/lib/hlm-th.component";
import { HlmTrowComponent } from "../../libs/ui/ui-table-helm/src/lib/hlm-trow.component";
import { HttpClient, HttpClientModule } from '@angular/common/http';

@NgModule({
    declarations: [
        AppComponent,
        GameListComponent,
        TopBarComponent
    ],
    providers: [],
    bootstrap: [AppComponent],
    imports: [
        HttpClientModule,
        BrowserModule,
        AppRoutingModule,
        BrowserAnimationsModule,
        MatTableModule,
        MatToolbarModule,
        MatButtonModule,
        MatIconModule,
        HlmTableComponent,
        HlmCaptionComponent,
        HlmThComponent,
        HlmTrowComponent,
    ]
})
export class AppModule { }
