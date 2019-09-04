import { LoginService } from './login/login.service';
import { RegistrationService } from './register/registration.service';
import { CreateAuctionService } from './create-auction/create-auction.service';
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
    LoginService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
