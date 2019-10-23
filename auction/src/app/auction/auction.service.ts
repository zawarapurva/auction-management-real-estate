import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from './../../environments/environment';
@Injectable({
  providedIn: 'root'
})
export class AuctionService {
  error: string;
  constructor(
    private httpClient: HttpClient
  ) { }

  auction(formValues) {
    return this.httpClient.post<any>(environment.homeurl, formValues);
  }
}
