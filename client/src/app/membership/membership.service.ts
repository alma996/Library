import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from "rxjs/operators";


@Injectable({
  providedIn: 'root'
})


export class MembershipService {


  constructor(private httpClient: HttpClient) {
  }

  baseUrl: string = "http://localhost:3000/membership/:id"
  IdUrl: string = "http://localhost:3000/membership/";

  public getMembershipById(id, id1) {
    return this.httpClient.get(this.IdUrl + id + '/' + id1);

  }

  public getAllMembership(obj) {
    return this.httpClient.get(this.baseUrl, obj).pipe(map(data =>
      data));
  }

  public addMembership(obj) {
    return this.httpClient.post(this.baseUrl, obj, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      })
    }).pipe(map(data =>
      data));

  }






}