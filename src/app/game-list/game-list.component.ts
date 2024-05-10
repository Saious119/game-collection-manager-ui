import { Component, Inject, OnInit } from '@angular/core';
import { GameDataModel } from '../core/services/shared/models/game-data-model';
import { ApiService } from 'src/services/apiservice';


@Component({
  selector: 'app-game-list',
  templateUrl: './game-list.component.html',
  styleUrls: ['./game-list.component.scss']
})
export class GameListComponent implements OnInit {

  gameDataList: GameDataModel[] = [];

  constructor(private apiService: ApiService) {}

  displayedColumns: string[] = ['name','releaseDate','platform','metacriticScore','howlong'];
  
  ngOnInit(): void {
      console.log("Loading Table");
      this.apiService.getGameCollection("Test").subscribe((res: GameDataModel[]) => {
        console.log(res);
        this.gameDataList = res;
        console.log(this.gameDataList);
      })
  }

}
