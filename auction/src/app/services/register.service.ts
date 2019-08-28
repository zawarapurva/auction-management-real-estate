import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class RegisterService {
  SERVER_URL = 'http://localhost:5000/register';

  getRegister() {
    return this.http.get(this.SERVER_URL);
  }

  constructor(private http: HttpClient) { }

}
