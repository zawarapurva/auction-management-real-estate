import { LoginComponent } from './../login/login.component';
import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable()
export class ErrorHandlerService {
  SERVER_URL = 'http://localhost:5000/login';

  constructor(private http: HttpClient) { }

  // getServerResponse(): Observable<HttpResponse<LoginComponent>> {
  //   return this.http.get<LoginComponent>(
  //     this.SERVER_URL, { observe: 'response' });
  // }

    public handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    // return an observable with a user-facing error message
    return throwError(
      'Something bad happened; please try again later.');
  }

  getErrors() {
    return this.http.get(this.SERVER_URL)
      .pipe(
        catchError(this.handleError)
      );
  }
}
