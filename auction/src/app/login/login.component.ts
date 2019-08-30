import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
    private SERVER_URL = 'http://localhost:5000/login';
    loginForm: FormGroup;
    loading = false;
    submitted = false;
    error: string;

  constructor(
    private formBuilder: FormBuilder,
    private httpClient: HttpClient,
  ) { }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
        password: ['', [Validators.required, Validators.minLength(6)]],
        email: ['', Validators.required]
      });
  }

  onSubmit() {
    const formData = new FormData();
    formData.append('username', this.loginForm.get('username').value);
    formData.append('password', this.loginForm.get('password').value);
    formData.append('email', this.loginForm.get('email').value);

    this.httpClient.post<any>(this.SERVER_URL, formData).subscribe(
      (res) => {
        localStorage.setItem('token', res.jwt);
        // this.router.navigate(['/']);
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
      }
    );
}
}
