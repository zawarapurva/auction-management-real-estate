import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RegistrationService {
  error: string;
  url = 'http://localhost:5000/register';
  constructor(
    private httpClient: HttpClient
  ) { }

  register(formData) {
    return this.httpClient.post<any>(this.url, formData);
  }
  }
