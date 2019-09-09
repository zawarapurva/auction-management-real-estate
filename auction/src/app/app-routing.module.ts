import { AuthGuard } from './auth/guards/auth.guard';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
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
  { path: 'home' , canActivate: [AuthGuard], component: HomeComponent },
  { path: 'createAuction' , canActivate: [AuthGuard], component: CreateAuctionComponent },
  { path: 'profile' , canActivate: [AuthGuard],  component: ProfileComponent },
  { path: 'auction', canActivate: [AuthGuard], component: AuctionComponent},
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
   PageNotFoundComponent ];

