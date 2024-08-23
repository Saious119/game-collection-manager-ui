import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError, Observable, of, retry, throwError } from 'rxjs'; // Make sure you have this import
import { GameDataModel } from '../shared/models/game-data-model';
import { HowLongToBeatService, HowLongToBeatEntry } from 'howlongtobeat';
import { MetaCriticResponse } from '../shared/models/metacritic-response-model';

@Injectable({
  providedIn: 'root', // Or specify a different module
})
export class ApiService {
  constructor(private http: HttpClient) {}

  public getGameCollection(user: string): Observable<GameDataModel[]> {
    console.log('Getting game list data from api...');
    //return this.httpClient.get<GameDataModel[]>('localhost:5000/GameCollection/GetCollection'+user);
    return this.http.get<any>(
      'http://localhost:5000/GameCollection/GetCollection/' + user
    );
  }

  public postNewGame(user: string, data: GameDataModel) {
    return this.http.post(
      'http://localhost:5000/GameCollection/AddNewGame?user=' + user,
      data
    );
  }

  public removeGame(user: string, data: GameDataModel) {
    return this.http.post(
      'http://localhost:5000/GameCollection/DeleteGame?user=' + user,
      data
    );
  }

  public getConsoleList(): Observable<string[]> {
    console.log('Getting Console List from JSON...');
    return this.http.get<string[]>('assets/console-list.json');
  }

  public getMetaCriticScore(name: string, platform: string) {
    return this.http.get<MetaCriticResponse>(
      'http://localhost:5000/GameCollection/GetMetaCriticInfo?name=' +
        name +
        '&platform=' +
        platform
    );
  }
  public getHowLongToBeat(name: string): Observable<HowLongToBeatEntry> {
    return this.http.get<HowLongToBeatEntry>(
      'http://localhost:3001/api/game/' + name
    );
  }

  private handleError(error: HttpErrorResponse) {
    if (error.status === 0) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong.
      console.error(
        `Backend returned code ${error.status}, body was: `, error.error);
    }
    // Return an observable with a user-facing error message.
    return throwError(() => new Error('Something bad happened; please try again later.'));
  }
}
