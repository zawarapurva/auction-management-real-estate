import { HttpErrorResponse } from '@angular/common/http';
import { AlertService } from './../alert/alert.service';
import { Auction } from './../auction/Auction';
import { Component, OnInit, Input, AfterViewInit, OnDestroy, Type } from '@angular/core';
import { ViewBids } from '../auction/ViewBids';
import { ViewBidsPopupService } from './view-bids-popup.service';

@Component({
  selector: 'app-view-bids-popup',
  templateUrl: './view-bids-popup.component.html',
  styleUrls: ['./view-bids-popup.component.css']
})
export class ViewBidsPopupComponent implements OnInit {
  @Input() viewBid: ViewBids;
  @Input() auction: Auction;
  error: string;
  constructor(
    private viewBidsPopupService: ViewBidsPopupService,
    private alertService: AlertService
  ) { }

  ngOnInit() {
    console.log(this.auction);
    const formValues = this.auction._id;
    this.viewBidsPopupService.getViewBids(formValues).subscribe(
      (res) => {
        console.log(res);
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
