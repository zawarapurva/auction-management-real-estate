import { AuthGuard } from './auth/guard/auth.guard';
import { AuthService } from './auth/auth.service';
import { AlertService } from './services/alert.service';
import { LoginService } from './login/login.service';
import { RegistrationService } from './register/registration.service';
import { CreateAuctionService } from './create-auction/create-auction.service';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule , routingComponents } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { AlertComponent } from './alert/alert.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { LoginGuard } from './auth/guard/login.guard';

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
    AuthGuard,
    LoginGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
