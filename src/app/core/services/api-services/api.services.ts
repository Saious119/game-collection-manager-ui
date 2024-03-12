import { Component, Injectable } from "@angular/core";
import { HttpClient, HttpHeaders, HttpErrorResponse } from "@angular/common/http";
import { Observable } from "rxjs";
import { GameDataModel } from "../shared/models/game-data-model";

@Injectable({
    providedIn: 'root'
})
export class ApiServices {
    constructor(private httpClient: HttpClient) {}

    public getGameList(user: string): Observable<GameDataModel[]> {
        console.log("Getting game list data from api...");
        return this.httpClient.get<GameDataModel[]>('localhost:5000/GameCollection/GetCollection'+user);
    }
}