import { environment } from './../../environments/environment';
import { HttpClient, HttpParams, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})

export class ProfileService {
    error: string;
    constructor(
        private httpClient: HttpClient) { }

    getProfile() {
        let params = new HttpParams();
        params = params.append('user_id', localStorage.getItem('user_id'));
        return this.httpClient.get<any>(environment.profileurl, { params });
    }

    getMyBids() {
        let params = new HttpParams();
        params = params.append('user_id', localStorage.getItem('user_id'));
        return this.httpClient.get<any>(environment.myBids, { params });
    }
}
