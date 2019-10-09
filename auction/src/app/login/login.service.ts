import { environment } from './../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  error: string;
  constructor(
    private httpClient: HttpClient
  ) { }

  login(formData) {
    console.log(formData);
    return this.httpClient.post<any>(environment.loginurl, formData);
  }
}
