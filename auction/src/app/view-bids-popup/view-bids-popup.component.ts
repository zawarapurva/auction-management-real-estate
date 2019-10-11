import { Component, OnInit, Input, AfterViewInit, OnDestroy, Type } from '@angular/core';
import { Auction } from '../auction/Auction';

@Component({
  selector: 'app-view-bids-popup',
  templateUrl: './view-bids-popup.component.html',
  styleUrls: ['./view-bids-popup.component.css']
})
export class ViewBidsPopupComponent implements OnInit {
  @Input() auction: Auction;
  ngOnInit() {
  }
}
