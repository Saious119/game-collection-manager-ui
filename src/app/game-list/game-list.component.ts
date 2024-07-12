import { Component, Inject, OnInit } from '@angular/core';
import { GameDataModel } from '../core/services/shared/models/game-data-model';
import { ApiService } from '../core/services/api-services/api.services';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { provideNativeDateAdapter } from '@angular/material/core';
import {
  MatDialog,
  MAT_DIALOG_DATA,
  MatDialogRef,
  MatDialogTitle,
  MatDialogContent,
  MatDialogActions,
  MatDialogClose,
} from '@angular/material/dialog';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { SharedDataService } from '../core/services/shared/shared.data.service';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';

@Component({
  selector: 'app-game-list',
  templateUrl: './game-list.component.html',
  styleUrls: ['./game-list.component.scss'],
})
export class GameListComponent implements OnInit {
  gameDataList: GameDataModel[] = [];
  spinner: boolean = false;

  constructor(
    private apiService: ApiService,
    private dialog: MatDialog,
    private sharedDataService: SharedDataService
  ) {}

  displayedColumns: string[] = [
    'name',
    'releaseDate',
    'platform',
    'metacriticScore',
    'howlong',
    'deleteIcon',
  ];

  ngOnInit(): void {
    console.log('Loading Table');
    this.spinner=true;
    this.sharedDataService.getCurrentGameList();
    this.sharedDataService.currentGameList$.subscribe((res) => {
      console.log(res);
      this.gameDataList = res;
      this.spinner =false;
    });
  }

  addNewGame(): void {
    let dialogRef = this.dialog.open(NewGameDialogComponent, {
      height: '470px',
      width: '600px',
    });
    dialogRef.afterClosed().subscribe((res) => {});
  }

  removeGame(game: GameDataModel): void {
    this.apiService.removeGame('Test', game).subscribe((removeRes) => {
      this.apiService
        .getGameCollection('Test')
        .subscribe((res: GameDataModel[]) => {
          console.log(res);
          //this.gameDataList = res;
          this.sharedDataService.setCurrentGameList(res);
          console.log(this.gameDataList);
        });
    });
  }
}

@Component({
  selector: 'new-game-dialog',
  templateUrl: './new-game-dialog.html',
  styleUrls: ['./new-game-dialog.scss'],
})
export class NewGameDialogComponent implements OnInit {
  consoleList: string[] = [];
  spinner: boolean = false;
  data: GameDataModel = {
    name: 'None',
    releaseDate: '1/1/1900',
    platform: 'Other',
    metacriticScore: '0',
    howlong: '0',
  };

  constructor(
    public dialogRef: MatDialogRef<NewGameDialogComponent>,
    private apiService: ApiService,
    private sharedDataService: SharedDataService
  ) {}

  ngOnInit(): void {
    this.apiService.getConsoleList().subscribe((data) => {
      console.log(data);
      this.consoleList = data;
    });
  }

  updateDate(dateObject: MatDatepickerInputEvent<Date>) {
    //const stringified = JSON.stringify(dateObject);
    //this.data.releaseDate = stringified.substring(1, 11);
    if (dateObject.value != null) {
      this.data.releaseDate = dateObject.value.toLocaleDateString();
      console.log(this.data.releaseDate);
    }
  }

  submit(): void {
    this.spinner = true;
    console.log('Submitted New Game');
    this.apiService
      .getMetaCriticScore(this.data.name, this.data.platform)
      .subscribe((res) => {
        this.data.metacriticScore = res.metaScore.toString();
        this.apiService.getHowLongToBeat(this.data.name).subscribe((res) => {
          this.data.howlong = res.gameplayMain.toString();
          this.apiService
            .postNewGame('Test', this.data)
            .subscribe((postRes) => {
              this.sharedDataService.getCurrentGameList();
              this.spinner = false;
              this.dialogRef.close();
            });
        });
      });
  }

  noClick(): void {
    this.dialogRef.close();
  }
}
