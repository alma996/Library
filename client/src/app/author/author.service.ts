import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class AuthorService {


  baseUrl: string = "http://localhost:3000/author/author";
  IdUrl: string = "http://localhost:3000/author/";

  constructor(private httpClient: HttpClient) { }



  public getAllUsers() {
    return this.httpClient.get(this.baseUrl);

  }


  public getUserById(id) {
    return this.httpClient.get(this.IdUrl + id);

  }

  public addAuthors(obj) {
    return this.httpClient.post(this.baseUrl, obj, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      })
    }).pipe(map(data =>
      data));

  }






}