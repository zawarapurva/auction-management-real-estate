import { AlertService } from './../alert/alert.service';
import { MyAuctionsService } from './my-auctions.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-my-auctions',
  templateUrl: './my-auctions.component.html',
  styleUrls: ['./my-auctions.component.css']
})
export class MyAuctionsComponent implements OnInit {
  public auctions = [];
  constructor(
    private alertService: AlertService,
    private myAuctionsService: MyAuctionsService
  ) { }

  ngOnInit() {
    this.myAuctionsService.getMyAuctions().subscribe(
      (res) => {
        console.log(res);
        return this.auctions = res;
      },
      (err) => {
        return this.alertService.error(err.error.message);
      }
    );
  }

}
