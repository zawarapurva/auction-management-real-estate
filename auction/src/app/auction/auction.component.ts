import { Router } from '@angular/router';
import { Auction } from '../Modals/Auction';
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
  myAuction: boolean;
  auctionViewBid: string;
  toggle: boolean;
  constructor(
    private fb: FormBuilder,
    private alertService: AlertService,
    private auctionservice: AuctionService,
    private router: Router,
  ) { }

  ngOnInit() {
    this.toggle = false;
    if (localStorage.getItem('user_id') === this.auction.seller_id) {
      this.myAuction = true;
    } else { this.myAuction = false; }
    this.auction.expiry_date = new Date(this.auction.expiry_date).toDateString();
    this.auction.image_name = 'http://localhost:5000/propertyImg/propertyImg/' + this.auction.image_name;
    this.bid = this.fb.group({
      bid_value: ['', [Validators.min(this.auction.max_current_bid + 1), bidValidator(this.auction.bid_value_multiple)]],
      buyer_id: [localStorage.getItem('user_id')],
      auction_id: [this.auction._id]
    });
    this.auctionViewBid = this.auction._id;
  }

  get f() { return this.bid.controls; }

  onSubmit() {
    this.submitted = true;
    this.alertService.clearAlert();
    if (this.bid.invalid) {
      return;
    }
    this.loading = true;
    const formValues = this.bid.value;
    this.auctionservice.auction(formValues).subscribe(
      (res) => {
        console.log(res);
        this.alertService.success(res.message, true);
        return this.auction.max_current_bid = formValues.bid_value;
      },
      (err) => {
        this.loading = false;
        if (err instanceof HttpErrorResponse) {
          if (err.status === 400 || err.status === 500) {
            this.error = err.error.message;
            this.alertService.error(this.error);
            return this.auction.max_current_bid = err.error.currentMax;
          }
        }
        this.alertService.error(err);
      });
  }

  viewAllBids() {
    this.alertService.clearAlert();
    if (!this.toggle) {
      if (this.bid.invalid) {
        return;
      }
      this.router.navigate(['/viewBids'], { queryParams: { auction_id: this.auctionViewBid } });
    }
    this.toggle = ! this.toggle;
  }
}
