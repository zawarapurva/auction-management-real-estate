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
    const formData = new FormData();
    formData.append('id', formValues._id);
    formData.append('buyer_id', localStorage.getItem('user_id'));
    formData.append('bid_value', formValues.bid_value);
    console.log(formData);
    return this.httpClient.post<any>(environment.homeurl, formData);
  }
}
