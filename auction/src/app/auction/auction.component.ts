import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-auction',
  templateUrl: './auction.component.html',
  styleUrls: ['./auction.component.css']
})
export class AuctionComponent implements OnInit {
  @Input() auction: object;

  constructor() { }

  ngOnInit() {
    this.auction.expiry_date = new Date(this.auction.expiry_date).toDateString();
    this.auction.image_name = 'http://localhost:5000/propertyImg/propertyImg/' + this.auction.image_name;
}
}
