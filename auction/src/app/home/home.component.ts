import { AlertService } from './../alert/alert.service';
import { HttpErrorResponse } from '@angular/common/http';
import { SearchService } from './../navbar/search.service';
import { Component, OnInit } from '@angular/core';
import { HomeService } from './home.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

export class HomeComponent implements OnInit {
  public auctions = [];
  noAuctions: boolean;
  noAuctionString: string;
  constructor(
    private homeService: HomeService,
    private searchService: SearchService,
    private alertService: AlertService,
    private route: ActivatedRoute,
  ) { }

  ngOnInit() {
    let propertyType = this.route.snapshot.queryParamMap.get('property_type');
    this.route.queryParams.subscribe( (params) => {
      propertyType = params.property_type;
      if (propertyType === 'All' || propertyType === undefined) {
        this.noAuctions = false;
        this.homeService.getAuctions().subscribe(
          (res) => {
            this.auctions = res;
          },
          (err) => {
            if (err instanceof HttpErrorResponse) {
              if (err.status === 400 || err.status === 500) {
                this.alertService.error(err.error);
              }
            }
            this.alertService.error(err);
          });
      } else {
        this.noAuctions = false;
        this.searchService.getPropertyType(propertyType).subscribe(
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
    });
  }
}

