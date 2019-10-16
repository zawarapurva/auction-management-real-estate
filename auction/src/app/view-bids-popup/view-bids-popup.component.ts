import { HttpErrorResponse } from '@angular/common/http';
import { AlertService } from './../alert/alert.service';
import { Component, OnInit, Input, AfterViewInit, OnDestroy, Type } from '@angular/core';
import { ViewBidsPopupService } from './view-bids-popup.service';

@Component({
  selector: 'app-view-bids-popup',
  templateUrl: './view-bids-popup.component.html',
  styleUrls: ['./view-bids-popup.component.css']
})
export class ViewBidsPopupComponent implements OnInit {
  public viewBids = [];
  error: string;
  hideBids: boolean;
  winner: string;
  constructor(
    private viewBidsPopupService: ViewBidsPopupService,
    private alertService: AlertService
  ) { }

  ngOnInit() {
    this.hideBids = false;
    this.viewBidsPopupService.getViewBids().subscribe(
      (res) => {
        if (res === null) {
          console.log('No bids to display');
        } else {
          return this.viewBids = res;
        }
      },
      (err) => {
        if (err instanceof HttpErrorResponse) {
          if (err.status === 200) {
            console.log(err.error.text);
            this.hideBids = true;
            return this.winner = err.error.text;
          }
          if (err.status === 400 || err.status === 500) {
            return this.alertService.error(err.error.message);
          }
        }
        this.alertService.error(err);
      });
  }

  setWinner(event) {
    this.viewBidsPopupService.winner(event.target.value).subscribe(
      (res) => {
        console.log(res);
        return;
      },
      (err) => {
        if (err instanceof HttpErrorResponse) {
          if (err.status === 400 || err.status === 500) {
            return this.alertService.error(err.error.message);
          }
        }
        this.alertService.error(err);
      });
  }
}
