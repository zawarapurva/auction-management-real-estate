import { environment } from './../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class HomeService {
  error: string;
  constructor(private httpClient: HttpClient) { }

  getAuctions(): Observable<any> {
    return this.httpClient.get<any>(environment.homeurl);
  }
}
