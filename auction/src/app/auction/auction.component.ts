import { Auction } from './Auction';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Component, OnInit, Input } from '@angular/core';
import { AlertService } from '../alert/alert.service';
// import { AuctionService } from './auction.service';
import { HttpErrorResponse } from '@angular/common/http';
import { ValidateBid } from '../validators/bid.validator';

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
    // private auctionservice: AuctionService,
    private router: Router,
  ) { }

  ngOnInit() {
    this.auction.expiry_date = new Date(this.auction.expiry_date).toDateString();
    this.auction.image_name = 'http://localhost:5000/propertyImg/propertyImg/' + this.auction.image_name;
    this.bid = this.fb.group({
      bid_value: ['', [ValidateBid(this.auction.bid_value_multiple)]]
    });
  }

  get f() { return this.bid.controls; }

  onSubmit() {
    this.submitted = true;
    this.alertService.clearAlert();
    console.log(this.bid.value);
    //   if (this.bid.invalid) {
    //     return;
    //   }
    //   this.loading = true;
    //   this.auctionservice.auction(this.bid.value).subscribe(
    //     (res) => {
    //       this.alertService.success(res.message, true);
    //       // this.router.navigate([this.returnUrl]);
    //       return console.log(res);
    //     },
    //     (err) => {
    //       this.loading = false;
    //       if (err instanceof HttpErrorResponse) {
    //         if (err.status === 400 || err.status === 500) {
    //           this.error = err.error.message;
    //           this.alertService.error(this.error);
    //           return console.log(err);
    //         } else {
    //           return alert('An unexpected error occured');
    //         }
    //       }
    //       this.alertService.error(err);
    //     });
  }

}
