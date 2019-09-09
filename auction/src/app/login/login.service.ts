import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  error: string;
  url = 'http://localhost:5000/login';
  constructor(
    private httpClient: HttpClient
  ) { }

  login(formData) {
    return this.httpClient.post<any>(this.url, formData);
  }
}
