import { LoginService } from './login.service';
import { Component, OnInit } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

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

  constructor(
    private formBuilder: FormBuilder,
    // tslint:disable-next-line:variable-name
    private _loginservice: LoginService
  ) { }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
        password: ['', [Validators.required, Validators.minLength(6)]],
        email: ['', Validators.required]
      });
  }

  onSubmit() {
    console.log(this.loginForm.value);

    this._loginservice.login(this.loginForm.value).subscribe(
      (res) => {
        localStorage.setItem('token', res.jwt);
        this.resp = res.message;
        return console.log(res);
      },
      (err) => {
        if (err instanceof HttpErrorResponse) {
          if (err.status === 400 || err.status === 500) {
            this.error = err.error.message;
            return console.log(err);
          } else {
            return alert('An unexpected error occured');
          }
        }
      });
}
}

