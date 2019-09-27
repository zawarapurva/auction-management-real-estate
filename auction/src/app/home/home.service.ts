import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class HomeService {
  error: string;
  url = 'http://localhost:5000/home';
  constructor(private httpClient: HttpClient) { }

  getAuctions(): Observable<any> {
    return this.httpClient.get<any>(this.url );
  }
}
