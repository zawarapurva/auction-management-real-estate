import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/take';

@Injectable({
  providedIn: 'root'
})
export class CreateAuctionService {
  baseUrl = 'http://localhost:5000'; // our local Hapi Js API

  constructor(private _http: HttpClient) { }

  upload(formData) {
      const url = `${this.baseUrl}/photos/upload`;
      return this._http.post(url, formData)
          // .map(x => x.json())
          .map((x: any[]) => x
        // add a new field url to be used in UI later
              .map(item => Object
                  .assign({}, item, { url: `${this.baseUrl}/images/${item.id}` }))
          );
  }
}
