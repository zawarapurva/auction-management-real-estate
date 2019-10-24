import { HttpErrorResponse } from '@angular/common/http';
import { ProfileService } from './profile.service';
import { AlertService } from './../alert/alert.service';
import { User } from './../Modals/Users';
import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  @Input() user: User;
  public auctions = [];
  error: any;
  toggle: boolean;
  noAuctions: boolean;
  noAuctionString: string;
  constructor(
    private router: Router,
    private alertService: AlertService,
    private profileService: ProfileService
  ) { }

  ngOnInit() {
    this.toggle = false;
    this.alertService.clearAlert();
    this.profileService.getProfile().subscribe(
      (res) => {
        this.user = res;
      },
      (err) => {
        if (err instanceof HttpErrorResponse) {
          if (err.status === 400 || err.status === 500) {
            console.log(err.error);
            this.alertService.error(err.error);
          }
        }
        this.alertService.error(err);
      });
  }

  viewMyBids() {
    this.noAuctions = false;
    if (!this.toggle) {
      this.profileService.getMyBids().subscribe(
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
    this.toggle = !this.toggle;
  }

  logout() {
    localStorage.clear();
    this.router.navigate(['/login']);
  }
}
