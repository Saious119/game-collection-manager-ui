import { DataSource } from '@angular/cdk/collections';
import { Component, Inject, OnInit } from '@angular/core';
import {FormsModule} from '@angular/forms';

import {
  HlmCaptionComponent,
  HlmTableComponent,
  HlmTdComponent,
  HlmThComponent,
  HlmTrowComponent,
} from '@spartan-ng/ui-table-helm';
import { GameDataModel } from '../core/services/shared/models/game-data-model';
import { ApiService } from 'src/services/apiservice';


export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H'},
  {position: 2, name: 'Helium', weight: 4.0026, symbol: 'He'},
  {position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li'},
  {position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be'},
  {position: 5, name: 'Boron', weight: 10.811, symbol: 'B'},
  {position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C'},
  {position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N'},
  {position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O'},
  {position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F'},
  {position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne'},
];

//const dataSource: PeriodicElement[] = [];

export interface DialogData {
  animal: string;
  name: string;
}

@Component({
  selector: 'app-game-list',
  templateUrl: './game-list.component.html',
  styleUrls: ['./game-list.component.scss']
})
export class GameListComponent implements OnInit {

  gameDataList: GameDataModel[] = [];

  constructor(private apiService: ApiService) {}

  displayedColumns: string[] = ['name','releaseDate','platform','metacriticScore','howlong'];
  dataSource = ELEMENT_DATA;
  
  ngOnInit(): void {
      console.log("Loading Table");
      this.apiService.getGameCollection("Test").subscribe((res: GameDataModel[]) => {
        console.log(res);
        this.gameDataList = res;
      })
  }

}
