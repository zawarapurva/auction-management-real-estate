import { ViewBidsPopupComponent } from './view-bids-popup/view-bids-popup.component';
import { LoginGuard } from './auth/guard/login.guard';
import { AuthGuard } from './auth/guard/auth.guard';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { ProfileComponent } from './profile/profile.component';
import { AuctionComponent } from './auction/auction.component';
import { CreateAuctionComponent } from './create-auction/create-auction.component';
import { LoginComponent } from './login/login.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RegisterComponent } from './register/register.component';
import { HomeComponent } from './home/home.component';
import { MyAuctionsComponent } from './my-auctions/my-auctions.component';

const routes: Routes = [
  { path: '' , redirectTo: '/login', pathMatch: 'full' },
  { path: 'login' , canActivate: [LoginGuard], component: LoginComponent },
  { path: 'register' , canActivate: [LoginGuard], component: RegisterComponent },
  { path: 'home' , canActivate: [AuthGuard], component: HomeComponent },
  { path: 'home/:propery_type' , canActivate: [AuthGuard], component: HomeComponent },
  { path: 'createAuction' , canActivate: [AuthGuard], component: CreateAuctionComponent },
  { path: 'profile' , canActivate: [AuthGuard],  component: ProfileComponent },
  { path: 'auction', canActivate: [AuthGuard], component: AuctionComponent},
  { path: 'myAuctions', canActivate: [AuthGuard], component: MyAuctionsComponent},
  { path: 'viewBids', canActivate: [AuthGuard], component: ViewBidsPopupComponent},
  { path: '**', canActivate: [AuthGuard], component: PageNotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }

export const routingComponents = [
  LoginComponent,
  RegisterComponent,
  HomeComponent,
  CreateAuctionComponent,
  ProfileComponent,
  AuctionComponent,
  MyAuctionsComponent,
  ViewBidsPopupComponent,
  PageNotFoundComponent
 ];
