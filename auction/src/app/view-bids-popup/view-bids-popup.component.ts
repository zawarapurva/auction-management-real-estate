import { HttpErrorResponse } from '@angular/common/http';
import { AlertService } from './../alert/alert.service';
import { Auction } from '../Modals/Auction';
import { Component, OnInit, Input, AfterViewInit, OnDestroy, Type } from '@angular/core';
import { ViewBids } from '../Modals/ViewBids';
import { ViewBidsPopupService } from './view-bids-popup.service';

@Component({
  selector: 'app-view-bids-popup',
  templateUrl: './view-bids-popup.component.html',
  styleUrls: ['./view-bids-popup.component.css']
})
export class ViewBidsPopupComponent implements OnInit {
  @Input() viewBids: ViewBids;
  @Input() auctionViewBid: string;
  error: string;
  constructor(
    private viewBidsPopupService: ViewBidsPopupService,
    private alertService: AlertService
  ) { }

  ngOnInit() {
    console.log(this.auctionViewBid);
    const formValues = this.auctionViewBid;
    this.viewBidsPopupService.getViewBids(formValues).subscribe(
      (res) => {
        console.log(res);
        const bids = res;
        return res;
      },
      (err) => {
        if (err instanceof HttpErrorResponse) {
          if (err.status === 400 || err.status === 500) {
            this.error = err.error.message;
            this.alertService.error(this.error);
            return this.error;
          }
        }
        this.alertService.error(err);
      });
  }
}
