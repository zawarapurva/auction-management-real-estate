import { environment } from './../../environments/environment';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class SearchService {
  constructor(
    private httpClient: HttpClient,
   ) { }

  getPropertyType(value) {
    let params = new HttpParams();
    params = params.append('property_type', value);
    return this.httpClient.get<any>(environment.search, { params });
  }
}
