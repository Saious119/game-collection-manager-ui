import { Injectable } from "@angular/core";
import { HttpClientModule } from "@angular/common/http";

export class ApiService {
  constructor(private http: HttpClientModule) {}

  public getGameCollection(user: string) {
    return this.http.get<any>(
      "localhost:5000/GameCollection/GetCollection/" + user,
    );
  }
}
