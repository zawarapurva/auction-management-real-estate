import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
    SERVER_URL = 'http://localhost:5000/register';
    registerForm: FormGroup;
    loading = false;
    submitted = false;
  error: string;

  constructor(
    private formBuilder: FormBuilder,
    private httpClient: HttpClient
  ) { }

  ngOnInit() {
    this.registerForm = this.formBuilder.group({
        firstname: ['', Validators.required],
        lastname: ['', Validators.required],
        username: ['', Validators.required],
        password: ['', [Validators.required, Validators.minLength(6)]],
        email: ['', Validators.required],
        businesstype: ['', Validators.required],
        profile: ['', Validators.required]
    });
}

onFileSelect(event) {
  if (event.target.files.length > 0) {
    const file = event.target.files[0];
    this.registerForm.get('profile').setValue(file);
  }
}

onSubmit() {
  console.log('yes');
  const formData = new FormData();
  formData.append('firstname', this.registerForm.get('firstname').value);
  formData.append('lastname', this.registerForm.get('lastname').value);
  formData.append('username', this.registerForm.get('username').value);
  formData.append('password', this.registerForm.get('password').value);
  formData.append('email', this.registerForm.get('email').value);
  formData.append('businesstype', this.registerForm.get('businesstype').value);
  formData.append('file', this.registerForm.get('profile').value);

  this.httpClient.post<any>(this.SERVER_URL, formData).subscribe(
    (res) => {
      // this.router.navigate(['/login']);
      return console.log(res);
    },
    (err) => {
      if (err instanceof HttpErrorResponse) {
        if (err.status === 400 || err.status === 500) {
          this.error = err.error.message;
          // this.registerForm.setErrors(err.blob);
          return console.log(err);
        } else {
          return alert('An unexpected error occured');
        }
      }
    }
  );
}
}
