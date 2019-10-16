import { environment } from './../../environments/environment';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Injectable({
  providedIn: 'root'
})

export class ViewBidsPopupService {
  error: string;
  constructor(
    private httpClient: HttpClient,
    private route: ActivatedRoute) { }

  getViewBids() {
    const auction_id = this.route.queryParams.value.auction_id;
    let params = new HttpParams();
    params = params.append('auction_id', auction_id);
    return this.httpClient.get<any>(environment.viewBids, {params});
  }

  winner(username) {
    console.log(username);
    const auction_id = this.route.queryParams.value.auction_id;
    return this.httpClient.post<any>(environment.winner, { username, auction_id});
  }
}
