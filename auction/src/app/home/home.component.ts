import { Component, OnInit } from '@angular/core';
import { HomeService } from './home.service';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

export class HomeComponent implements OnInit {

  public auctions = [];
  constructor(
    private homeService: HomeService
  ) { }

  ngOnInit() {
    this.homeService.getAuctions().subscribe(
      (res) => {
        console.log(res);
        return this.auctions = res;
      },
      (err) => {
        console.log(err.error.message);
      }
    );
  }
}
