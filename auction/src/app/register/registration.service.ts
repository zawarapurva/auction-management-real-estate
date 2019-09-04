import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RegistrationService {
  error: string;
  _url = 'http://localhost:5000/register';
  constructor(
    private _httpClient: HttpClient
  ) { }

  register(formData) {
    return this._httpClient.post<any>(this._url, formData);
  }
  }
