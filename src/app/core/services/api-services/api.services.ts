import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs'; // Make sure you have this import
import { GameDataModel } from '../shared/models/game-data-model';

@Injectable({
  providedIn: 'root', // Or specify a different module
})
export class ApiService {
  constructor(private http: HttpClient) {}

    public getGameCollection(user: string): Observable<GameDataModel[]> {
        console.log("Getting game list data from api...");
        //return this.httpClient.get<GameDataModel[]>('localhost:5000/GameCollection/GetCollection'+user);
        return this.http.get<any>('localhost:5000/GameCollection/GetCollection'+user); 
    }
}