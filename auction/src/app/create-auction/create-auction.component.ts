import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CreateAuctionService } from './create-auction.service'; // we will create this next!
import { delay } from 'rxjs/operators';

@Component({
  selector: 'app-create-auction',
  templateUrl: './create-auction.component.html',
  styleUrls: ['./create-auction.component.css']
})
export class CreateAuctionComponent implements OnInit {
  SERVER_URL = 'http://localhost:5000/createAuction';
  createAuctionForm: FormGroup;
  loading = false;
  submitted = false;
  error: string;
  uploadedFiles = [];
  uploadError;
  currentStatus: number;
  uploadFieldName = 'photos';

  readonly STATUS_INITIAL = 0;
  readonly STATUS_SAVING = 1;
  readonly STATUS_SUCCESS = 2;
  readonly STATUS_FAILED = 3;

  constructor(
    private formBuilder: FormBuilder,
    private httpClient: HttpClient,
    private svc: CreateAuctionService
  ) {
    this.reset();
   }

  ngOnInit() {
    this.createAuctionForm = this.formBuilder.group({
      title: ['', Validators.required],
      property_type: ['', Validators.required],
      address: ['', Validators.required],
      description:  ['', Validators.required],
      min_starting_bid:  ['', Validators.required],
      bid_value_multiple:  ['', Validators.required],
      expiry_date: ['', Validators.required],
      // property_image:  ['', Validators.required]
  });
  }
  get f() { return this.createAuctionForm.controls; }
  // onFileSelect($event) {
  //   if ($event.target.files.length > 0) {
  //     const file = $event.target.files[0];
  //     this.createAuctionForm.get('property_image').setValue(file);
  //   }
  // }
  filesChange(fieldName: string, fileList: FileList) {
    // handle file changes
    const formData = new FormData();

    if (!fileList.length) { return; }

    // append the files to FormData
    Array
      .from(Array(fileList.length).keys())
      .map(x => {
        formData.append(fieldName, fileList[x], fileList[x].name);
      });

    // save it
    this.save(formData);
  }

  reset() {
    this.currentStatus = this.STATUS_INITIAL;
    this.uploadedFiles = [];
    this.uploadError = null;
  }
  save(formData: FormData) {
    // upload data to the server
    this.currentStatus = this.STATUS_SAVING;
    this.svc.upload(formData)
      .take(1)
      .subscribe(x => {
        this.uploadedFiles = [].concat(x);
        this.currentStatus = this.STATUS_SUCCESS;
      }, err => {
        this.uploadError = err;
        this.currentStatus = this.STATUS_FAILED;
      });
  }

  onSubmit() {
    const formData = new FormData();
    formData.append('title', this.createAuctionForm.get('title').value);
    formData.append('property_type', this.createAuctionForm.get('property_type').value);
    formData.append('address', this.createAuctionForm.get('address').value);
    formData.append('description', this.createAuctionForm.get('description').value);
    formData.append('min_starting_bid', this.createAuctionForm.get('min_starting_bid').value);
    formData.append('bid_value_multiple', this.createAuctionForm.get('bid_value_multiple').value);
    formData.append('expiry_date', this.createAuctionForm.get('expiry_date').value);
    formData.append('property_image', this.createAuctionForm.get('property_image').value);

    this.httpClient.post<any>(this.SERVER_URL, formData).subscribe(
      (res) => {
        console.log(formData);
        // this.router.navigate(['/login']);
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
