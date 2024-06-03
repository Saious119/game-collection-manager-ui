import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs'; // Make sure you have this import
import { GameDataModel } from '../shared/models/game-data-model';
import { HowLongToBeatService, HowLongToBeatEntry } from 'howlongtobeat';

@Injectable({
  providedIn: 'root', // Or specify a different module
})
export class ApiService {

  constructor(private http: HttpClient) { }

  public getGameCollection(user: string): Observable<GameDataModel[]> {
    console.log('Getting game list data from api...');
    //return this.httpClient.get<GameDataModel[]>('localhost:5000/GameCollection/GetCollection'+user);
    return this.http.get<any>(
      'http://localhost:5000/GameCollection/GetCollection/' + user
    );
  }

  public postNewGame(user: string, data: GameDataModel) {
    this.http.post('http://localhost:5000/GameCollection/AddNewGame?user='+user, data).subscribe(res => {
      console.log(res);
    })
  }

  public getConsoleList(): Observable<string[]> {
    console.log('Getting Console List from JSON...');
    return this.http.get<string[]>('assets/console-list.json');
  }

  public getHowLongToBeat(name: string): Observable<any> {
    let hltbService = new HowLongToBeatService();
    return of(hltbService.search(name));
  }
}
