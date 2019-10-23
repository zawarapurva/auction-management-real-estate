import { environment } from './../../environments/environment';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class ViewBidsPopupService {
  constructor(
    private httpClient: HttpClient,
   ) { }

  getViewBids(auctionId) {
    let params = new HttpParams();
    params = params.append('auction_id', auctionId);
    return this.httpClient.get<any>(environment.viewBids, { params });
  }

  winner(username, auctionId) {
    return this.httpClient.post<any>(environment.winner, { username, auctionId });
  }
}
