import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class GenreService {


  baseUrl: string = "http://localhost:3000/genre/genre";
  IdUrl: string = "http://localhost:3000/genre/";

  constructor(private httpClient: HttpClient) { }

  public getGenreById(id) {
    return this.httpClient.get(this.IdUrl + id);

  }

  public getAllGenres() {
    return this.httpClient.get(this.baseUrl);

  }

  public addGenres(obj) {
    return this.httpClient.post(this.baseUrl, obj, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      })
    }).pipe(map(data =>
      data));

  }






}