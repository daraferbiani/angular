import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {map, Observable} from "rxjs";
import {environment} from "../../environments/environment";
import {Kategori} from "../model/kategory.model";

@Injectable({
  providedIn: 'root'
})
export class MasterService {
  constructor(private http: HttpClient) {
  }
  list(): Observable<any> {
    return this.http.get(environment.baseUrl + '/list').pipe(map(data => data))
  }
  saveCategory( data: Kategori): Observable<any>{
    return this.http.post(environment.baseUrl + '/inputk', data).pipe(map(data => data))
  }
}
