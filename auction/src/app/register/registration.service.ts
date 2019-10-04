import { environment } from './../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RegistrationService {
  error: string;
  constructor(
    private httpClient: HttpClient
  ) { }

  register(formData) {
    return this.httpClient.post<any>(environment.registerurl, formData);
  }
  }
