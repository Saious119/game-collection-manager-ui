import { Component, Inject, OnInit } from '@angular/core';
import { GameDataModel } from '../core/services/shared/models/game-data-model';
import { ApiService } from '../core/services/api-services/api.services';
import {MatSelectModule} from '@angular/material/select';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {
  MatDialog,
  MAT_DIALOG_DATA,
  MatDialogRef,
  MatDialogTitle,
  MatDialogContent,
  MatDialogActions,
  MatDialogClose,
} from '@angular/material/dialog';


@Component({
  selector: 'app-game-list',
  templateUrl: './game-list.component.html',
  styleUrls: ['./game-list.component.scss']
})
export class GameListComponent implements OnInit {

  gameDataList: GameDataModel[] = [];

  constructor(private apiService: ApiService, private dialog: MatDialog) {}

  displayedColumns: string[] = ['name','releaseDate','platform','metacriticScore','howlong'];
  
  ngOnInit(): void {
      console.log("Loading Table");
      this.apiService.getGameCollection("Test").subscribe((res: GameDataModel[]) => {
        console.log(res);
        this.gameDataList = res;
        console.log(this.gameDataList);
      })
  }

  addNewGame(): void {
    let dialogRef = this.dialog.open(NewGameDialogComponent, {
      height: '470px',
      width: '600px',
    });
  }

}

@Component({
  selector: 'new-game-dialog',
  templateUrl: './new-game-dialog.html',
  styleUrls: ['./new-game-dialog.scss']
})
export class NewGameDialogComponent implements OnInit {
  consoleList: string[] = [];

  data: GameDataModel= { name: 'none', releaseDate: '1/1/1900', platform: 'Other', metacriticScore: '0', howlong: '0'}; 

  constructor(public dialogRef: MatDialogRef<NewGameDialogComponent>, private apiService: ApiService) {}

  ngOnInit(): void {
    this.apiService.getConsoleList().subscribe((data) => {
      console.log(data);
      this.consoleList = data;
    })
  }

  submit(): void {
    console.log("Submitted New Game");
    console.log(this.data);
    this.apiService.postNewGame("Test", this.data);
    this.dialogRef.close();
  }

  noClick(): void {
    this.dialogRef.close();
  }
}