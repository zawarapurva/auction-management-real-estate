import { AuthService } from './../auth/auth.service';
import { Router, ActivatedRoute } from '@angular/router';
import { LoginService } from './login.service';
import { Component, OnInit } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlertService } from '../alert/alert.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  loading = false;
  submitted = false;
  error: string;
  resp: string;
  returnUrl: string;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private loginservice: LoginService,
    private router: Router,
    private alertService: AlertService,
  ) { }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      password: ['', [Validators.required, Validators.minLength(6)]],
      email: ['', [Validators.required, Validators.email]]
    });
    this.returnUrl = this.route.snapshot.queryParams.returnUrl || '/home';
  }

  get f() { return this.loginForm.controls; }

  onSubmit() {
    this.submitted = true;
    this.alertService.clear();
    console.log(this.loginForm.value);
    if (this.loginForm.invalid) {
      return;
    }
    this.loading = true;
    console.log(this.loginForm.value);
    this.loginservice.login(this.loginForm.value).subscribe(
      (res) => {
        localStorage.setItem('token', res.jwt);
        localStorage.setItem('email', this.loginForm.value.email);
        this.alertService.success(res.message, true);
        this.router.navigate([this.returnUrl]);
        return console.log(res);
      },
      (err) => {
        this.loading = false;
        if (err instanceof HttpErrorResponse) {
          if (err.status === 400 || err.status === 500) {
            this.error = err.error.message;
            this.alertService.error(this.error);
            return console.log(err);
          } else {
            return alert('An unexpected error occured');
          }
        }
        this.alertService.error(err);
      });
  }
}

