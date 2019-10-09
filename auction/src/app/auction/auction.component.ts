import { Auction } from './Auction';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit, Input } from '@angular/core';
import { AlertService } from '../alert/alert.service';
import { AuctionService } from './auction.service';
import { HttpErrorResponse } from '@angular/common/http';
import { bidValidator } from '../validators/bid.validator';

@Component({
  selector: 'app-auction',
  templateUrl: './auction.component.html',
  styleUrls: ['./auction.component.css']
})

export class AuctionComponent implements OnInit {
  @Input() auction: Auction;
  bid: FormGroup;
  loading = false;
  submitted = false;
  error: any;
  constructor(
    private fb: FormBuilder,
    private alertService: AlertService,
    private auctionservice: AuctionService,
    private router: Router,
  ) { }

  ngOnInit() {
    this.auction.expiry_date = new Date(this.auction.expiry_date).toDateString();
    this.auction.image_name = 'http://localhost:5000/propertyImg/propertyImg/' + this.auction.image_name;
    this.bid = this.fb.group({
      bid_value: ['', [Validators.min(this.auction.min_starting_bid), bidValidator(this.auction.bid_value_multiple)]],
      _id: [''],
      buyer_id: ['']
    });
  }

  get f() { return this.bid.controls; }

  onSubmit() {
    this.submitted = true;
    this.alertService.clearAlert();
    console.log(this.bid.value);
    if (this.bid.invalid) {
      return;
    }
    this.loading = true;
    this.auctionservice.auction(this.bid.value).subscribe(
      (res) => {
        this.alertService.success(res.message, true);
        return console.log(res);
      },
      (err) => {
        this.loading = false;
        if (err instanceof HttpErrorResponse) {
          if (err.status === 400 || err.status === 500) {
            this.error = err.error.message;
            this.alertService.error(this.error);
            return console.log(err);
          }
        }
        this.alertService.error(err);
      });
  }

}
