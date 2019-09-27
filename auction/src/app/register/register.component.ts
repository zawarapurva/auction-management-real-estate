import { AlertService } from '../alert/alert.service';
import { Router } from '@angular/router';
import { RegistrationService } from './registration.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';

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
    private registrationService: RegistrationService,
    private router: Router,
    private alertService: AlertService
  ) { }

  ngOnInit() {
    this.registerForm = this.formBuilder.group({
        firstname: ['', Validators.required],
        lastname: ['', Validators.required],
        username: ['', Validators.required],
        password: ['', [Validators.required, Validators.minLength(6)]],
        email: ['', [Validators.required, Validators.email]],
        businesstype: ['', Validators.required],
    });
}
get f() { return this.registerForm.controls; }

onSubmit() {
  this.submitted = true;
  this.alertService.clear();
  if (this.registerForm.invalid) {
            return;
        }
  this.loading = true;
  console.log(this.registerForm.value);
  this.registrationService.register(this.registerForm.value)
  .pipe(first())
  .subscribe(
    (res) => {
      this.alertService.success(res.message, true);
      this.router.navigate(['/login']);
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
