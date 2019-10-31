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
  myAuction: boolean;
  auctionViewBid: string;
  isShow: boolean;
  constructor(
    private fb: FormBuilder,
    private alertService: AlertService,
    private auctionservice: AuctionService,
  ) { }

  ngOnInit() {
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
        this.alertService.success(res.message, true);
        this.auction.max_current_bid = formValues.bid_value;
      },
      (err) => {
        this.loading = false;
        if (err instanceof HttpErrorResponse) {
          if (err.status === 400 || err.status === 500) {
            this.alertService.error(err.error.message);
            this.auction.max_current_bid = err.error.currentMax;
          }
        }
      });
  }

  viewAllBids() {
    this.alertService.clearAlert();
    this.isShow = !this.isShow;
  }
}
