import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  SERVER_URL = 'http://localhost:5000/login';
    loginForm: FormGroup;
    loading = false;
    submitted = false;

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
    console.log('yes');
    const formData = new FormData();
    formData.append('username', this.loginForm.get('username').value);
    formData.append('password', this.loginForm.get('password').value);
    formData.append('email', this.loginForm.get('email').value);

    this.httpClient.post<any>(this.SERVER_URL, formData).subscribe(
      (res) => console.log(res),
      (err) => console.log(err)
    );
}
}
