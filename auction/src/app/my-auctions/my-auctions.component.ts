import { HttpErrorResponse } from '@angular/common/http';
import { MyAuctionsService } from './my-auctions.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-my-auctions',
  templateUrl: './my-auctions.component.html',
  styleUrls: ['./my-auctions.component.css']
})
export class MyAuctionsComponent implements OnInit {
  public auctions = [];
  noAuctions: boolean;
  noAuctionString: string;
  constructor(
    private myAuctionsService: MyAuctionsService
  ) { }

  ngOnInit() {
    this.noAuctions = false;
    this.myAuctionsService.getMyAuctions().subscribe(
      (res) => {
        this.auctions = res;
      },
      (err) => {
        if (err instanceof HttpErrorResponse) {
          if (err.status === 400 || err.status === 500) {
            this.noAuctions = true;
            this.noAuctionString = err.error;
          }
        }
      });
  }
}
