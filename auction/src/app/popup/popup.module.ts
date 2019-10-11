import { ViewBidsPopupComponent } from '../view-bids-popup/view-bids-popup.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [ViewBidsPopupComponent],
  imports: [
    CommonModule,
    ViewBidsPopupComponent
  ],
  entryComponents: [ViewBidsPopupComponent],
})
export class PopupModule { }
