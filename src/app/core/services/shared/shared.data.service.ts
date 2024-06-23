import { Injectable } from '@angular/core';
import { ReplaySubject, Subject } from 'rxjs';
import { GameDataModel } from './models/game-data-model';
import { ApiService } from '../api-services/api.services';

@Injectable({
  providedIn: 'root',
})
export class SharedDataService {
  currentGameList: GameDataModel[] = [];
  currentGameListSubject: ReplaySubject<GameDataModel[]> = new ReplaySubject<
    GameDataModel[]
  >();
  currentGameList$ = this.currentGameListSubject.asObservable();

  constructor(private apiService: ApiService) {}

  getCurrentGameList() {
    this.apiService.getGameCollection('Test').subscribe({
      next: (res) => {
        console.log(res);
        this.currentGameListSubject.next(res);
      },
    });
  }

  setCurrentGameList(gameList: GameDataModel[]) {
    this.currentGameListSubject.next(gameList);
  }
}
