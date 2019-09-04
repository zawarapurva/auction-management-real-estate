import { ProfileComponent } from './profile/profile.component';
import { AuctionComponent } from './auction/auction.component';
import { CreateAuctionComponent } from './create-auction/create-auction.component';
import { LoginComponent } from './login/login.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RegisterComponent } from './register/register.component';
import { HomeComponent } from './home/home.component';


const routes: Routes = [
  { path: '' , redirectTo: '/login', pathMatch: 'full' },
  { path: 'login' , component: LoginComponent },
  { path: 'register' , component: RegisterComponent },
  { path: 'home' , component: HomeComponent },
  { path: 'createAuction' , component: CreateAuctionComponent },
  { path: 'profile' , component: ProfileComponent },
  { path: 'auction', component: AuctionComponent}
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
   AuctionComponent ];
