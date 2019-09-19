import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(
    private router: Router,
    private auth: AuthService,
  ) { }
  isLoggedIn() {
    return this.auth.isLoggedIn;
  }
  ngOnInit() {
  }

  logout() {
    localStorage.clear();
    this.router.navigate(['/login']);
  }
}
