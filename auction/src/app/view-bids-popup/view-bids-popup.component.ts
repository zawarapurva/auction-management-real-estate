import { HttpErrorResponse } from '@angular/common/http';
import { AlertService } from './../alert/alert.service';
import { Component, OnInit, Input } from '@angular/core';
import { ViewBidsPopupService } from './view-bids-popup.service';

@Component({
  selector: 'app-view-bids-popup',
  templateUrl: './view-bids-popup.component.html',
  styleUrls: ['./view-bids-popup.component.css']
})
export class ViewBidsPopupComponent implements OnInit {
  message: any;
  public viewBids = [];
  @Input() auctionViewBid: any ;
  @Input() isShow: any ;
  error: string;
  hideBids: boolean;
  winner: string;
  noBids: boolean;
  constructor(
    private viewBidsPopupService: ViewBidsPopupService,
    private alertService: AlertService
  ) { }

  ngOnInit() {
    this.isShow = false;
    this.hideBids = false;
    this.noBids = false;
    this.viewBidsPopupService.getViewBids(this.auctionViewBid).subscribe(
      (res) => {
        if (res.length === 0 || res === null) {
          this.noBids = true;
        } else {
          this.viewBids = res;
        }
      },
      (err) => {
        if (err instanceof HttpErrorResponse) {
          if (err.status === 200) {
            this.hideBids = true;
            this.winner = err.error.text;
          }
          if (err.status === 400 || err.status === 500) {
            this.alertService.error(err.error.message);
          }
        }
        this.alertService.error(err);
      });
  }

  setWinner(event) {
    this.viewBidsPopupService.winner(event.target.value, this.auctionViewBid).subscribe(
      (res) => {
        console.log(res);
        this.hideBids = true;
        this.winner = res.winner;
      },
      (err) => {
        if (err instanceof HttpErrorResponse) {
          if (err.status === 400 || err.status === 500) {
            this.alertService.error(err.error.message);
          }
        }
        this.alertService.error(err);
      });
  }

  toggle() {
    this.isShow  = !this.isShow;
  }

}
