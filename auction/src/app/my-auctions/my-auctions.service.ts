import { environment } from './../../environments/environment';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})

export class MyAuctionsService {
    error: string;
    constructor(private httpClient: HttpClient) { }

    getMyAuctions(): Observable<any> {
        let params = new HttpParams();
        params = params.append('user_id', localStorage.getItem('user_id'));
        return this.httpClient.get<any>(environment.myAuctionurl, { params } );
    }
}
