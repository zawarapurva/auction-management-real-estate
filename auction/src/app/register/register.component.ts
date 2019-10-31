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
    registerForm: FormGroup;
    loading = false;
    submitted = false;

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
  this.alertService.clearAlert();
  if (this.registerForm.invalid) {
            return;
        }
  this.loading = true;
  this.registrationService.register(this.registerForm.value)
  .pipe(first())
  .subscribe(
    (res) => {
      this.alertService.success(res.message, true);
      this.router.navigate(['/login']);
    },
    (err) => {
      this.loading = false;
      if (err instanceof HttpErrorResponse) {
        if (err.status === 400 || err.status === 500) {
          this.alertService.error(err.error.message);
        } else {
          return alert('An unexpected error occured');
        }
      }
    });
}
}
