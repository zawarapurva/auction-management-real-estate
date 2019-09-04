import { RegistrationService } from './registration.service';
import {  HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
    resp: string;
    registerForm: FormGroup;
    loading = false;
    submitted = false;
    error: string;

  constructor(
    private formBuilder: FormBuilder,
    private registrationService: RegistrationService
  ) { }

  ngOnInit() {
    this.registerForm = this.formBuilder.group({
        firstname: ['', Validators.required],
        lastname: ['', Validators.required],
        username: ['', Validators.required],
        password: ['', [Validators.required, Validators.minLength(6)]],
        email: ['', Validators.required],
        businesstype: ['', Validators.required],
        // profile: ['', Validators.required]
    });
}

// onFileSelect(event) {
//   if (event.target.files.length > 0) {
//     const file = event.target.files[0];
//     console.log(this.registerForm.get('profile').patchValue('shajhds', file));
//   }
// }

onSubmit() {
  console.log(this.registerForm.value);
  this.registrationService.register(this.registerForm.value).subscribe(
    (res) => {
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
