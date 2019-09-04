import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  error: string;
  _url = 'http://localhost:5000/login';
  constructor(
    private _httpClient: HttpClient
  ) { }

  login(formData) {
    return this._httpClient.post<any>(this._url, formData);
  }
}
