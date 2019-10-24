import { NavbarComponent } from './navbar/navbar.component';
import { AlertComponent } from './alert/alert.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';

import { SearchService } from './navbar/search.service';
import { ViewBidsPopupService } from './view-bids-popup/view-bids-popup.service';
import { ProfileService } from './profile/profile.service';
import { MyAuctionsService } from './my-auctions/my-auctions.service';
import { AuctionService } from './auction/auction.service';
import { AuthService } from './auth/auth.service';
import { AlertService } from './alert/alert.service';
import { LoginService } from './login/login.service';
import { RegistrationService } from './register/registration.service';
import { CreateAuctionService } from './create-auction/create-auction.service';
import { HomeService } from './home/home.service';

import { LoginGuard } from './auth/guard/login.guard';
import { AuthGuard } from './auth/guard/auth.guard';

import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule , routingComponents } from './app-routing.module';
import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent,
    routingComponents,
    NavbarComponent,
    AlertComponent,
    PageNotFoundComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    AppRoutingModule
  ],
  providers: [
    CreateAuctionService,
    RegistrationService,
    LoginService,
    AlertService,
    AuthService,
    HomeService,
    AuctionService,
    MyAuctionsService,
    ProfileService,
    ViewBidsPopupService,
    SearchService,
    AuthGuard,
    LoginGuard,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
