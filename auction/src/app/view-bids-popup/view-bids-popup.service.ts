import { environment } from './../../environments/environment';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class ViewBidsPopupService {
  error: string;
  constructor(private httpClient: HttpClient) { }

  getViewBids(formValues) {
    let params = new HttpParams();
    params = params.append('auction_id', formValues);
    return this.httpClient.get<any>(environment.viewBids, {params} );
  }
}
